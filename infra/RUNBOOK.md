# Runbook — standing up the file store

First deployment of `download.westonrobot.net`, step by step. Reference material is in [`README.md`](README.md); this file is the procedure.

**Nothing here has ever been run.** The templates validate against the account, but no stack has been created, so treat this as a rehearsal that happens to be real. Doing it while the store is empty is deliberate: every failure below is cheap now and expensive once customers depend on it.

**Roughly 30 minutes**, most of it waiting on ACM and CloudFront. Measured on the first real run, 2026-09-01: certificate 3m15s, store stack 19m30s.

---

## 0 · Pre-flight

All read-only. Each command should produce what is stated; if one does not, stop and resolve it rather than continuing.

```console
$ aws sts get-caller-identity --query Account --output text
<account-id>

$ dig +short download.westonrobot.net          # must be empty — the name is free
$ aws s3api head-bucket --bucket westonrobot-files 2>&1 | grep -oE '\(40[34]\)'
(404)                                          # 404 = free. 403 = taken by another account, stop.

# S3 bucket names are globally unique across every AWS account, so this is not
# a formality — this check is what caught the original name being taken. `wr-files` was the original name here and returns 403 — another
# account holds it. Re-check whenever the name changes, and prefer a name
# carrying the company over a short prefix anyone might have taken.

$ aws route53 get-hosted-zone --id Z016356211Y82HTRJIPRB --query HostedZone.Name --output text
westonrobot.net.

$ aws cloudformation validate-template --region us-east-1 \
    --template-body file://infra/certificate.yaml >/dev/null && echo ok
$ aws cloudformation validate-template --region ap-southeast-1 \
    --template-body file://infra/file-store.yaml >/dev/null && echo ok
```

**What this will create:** one S3 bucket, one CloudFront distribution, one ACM certificate, one Route 53 record, two IAM managed policies. Cost at rest is effectively zero — CloudFront's first 1 TB/month is free in perpetuity and the bucket will hold nothing.

---

## 1 · The certificate — us-east-1

Separate stack, and in that region, because CloudFront reads certificates only from us-east-1. It is the only resource that lives there.

```console
$ aws cloudformation deploy --region us-east-1 \
    --template-file infra/certificate.yaml \
    --stack-name westonrobot-files-certificate
```

**Expect:** several minutes of silence — 3m15s on the first run. ACM writes the validation records into the zone itself and waits for them to resolve.

**Verify:**

```console
$ aws cloudformation describe-stacks --region us-east-1 \
    --stack-name westonrobot-files-certificate --query 'Stacks[0].StackStatus' --output text
CREATE_COMPLETE

$ CERT=$(aws cloudformation describe-stacks --region us-east-1 \
    --stack-name westonrobot-files-certificate \
    --query 'Stacks[0].Outputs[?OutputKey==`CertificateArn`].OutputValue' --output text)
$ aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT" \
    --query 'Certificate.Status' --output text
ISSUED
```

**If it hangs past ~10 minutes** the validation record did not resolve. Check the zone for a `_acm-validations`-style CNAME:

```console
$ aws route53 list-resource-record-sets --hosted-zone-id Z016356211Y82HTRJIPRB \
    --query "ResourceRecordSets[?Type=='CNAME' && contains(Name, '_')].Name" --output text
```

**To abort:** `aws cloudformation delete-stack --region us-east-1 --stack-name westonrobot-files-certificate`. Nothing depends on it yet, so this is free.

---

## 2 · The store — ap-southeast-1

```console
$ aws cloudformation deploy --region ap-southeast-1 \
    --template-file infra/file-store.yaml \
    --stack-name westonrobot-files \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides CertificateArn="$CERT"
```

`CAPABILITY_NAMED_IAM` is required because the two managed policies have fixed names.

**Expect:** 15–25 minutes; 19m30s on the first run. Almost all of it is the CloudFront distribution deploying to edge locations — everything else completes in the first minute or two, and `ServedBucketPolicy` waits on the distribution because it conditions on its ARN.

**Verify:**

```console
$ aws cloudformation describe-stacks --region ap-southeast-1 \
    --stack-name westonrobot-files --query 'Stacks[0].Outputs' --output table
```

### If it fails

| Failure | Meaning | Do |
| --- | --- | --- |
| `ServedBucketPolicy` rejected as public | Block Public Access is evaluating the OAC grant as public | **Do not loosen the public-access block.** All four are on deliberately; a rejection means the policy is genuinely public, which is a defect in the policy. Read it before changing anything. |
| `BucketAlreadyExists` | `westonrobot-files` was taken between pre-flight and now | Pick another name via the `BucketName` parameter and update `WR_FILES_BUCKET` wherever it is set |
| `AlreadyExists` on a managed policy | A previous attempt left them behind | Delete the orphaned policy, or redeploy the same stack rather than a new one |
| Rolls back with no clear cause | — | `aws cloudformation describe-stack-events --region ap-southeast-1 --stack-name westonrobot-files --max-items 20` — the first `CREATE_FAILED` in time order is the real one; everything after it is consequence |

A failed create rolls back on its own. The bucket carries `DeletionPolicy: Retain`, so it survives — delete it by hand before retrying, or the next attempt hits `BucketAlreadyExists`.

---

## 3 · Prove it serves

The bucket is empty, so an error status is the correct result. **What is being tested is that TLS terminates and the certificate is trusted** — contrast `deb.westonrobot.net`, which times out on HTTPS because a bare S3 website endpoint cannot carry one.

```console
$ dig +short download.westonrobot.net
# expect CloudFront edge IPs

$ curl -sSI https://download.westonrobot.net/ | head -3
# expect an HTTP status line — 403 or 404 is correct for an empty bucket.
# A TLS error or a timeout is not.
```

If `curl` reports a certificate problem, the distribution is serving a certificate that does not match the alias — stop and check step 1's output was passed to step 2.

---

## 4 · Wire up the publish script

```console
$ export WR_FILES_DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --region ap-southeast-1 --stack-name westonrobot-files \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' --output text)
```

Put it in your shell profile. Without it the script still publishes — published keys are immutable, so only `index.json` is delayed, and that expires in 60 seconds.

---

## 5 · Grant publishing

Identity Center is not enabled in this account, so this is an IAM group.

```console
$ aws iam create-group --group-name westonrobot-files-publishers
$ aws iam attach-group-policy --group-name westonrobot-files-publishers \
    --policy-arn $(aws cloudformation describe-stacks --region ap-southeast-1 \
        --stack-name westonrobot-files \
        --query 'Stacks[0].Outputs[?OutputKey==`PublishPolicyArn`].OutputValue' --output text)
$ aws iam add-user-to-group --group-name westonrobot-files-publishers --user-name <user>
```

Enforce MFA on those accounts. The grant carries no `DeleteObject`, so the worst a member can do is overwrite a key — which versioning makes recoverable.

---

## 6 · Smoke test with one real document

**This is the first time the publish code touches AWS.** Do it with something disposable before the bulk load.

```console
$ mkdir -p static/_upload/robot/wr65
$ cp ~/some-manual.pdf static/_upload/robot/wr65/wr65-user-manual-en-v0.1.pdf

$ python3 scripts/publish-files.py            # dry run — read the plan
$ python3 scripts/publish-files.py --publish
```

**Verify all four things the script claims to do:**

```console
$ curl -sI https://download.westonrobot.net/robot/wr65/wr65-user-manual-en-v0.1.pdf | \
    grep -iE '^HTTP|content-type|cache-control'
# 200, application/pdf, public, max-age=31536000, immutable

$ curl -s https://download.westonrobot.net/index.json | head -20
# the document, with its sha256

$ curl -s https://download.westonrobot.net/robot/wr65/wr65-user-manual-en-v0.1.pdf.sha256
# matches the metadata

$ python3 scripts/publish-files.py
# now reports "= published"
```

Then remove the test object deliberately — this is the one place a delete is correct, and it needs admin credentials because the publish grant has none:

```console
$ aws s3 rm s3://westonrobot-files/robot/wr65/wr65-user-manual-en-v0.1.pdf
$ aws s3 rm s3://westonrobot-files/robot/wr65/wr65-user-manual-en-v0.1.pdf.sha256
$ rm -rf static/_upload
$ python3 scripts/publish-files.py --publish   # rebuilds the index without it
```

`index.json` will keep serving the old contents for up to a minute afterwards, even though the object in the bucket is already correct. That is the invalidation propagating, and it is why the index carries `max-age=60` while every published key is `immutable`. Confirm with `X-Cache` and the `count` field rather than assuming:

```console
$ curl -s https://download.westonrobot.net/index.json | head -3
$ curl -sI https://download.westonrobot.net/index.json | grep -i x-cache
```

---

## 7 · The bulk load — blocked

Needs the 39 documents exported from `westonrobot.sharepoint.com`, which needs M365 tenant access. **WR65 and WRL63 first**: unlike the Unitree and AgileX pages they have no vendor site to fall back on, so those two products have no reachable documentation at all until this happens.

Stage them under `static/_upload/` at their [D4](../docs/adr/0001-host-downloadable-documents-on-s3.md) paths, dry-run, publish. Then rewrite the 48 SharePoint occurrences and the 4 Google Drive links, and `npm run check:downloads` will verify every `<Downloads>` query resolves — it skips that check today only because there is no index yet.

---

## Tearing it down

```console
$ aws s3 rm s3://westonrobot-files --recursive        # buckets must be empty to delete
$ aws cloudformation delete-stack --region ap-southeast-1 --stack-name westonrobot-files
$ aws cloudformation delete-stack --region us-east-1 --stack-name westonrobot-files-certificate
$ aws s3 rb s3://westonrobot-files                    # Retain means the stack will not do this
```

The bucket's `DeletionPolicy: Retain` is deliberate: a stack deletion should never be able to take customer documentation with it. The cost is that teardown has a manual step, which is the right way round.

## Done when

- `curl -sI https://download.westonrobot.net/<a published key>` returns `200` with the right `Content-Type` and `Cache-Control`
- `index.json` lists what you published, with checksums
- `python3 scripts/publish-files.py` reports everything as `= published`
- `npm run check:downloads` passes with the index reachable
- No page in the repository still references `/_upload/`
