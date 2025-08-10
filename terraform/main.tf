module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.cluster_name}-vpc"
  cidr = var.vpc_cidr

  azs             = local.azs
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

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

  # Kubernetes-Specific tags to subnets -- merging because it gets both common tags and subnet tags
  public_subnet_tags = merge(local.common_tags, local.public_subnet_tags)
  private_subnet_tags = merge(local.common_tags, local.private_subnet_tags)

  tags = local.common_tags
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = var.cluster_name
  kubernetes_version = "1.31"

  endpoint_public_access = true
  endpoint_private_access = true
  enable_cluster_creator_admin_permissions = true

  # Simplified Node Management
  compute_config = {
    enabled    = true
    node_pools = ["general-purpose"]
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # KMS Configuration
  create_kms_key = true
  kms_key_description = "EKS cluster ${var.cluster_name} KMS Key"
  kms_key_deletion_window_in_days = 7

  tags = local.common_tags

  depends_on = [ module.vpc ]
}