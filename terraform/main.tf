module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.cluster_name}-vpc"
  cidr = var.vpc_cidr

  azs             = local.azs
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = true

  create_igw = true

  # NACL
  manage_default_network_acl = true
  default_network_acl_tags = { Name = "${var.cluster_name}-default-nacl" }

  # Route Table
  manage_default_route_table = true
  default_route_table_tags = { Name = "${var.cluster_name}-default-rt" }

  # Security Group
  manage_default_security_group = true
  default_security_group_tags = { Name = "${var.cluster_name}-default-sg" }

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}