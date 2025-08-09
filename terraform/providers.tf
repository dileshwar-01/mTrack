terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
        source  = "hashicorp/aws"
        version = ">= 5.0"
    }
    kubernetes = {
        source  = "hashicorp/kubernetes"
        version = ">= 2.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# K8S configuration, due to which i can connect to my EKS Cluster through CLI
provider "kubernetes" {
  host = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}