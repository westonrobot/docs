# The delivery layer. Not optional: a bare S3 website endpoint is plaintext
# only, and TLS is required for embedded video, for archive integrity, and for
# a customer-facing download not to be flagged (ADR 0001 D2).

resource "aws_cloudfront_origin_access_control" "files" {
  name                              = local.prod_bucket
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_acm_certificate" "files" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = var.hosted_zone_id == "" ? {} : {
    for dvo in aws_acm_certificate.files.domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id         = var.hosted_zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "files" {
  count                   = var.hosted_zone_id == "" ? 0 : 1
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.files.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

resource "aws_cloudfront_distribution" "files" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "Weston Robot downloadable documents"
  aliases         = [var.domain_name]

  # North America and Europe plus Asia. Customers are in Asia; the cheapest
  # class that still covers Europe is the honest default here.
  price_class = "PriceClass_200"

  origin {
    domain_name              = aws_s3_bucket.prod.bucket_regional_domain_name
    origin_id                = "prod"
    origin_access_control_id = aws_cloudfront_origin_access_control.files.id
  }

  default_cache_behavior {
    target_origin_id       = "prod"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    # CachingOptimized. Object-level Cache-Control still governs freshness:
    # published keys are immutable, index.json is not.
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.hosted_zone_id == "" ? aws_acm_certificate.files.arn : aws_acm_certificate_validation.files[0].certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  logging_config {
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cloudfront/"
    include_cookies = false
  }
}

# The served bucket is readable by exactly one principal. This is not access
# control — the content is public — it is what stops the raw
# <bucket>.s3.amazonaws.com URL from working, so the branded hostname is the
# only URL that can end up in an email (ADR 0001 D3).
data "aws_iam_policy_document" "prod_bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.prod.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.files.arn]
    }
  }

  statement {
    sid     = "DenyDeleteExceptPromote"
    effect  = "Deny"
    actions = ["s3:DeleteObject", "s3:DeleteObjectVersion"]
    resources = [
      aws_s3_bucket.prod.arn,
      "${aws_s3_bucket.prod.arn}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "ArnNotEquals"
      variable = "aws:PrincipalArn"
      values   = [aws_iam_role.promote.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "prod" {
  bucket = aws_s3_bucket.prod.id
  policy = data.aws_iam_policy_document.prod_bucket.json

  depends_on = [aws_s3_bucket_public_access_block.prod]
}

resource "aws_route53_record" "files" {
  count   = var.hosted_zone_id == "" ? 0 : 1
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.files.domain_name
    zone_id                = aws_cloudfront_distribution.files.hosted_zone_id
    evaluate_target_health = false
  }
}
