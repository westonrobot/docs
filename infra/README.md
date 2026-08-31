# File store infrastructure

Terraform for `download.westonrobot.net`. The decision is [ADR 0001](../docs/adr/0001-host-downloadable-documents-on-s3.md); the design and the reasoning are [`docs/design/file-hosting.md`](../docs/design/file-hosting.md).

**Nothing here has been applied.** It is validated (`terraform validate`, `terraform fmt`) but has never run against an account, so treat the first apply as the real test.

## Layout

| File | Holds |
| --- | --- |
| `versions.tf` | Providers. Two AWS providers: the stack is in `ap-southeast-1`, but CloudFront requires its certificate in `us-east-1`, which is a CloudFront constraint rather than a choice. |
| `variables.tf` | Everything an operator sets. `hosted_zone_id` is the one that changes the shape of an apply. |
| `buckets.tf` | The three buckets — served, logs, inbox — separated by blast radius and lifecycle. |
| `cloudfront.tf` | Distribution, OAC, certificate, and the bucket policy that makes the branded hostname the only way in. |
| `iam.tf` | Upload, approve, read, and the two Lambda execution roles. |
| `lambda.tf` | One zip, two handlers, and the inbox tagging notification. |
| `lambda/` | `wrfiles.py` (the only implementation of the key rules), `promote.py`, `reindex.py`, and their tests. |

## Applying it the first time

```console
$ cd infra
$ terraform init                     # choose a backend first — see versions.tf
$ terraform plan -out=tf.plan
$ terraform apply tf.plan
```

**Certificate validation runs itself.** `hosted_zone_id` defaults to the `westonrobot.net` zone in this account, so Terraform creates the validation records and waits for ACM — no manual DNS step, which is the main reason the hostname is `.net` rather than `.com` (ADR 0001 D1). Expect the apply to sit for a few minutes on validation and again on the CloudFront distribution.

If the hostname is ever moved to a zone this account does not hold, set `hosted_zone_id = ""`. The apply then completes with the certificate `PENDING_VALIDATION` and the distribution unusable until someone adds the records by hand; `terraform output certificate_validation_records` prints them.

**If `aws_s3_bucket_policy.prod` fails to apply**, do not relax the public-access block to get past it. All four settings are on deliberately, and a rejection means the bucket policy is being evaluated as genuinely public — which would be a defect in the policy, not in the setting.

Then attach the policies. `terraform output policies` gives three ARNs; wire `upload` and `approve` to Identity Center permission sets rather than to IAM users, and give technicians the bookmark from `terraform output inbox_console_url`.

## The initial bulk load

Phase 1 is a one-time migration, not the self-service flow: an admin copies the 39 exported documents straight into the served bucket under [D4](../docs/adr/0001-host-downloadable-documents-on-s3.md) paths. `reindex` does not run on a bucket notification — it is invoked by `promote`, because a notification on object creation would fire on `index.json` and re-trigger itself — so after a bulk load, invoke it once by hand:

```console
$ aws lambda invoke --function-name wr-files-reindex /dev/stdout
```

## Tests

```console
$ python3 -m unittest discover -s infra/lambda -t infra/lambda
```

No dependencies. `wrfiles.py` is stdlib-only so the Lambda zip needs no build step and the tests run on a bare interpreter — which is why they are in CI ahead of the Node setup.

## What is not here

- **State backend.** Deliberately unset, so nobody applies from local state and becomes the only person who can change the store.
- **A rebuild trigger for the docs site.** The site fetches `index.json` at build time; wiring a `repository_dispatch` from `reindex` needs a GitHub token in AWS, which is a secret to manage and a decision to take separately.
- **Anything for `deb.westonrobot.net`.** A different bucket with a different problem, tracked in `TODO.md`.
