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

## Deploying it

Step by step, with verification and failure modes at each stage: [`RUNBOOK.md`](RUNBOOK.md). Two stacks — the certificate in us-east-1, everything else in ap-southeast-1 — because CloudFront reads certificates only from that region.

## What is not here

- **Access logging.** It arrives with the Phase 4 alarm work; CloudFront publishes `4xxErrorRate` to CloudWatch without it.
- **A rebuild trigger for the docs site.** The site fetches `index.json` at build time; wiring a `repository_dispatch` needs a GitHub token in AWS, which is a secret to manage and a decision to take separately.
- **Anything for `deb.westonrobot.net`.** A different bucket with a different problem, tracked in `TODO.md`.
