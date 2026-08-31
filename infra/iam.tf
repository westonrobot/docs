# Five roles (docs/design/file-hosting.md §7). The shape that matters: no human
# principal can write to the served bucket, so the upload grant can be handed
# out freely and approving is a single tag away from doing nothing else.

# ---------------------------------------------------------------- people ----

# A technician's entire privilege. Not GetObject, not ListBucket, not
# DeleteObject, and nothing outside this one bucket: the worst case from a lost
# laptop is junk in a staging area no customer can reach.
data "aws_iam_policy_document" "upload" {
  statement {
    sid       = "PutIntoInboxOnly"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.inbox.arn}/*"]
  }
}

resource "aws_iam_policy" "upload" {
  name        = "wr-files-upload"
  description = "Stage a document in the file store inbox. Cannot read, list, delete, or serve."
  policy      = data.aws_iam_policy_document.upload.json
}

# Approving is the publishing decision, and it is one tag. The copy into the
# served bucket is done by a Lambda, so this grant cannot serve anything itself.
data "aws_iam_policy_document" "approve" {
  statement {
    sid       = "TagInboxObjects"
    actions   = ["s3:PutObjectTagging", "s3:GetObjectTagging", "s3:GetObject", "s3:ListBucket"]
    resources = [aws_s3_bucket.inbox.arn, "${aws_s3_bucket.inbox.arn}/*"]
  }
}

resource "aws_iam_policy" "approve" {
  name        = "wr-files-approve"
  description = "Review and approve a staged document. Cannot write to the served bucket."
  policy      = data.aws_iam_policy_document.approve.json
}

resource "aws_iam_policy" "read" {
  name        = "wr-files-read"
  description = "Read the served bucket, for debugging."
  policy      = data.aws_iam_policy_document.read.json
}

data "aws_iam_policy_document" "read" {
  statement {
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = [aws_s3_bucket.prod.arn, "${aws_s3_bucket.prod.arn}/*"]
  }
}

# Attachment is optional so the policies can equally be wired to Identity
# Center permission sets, which is the recommended route for people.
resource "aws_iam_policy_attachment" "upload" {
  count      = length(var.upload_principals) == 0 ? 0 : 1
  name       = "wr-files-upload"
  policy_arn = aws_iam_policy.upload.arn
  roles      = var.upload_principals
}

resource "aws_iam_policy_attachment" "approve" {
  count      = length(var.approve_principals) == 0 ? 0 : 1
  name       = "wr-files-approve"
  policy_arn = aws_iam_policy.approve.arn
  roles      = var.approve_principals
}

# --------------------------------------------------------------- lambdas ----

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "promote" {
  name               = "wr-files-promote"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

data "aws_iam_policy_document" "promote" {
  statement {
    sid       = "ReadInbox"
    actions   = ["s3:GetObject", "s3:GetObjectVersion", "s3:GetObjectTagging", "s3:GetObjectVersionTagging", "s3:ListBucket"]
    resources = [aws_s3_bucket.inbox.arn, "${aws_s3_bucket.inbox.arn}/*"]
  }

  statement {
    sid       = "WriteServed"
    actions   = ["s3:PutObject", "s3:PutObjectAcl", "s3:DeleteObject", "s3:DeleteObjectVersion"]
    resources = ["${aws_s3_bucket.prod.arn}/*"]
  }

  statement {
    sid       = "Invalidate"
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.files.arn]
  }

  statement {
    sid       = "TriggerReindex"
    actions   = ["lambda:InvokeFunction"]
    resources = [aws_lambda_function.reindex.arn]
  }

  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_role_policy" "promote" {
  name   = "wr-files-promote"
  role   = aws_iam_role.promote.id
  policy = data.aws_iam_policy_document.promote.json
}

resource "aws_iam_role" "reindex" {
  name               = "wr-files-reindex"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

data "aws_iam_policy_document" "reindex" {
  statement {
    sid       = "ReadServed"
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = [aws_s3_bucket.prod.arn, "${aws_s3_bucket.prod.arn}/*"]
  }

  statement {
    sid       = "WriteIndex"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.prod.arn}/index.json"]
  }

  statement {
    sid       = "Invalidate"
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.files.arn]
  }

  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_role_policy" "reindex" {
  name   = "wr-files-reindex"
  role   = aws_iam_role.reindex.id
  policy = data.aws_iam_policy_document.reindex.json
}
