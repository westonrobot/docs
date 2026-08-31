variable "region" {
  description = "Where the buckets live. The rest of the company's AWS is here (ADR 0001 D2)."
  type        = string
  default     = "ap-southeast-1"
}

variable "domain_name" {
  description = "The customer-facing hostname. This is the contract (ADR 0001 D1); everything else in this file is replaceable."
  type        = string
  default     = "download.westonrobot.net"
}

variable "hosted_zone_id" {
  description = "Route 53 zone for domain_name. westonrobot.net lives in this account, so the default lets Terraform create the certificate validation records and the alias itself. Set to \"\" for a domain whose DNS is managed elsewhere — westonrobot.com is on Cloudflare, and would need both records added by hand."
  type        = string
  default     = "Z016356211Y82HTRJIPRB"
}

variable "bucket_prefix" {
  description = "Name prefix for the three buckets. Deliberately not renamed to match download.westonrobot.net: the hostname is the customer-facing contract (D1) while these names describe what the buckets hold, and `wr-download-inbox` would be actively wrong — nobody downloads from an inbox."
  type        = string
  default     = "wr-files"
}

variable "upload_principals" {
  description = "IAM principal ARNs allowed to put objects in the inbox — technicians and engineers. Their entire grant is PutObject on one bucket."
  type        = list(string)
  default     = []
}

variable "approve_principals" {
  description = "IAM principal ARNs allowed to tag an inbox object approved. Approving is the publishing decision, so this list should be short."
  type        = list(string)
  default     = []
}

variable "inbox_expiry_days" {
  description = "How long an un-promoted upload lingers. The inbox is a staging area, not storage."
  type        = number
  default     = 90
}

variable "noncurrent_version_days" {
  description = "How long superseded object versions are kept in the served bucket before expiring. Versioning protects against an accidental overwrite; it is not an archive."
  type        = number
  default     = 365
}
