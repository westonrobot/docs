terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # State is deliberately not configured here. Pick a backend when this is
  # first applied — an S3 backend with DynamoDB locking in the same account is
  # the obvious choice — rather than letting someone apply from local state and
  # become the only person who can change the store.
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project   = "wr-file-store"
      ManagedBy = "terraform"
      Source    = "westonrobot/docs:infra"
    }
  }
}

# CloudFront requires its certificate in us-east-1 regardless of where the
# bucket lives. This is the one thing about the stack that is not in
# ap-southeast-1, and it is a CloudFront constraint rather than a choice.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "wr-file-store"
      ManagedBy = "terraform"
      Source    = "westonrobot/docs:infra"
    }
  }
}
