variable "vpc_cidr" {
  default = "10.0.0.0/16"
  type = string
}

variable "cluster_name" {
  type = string
  default = "mTrack"
}

variable "aws_region" {
  default = "ap-south-1"
}

variable "environment" {
  default = "dev"
}