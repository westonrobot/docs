# Three buckets, separated by blast radius and lifecycle rather than by content
# type — prefixes handle content type (docs/design/file-hosting.md §2).

locals {
  prod_bucket  = "${var.bucket_prefix}-prod"
  logs_bucket  = "${var.bucket_prefix}-logs"
  inbox_bucket = "${var.bucket_prefix}-inbox"
}

# ---------------------------------------------------------------- served ----

resource "aws_s3_bucket" "prod" {
  bucket = local.prod_bucket
}

# The realistic failure is a person or a script overwriting the wrong object,
# not hardware loss. Versioning is the cheapest control that covers it.
resource "aws_s3_bucket_versioning" "prod" {
  bucket = aws_s3_bucket.prod.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "prod" {
  bucket                  = aws_s3_bucket.prod.id
  block_public_acls       = true
  block_public_policy     = false # the OAC policy below is the only public path
  ignore_public_acls      = true
  restrict_public_buckets = false
}

resource "aws_s3_bucket_lifecycle_configuration" "prod" {
  bucket = aws_s3_bucket.prod.id

  rule {
    id     = "expire-noncurrent-versions"
    status = "Enabled"
    filter {}
    noncurrent_version_expiration {
      noncurrent_days = var.noncurrent_version_days
    }
  }

  rule {
    id     = "abort-incomplete-uploads"
    status = "Enabled"
    filter {}
    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

resource "aws_s3_bucket_logging" "prod" {
  bucket        = aws_s3_bucket.prod.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "s3/prod/"
}

# ------------------------------------------------------------------ logs ----

resource "aws_s3_bucket" "logs" {
  bucket = local.logs_bucket
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket                  = aws_s3_bucket.logs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront's legacy log delivery writes with ACLs, so the bucket has to
# accept them. Nothing else in this stack does.
resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    id     = "expire-logs"
    status = "Enabled"
    filter {}
    expiration {
      days = 400
    }
  }
}

# ----------------------------------------------------------------- inbox ----

resource "aws_s3_bucket" "inbox" {
  bucket = local.inbox_bucket
}

# Overwrite safety. An earlier design keyed inbox objects by content hash so a
# `PutObject` could not destroy an earlier upload, but a technician dragging a
# file onto the S3 console cannot compute a digest. Versioning gives the same
# guarantee for both upload routes.
resource "aws_s3_bucket_versioning" "inbox" {
  bucket = aws_s3_bucket.inbox.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "inbox" {
  bucket                  = aws_s3_bucket.inbox.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# The inbox is a staging area, not storage.
resource "aws_s3_bucket_lifecycle_configuration" "inbox" {
  bucket = aws_s3_bucket.inbox.id
  rule {
    id     = "expire-unpromoted"
    status = "Enabled"
    filter {}
    expiration {
      days = var.inbox_expiry_days
    }
    noncurrent_version_expiration {
      noncurrent_days = var.inbox_expiry_days
    }
  }
}
