output "domain_name" {
  description = "The contract. Everything else here is replaceable behind it."
  value       = var.domain_name
}

output "distribution_domain" {
  description = "Point the DNS record here if the zone is managed outside this stack."
  value       = aws_cloudfront_distribution.files.domain_name
}

output "certificate_validation_records" {
  description = "Create these if hosted_zone_id was left empty; the certificate stays PENDING_VALIDATION until they resolve."
  value = [
    for dvo in aws_acm_certificate.files.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
}

output "buckets" {
  value = {
    served = aws_s3_bucket.prod.id
    inbox  = aws_s3_bucket.inbox.id
    logs   = aws_s3_bucket.logs.id
  }
}

output "policies" {
  description = "Attach to Identity Center permission sets. Upload is the broad one; approve should be short."
  value = {
    upload  = aws_iam_policy.upload.arn
    approve = aws_iam_policy.approve.arn
    read    = aws_iam_policy.read.arn
  }
}

output "inbox_console_url" {
  description = "Bookmark this for technicians — it opens directly on the drop zone."
  value       = "https://${var.region}.console.aws.amazon.com/s3/buckets/${aws_s3_bucket.inbox.id}?region=${var.region}"
}
