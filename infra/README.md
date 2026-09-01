# File store infrastructure

CloudFormation for `download.westonrobot.net`. The decision is [ADR 0001](../docs/adr/0001-host-downloadable-documents-on-s3.md); the design and the reasoning are [`docs/design/file-hosting.md`](../docs/design/file-hosting.md).

**Nothing here has been deployed.** Both templates validate against the account (`aws cloudformation validate-template`), but no stack has ever been created, so treat the first deploy as the real test.

## Why CloudFormation and not Terraform

The only tool you need is the AWS CLI, which is already installed and already authenticated. There is no second binary to install, and **no state file to host, secure, lock, or corrupt** — AWS keeps the state, so a junior engineer picking this up in a year inherits a stack they can open in the console, not a `.tfstate` whose whereabouts are tribal knowledge.

## Layout

| File | Holds |
| --- | --- |
| `certificate.yaml` | The ACM certificate. **Deploys to us-east-1** — CloudFront reads certificates only from there, regardless of where the bucket lives. That constraint is the only reason this is two stacks. |
| `file-store.yaml` | Everything else: the bucket, the distribution and its OAC, two managed policies, the DNS record. Seven resources. |

There is no Lambda and no build step. Publishing is [`scripts/publish-files.py`](../scripts/publish-files.py), which runs on a laptop.

## Deploying it the first time

The certificate, in us-east-1. It waits while ACM creates and resolves the DNS validation records itself, because the zone is in this account — expect a few minutes:

```console
$ aws cloudformation deploy --region us-east-1 \
    --template-file infra/certificate.yaml \
    --stack-name wr-files-certificate

$ aws cloudformation describe-stacks --region us-east-1 \
    --stack-name wr-files-certificate \
    --query 'Stacks[0].Outputs[?OutputKey==`CertificateArn`].OutputValue' --output text
```

Then the store. `CAPABILITY_NAMED_IAM` is required because the two managed policies have fixed names:

```console
$ aws cloudformation deploy --region ap-southeast-1 \
    --template-file infra/file-store.yaml \
    --stack-name wr-files \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides CertificateArn=<arn from above>
```

To see what a change would do before doing it, add `--no-execute-changeset` and read the change set in the console. That is this setup's equivalent of a plan.

**If the bucket policy fails to apply**, do not relax the public-access block to get past it. All four settings are on deliberately, and a rejection means the policy is being evaluated as genuinely public — a defect in the policy, not in the setting.

## After the first deploy

```console
$ aws cloudformation describe-stacks --region ap-southeast-1 \
    --stack-name wr-files --query 'Stacks[0].Outputs' --output table
```

Attach `wr-files-publish` to whoever publishes documents and `wr-files-read` to anyone debugging. Identity Center is not enabled in this account, so that means an IAM group with console access and enforced MFA until it is.

Set `WR_FILES_DISTRIBUTION_ID` from the `DistributionId` output, so the publish script can invalidate the CDN. Without it the script still works — published keys are immutable, so only `index.json` is delayed, and it expires in 60 seconds.

## The initial bulk load

Phase 1 is a one-time migration. Stage the 39 exported documents under `static/_upload/` at their [D4](../docs/adr/0001-host-downloadable-documents-on-s3.md) paths and run:

```console
$ python3 scripts/publish-files.py            # dry run — check the plan
$ python3 scripts/publish-files.py --publish
```

That uploads them with the right content types and cache headers, writes the checksum sidecars, builds `index.json` and invalidates. There is no separate reindex step: every publish run regenerates the index from the bucket.

## Tests

```console
$ python3 -m unittest discover -s scripts -t scripts
```

No dependencies. `scripts/wrfiles.py` is stdlib-only, so the tests run on a bare interpreter — which is why they are in CI ahead of the Node setup.

## What is not here

- **Access logging.** It arrives with the Phase 4 alarm work; CloudFront publishes `4xxErrorRate` to CloudWatch without it.
- **A rebuild trigger for the docs site.** The site fetches `index.json` at build time; wiring a `repository_dispatch` needs a GitHub token in AWS, which is a secret to manage and a decision to take separately.
- **Anything for `deb.westonrobot.net`.** A different bucket with a different problem, tracked in `TODO.md`.
