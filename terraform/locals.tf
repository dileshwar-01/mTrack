# fetches all availibility zones in your current region
data "aws_availability_zones" "available" {
  state = "available"
}

# Fetch your current AWS account info (used internally by modules).
data "aws_caller_identity" "current" {}

locals {
    azs = slice(data.aws_availability_zones.available.names, 0, 3)    # fetch first three azs
}