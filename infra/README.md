# File store infrastructure

CloudFormation for `download.westonrobot.net`. The decision is [ADR 0001](../docs/adr/0001-host-downloadable-documents-on-s3.md); the design and the reasoning are [`docs/design/file-hosting.md`](../docs/design/file-hosting.md).

**Nothing here has been applied.** Both templates validate against the account (`aws cloudformation validate-template`), but no stack has ever been created, so treat the first deploy as the real test.

## Why CloudFormation and not Terraform

The only tool you need is the AWS CLI, which is already installed and already authenticated. There is no second binary to install, and **no state file to host, secure, lock, or corrupt** — AWS keeps the state, so a junior engineer picking this up in a year inherits a stack they can open in the console, not a `.tfstate` whose whereabouts are tribal knowledge.

The console is part of the argument. A stack shows its resources, its event history and its drift on a page anyone can read, which is a much shorter path to understanding than learning a new CLI first.

## Layout

| File | Holds |
| --- | --- |
| `certificate.yaml` | The ACM certificate. **Deploys to us-east-1** — CloudFront reads certificates only from there, regardless of where the buckets live. That constraint is the only reason this is two stacks. |
| `file-store.yaml` | Everything else: two buckets, the distribution and its OAC, five policies and roles, both Lambdas, the DNS record. |
| `lambda/` | `wrfiles.py` (the only implementation of the key rules), `promote.py`, `reindex.py`, and their tests. |

## Deploying it the first time

One bucket to hold the packaged Lambda zip, created once:

```console
$ aws s3 mb s3://wr-files-artifacts --region ap-southeast-1
```

Then the certificate, in us-east-1. It waits while ACM creates and resolves the DNS validation records itself, because the zone is in this account — expect a few minutes:

```console
$ aws cloudformation deploy --region us-east-1 \
    --template-file infra/certificate.yaml \
    --stack-name wr-files-certificate
$ aws cloudformation describe-stacks --region us-east-1 \
    --stack-name wr-files-certificate \
    --query 'Stacks[0].Outputs[?OutputKey==`CertificateArn`].OutputValue' --output text
```

Then the store. `package` uploads `infra/lambda/` and rewrites the template's `Code` properties; `deploy` creates the stack. `CAPABILITY_NAMED_IAM` is required because the roles and policies have fixed names:

```console
$ aws cloudformation package --region ap-southeast-1 \
    --template-file infra/file-store.yaml \
    --s3-bucket wr-files-artifacts \
    --output-template-file /tmp/file-store.packaged.yaml

$ aws cloudformation deploy --region ap-southeast-1 \
    --template-file /tmp/file-store.packaged.yaml \
    --stack-name wr-files \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides CertificateArn=<arn from above>
```

To see what a change would do before doing it, add `--no-execute-changeset` and read the change set in the console. That is this setup's equivalent of a plan.

**If the served bucket's policy fails to apply**, do not relax its public-access block to get past it. All four settings are on deliberately, and a rejection means the policy is being evaluated as genuinely public — a defect in the policy, not in the setting.

## After the first deploy

```console
$ aws cloudformation describe-stacks --region ap-southeast-1 \
    --stack-name wr-files --query 'Stacks[0].Outputs' --output table
```

That prints the served and private bucket names, the three policy ARNs and the console URL to bookmark for technicians — it opens straight on the `inbox/` prefix. Attach `wr-files-upload` and `wr-files-approve` to an IAM group with console access and enforced MFA — Identity Center is not enabled in this account, so permission sets are not available yet.

## The initial bulk load

Phase 1 is a one-time migration, not the self-service flow: an admin copies the 39 exported documents straight into the served bucket under [D4](../docs/adr/0001-host-downloadable-documents-on-s3.md) paths. `reindex` does not run on a bucket notification — it is invoked by `promote`, because a notification on object creation would fire on `index.json` and re-trigger itself — so after a bulk load, invoke it once by hand:

```console
$ aws lambda invoke --region ap-southeast-1 \
    --function-name wr-files-reindex /dev/stdout
```

## Tests

```console
$ python3 -m unittest discover -s infra/lambda -t infra/lambda
```

No dependencies. `wrfiles.py` is stdlib-only, so the Lambda zip needs no build step and the tests run on a bare interpreter — which is why they are in CI ahead of the Node setup.

## What is not here

- **A rebuild trigger for the docs site.** The site fetches `index.json` at build time; wiring a `repository_dispatch` from `reindex` needs a GitHub token in AWS, which is a secret to manage and a decision to take separately.
- **Anything for `deb.westonrobot.net`.** A different bucket with a different problem, tracked in `TODO.md`.
