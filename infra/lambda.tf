# One zip, two handlers. Both functions share `wrfiles.py`, which is the only
# implementation of the key rules — so the engineer's directory notation and
# the technician's `__` notation cannot drift into producing different keys.

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/.build/lambda.zip"
  excludes    = ["test_wrfiles.py", "__pycache__"]
}

resource "aws_lambda_function" "promote" {
  function_name = "wr-files-promote"
  role          = aws_iam_role.promote.arn
  handler       = "promote.handler"
  runtime       = "python3.12"
  timeout       = 300
  memory_size   = 512

  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      PROD_BUCKET     = aws_s3_bucket.prod.id
      DISTRIBUTION_ID = aws_cloudfront_distribution.files.id
      REINDEX_NAME    = aws_lambda_function.reindex.function_name
    }
  }
}

resource "aws_lambda_function" "reindex" {
  function_name = "wr-files-reindex"
  role          = aws_iam_role.reindex.arn
  handler       = "reindex.handler"
  runtime       = "python3.12"
  timeout       = 300
  memory_size   = 256

  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      PROD_BUCKET     = aws_s3_bucket.prod.id
      DISTRIBUTION_ID = aws_cloudfront_distribution.files.id
      BASE_URL        = "https://${var.domain_name}"
    }
  }
}

resource "aws_lambda_permission" "promote_from_inbox" {
  statement_id  = "AllowInboxTagging"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.promote.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.inbox.arn
}

# Promotion is driven by tagging, not by upload: an object appearing in the
# inbox means nothing until somebody approves it.
#
# Note there is deliberately no notification on the served bucket. Reindexing
# is invoked by the promote function instead, because a notification on object
# creation would fire on index.json and re-trigger itself.
resource "aws_s3_bucket_notification" "inbox" {
  bucket = aws_s3_bucket.inbox.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.promote.arn
    events              = ["s3:ObjectTagging:Put"]
  }

  depends_on = [aws_lambda_permission.promote_from_inbox]
}
