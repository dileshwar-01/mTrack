# fetches all availibility zones in your current region
data "aws_availability_zones" "available" {
  state = "available"
}

# Fetch your current AWS account info (used internally by modules).
data "aws_caller_identity" "current" {}

locals {
    azs = slice(data.aws_availability_zones.available.names, 0, 3)    # fetch first three azs

    # Common tags applied to all resources
    common_tags = {
      Environment   = var.environment
      Project       = "mTrack"
      ManagedBy     = "terraform"
      CreatedBy     = "Daksh Sawhney"
      Owner         = data.aws_caller_identity.current.user_id
      CreatedDate   = formatdate("YYYY-MM-DD", timestamp())
    }
    
    # Kubernetes subnet tags
    #! We must specify, Load Balancer should conect to which subnets like without that it would be able to connect to vpc and application running insie subnet true

    public_subnet_tags = {
      "kubernetes.io/cluster/${var.cluster_name}" = "shared"
      "kubernetes.io/role/elb"                      = "1"
    }
    
    private_subnet_tags = {
      "kubernetes.io/cluster/${var.cluster_name}" = "shared"
      "kubernetes.io/role/internal-elb"             = "1"
    }
}