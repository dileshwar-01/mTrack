module "eks_addons" {
    source  = "aws-ia/eks-blueprints-addons/aws"
    version = "~> 1.0"

    cluster_name = module.eks.cluster_name
    cluster_version = module.eks.cluster_version
    cluster_endpoint = module.eks.cluster_endpoint
    oidc_provider_arn = module.eks.oidc_provider_arn

    # CERT MANAGER # Manages SSL certificates inside Kubernetes.
    enable_cert_manager = true
    cert_manager = {
        most_recent = true
        namespace = "cert-manager"
    }

    # Cluster Autoscaler # Automatically adds/removes worker nodes based on load.
    enable_cluster_autoscaler = true
    cluster_autoscaler = {
        most_recent = true
        namespace = "kube-system"
    }

    # NginX Ingress Controller
    enable_ingress_nginx = true
    ingress_nginx = {
        most_recent = true
        namespace = "ingress-nginx"

        # Basic Configuration -- configure this with NLB and health check notations
        set = [
            {
                name  = "controller.service.type"
                value = "LoadBalancer"
            },
            {
                name  = "controller.service.externalTrafficPolicy"
                value = "Local"
            },
            {
                name  = "controller.resources.requests.cpu"
                value = "100m"
            },
            {
                name  = "controller.resources.requests.memory"
                value = "128Mi"
            },
            {
                name  = "controller.resources.limits.cpu"
                value = "200m"
            },
            {
                name  = "controller.resources.limits.memory"
                value = "256Mi"
            }
        ]
        
        # AWS Load Balancer specific annotations
        set_sensitive = [
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-scheme"
                value = "internet-facing"
            },
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"
                value = "alb"
            },
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-nlb-target-type"
                value = "instance"
            },
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-path"
                value = "/healthz"
            },
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-port"
                value = "10254"
            },
            {
                name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-protocol"
                value = "HTTP"
            }
        ]
    }
    depends_on = [ module.eks ]
}