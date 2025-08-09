# fetches all availibility zones in your current region
data "aws_availability_zones" "available" {
  state = "available"
}

locals {
    azs = slice(data.aws_availability_zones.available, 0, 3)    # fetch first three azs
}