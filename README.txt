docker-compose up --build
netstat -ano | findstr 8070

taskkill /F /pid {id}

kubectl exec -it gateway-deployment-69cffc68cf-k4tds  -c gateway -- printenv
kubectl exec -it eureka-deployment-65f9f67474-lg6q4  -c gateway -- printenv

kubectl create secret generic {key_name} --from-literal=JWT-KEY={any_value}
kubectl scale deployment <deployment-name> --replicas=0
kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes/keycloak.yaml

kubectl scale deployment gateway-deployment --replicas=0
kubectl scale deployment users-deployment --replicas=0
kubectl scale deployment eureka-deployment --replicas=0
kubectl scale deployment users-deployment --replicas=0


kubectl scale deployment ui-memploi-deployment --replicas=0
doctl compute certificate list
doctl compute load-balancer list --format "ID,Name,IP"

kubectl exec -it {}  -c gateway -- printenv
ns3.digitalocean.com.

TXT google : google-site-verification=WRB5DYNlESHnVbTtQE4MPcYnRpZEuQmWwovmlzT2_LA

 kubectl delete pod emploi-deployment-fd477886-7tff7  --force

  kubectl delete pod  eureka-deployment-7f64b98496-r96f2  --force
  kubectl delete pod  eureka-deployment-7f64b98496-tl644  --force
  kubectl delete pod  eureka-deployment-bbfcf57c4-ghdh6   --force

  kubectl scale deployment eureka-deployment --replicas=0
  kubectl scale deployment gateway-deployment --replicas=0
  kubectl scale deployment users-deployment  --replicas=0
  kubectl scale deployment ui-memploi-deployment --replicas=0
  kubectl scale deployment  emploi-deployment --replicas=0

kubectl scale deployment eureka-deployment --replicas=1
kubectl scale deployment gateway-deployment --replicas=1
kubectl scale deployment users-deployment  --replicas=1
kubectl scale deployment ui-memploi-deployment --replicas=1
kubectl scale deployment  emploi-deployment --replicas=1



kubectl delete service eureka-service 
kubectl delete service emploi-service 
kubectl delete service gateway-service
kubectl delete service ui-memploi-service
kubectl delete service users-service

kubectl delete deployment eureka-deployment
kubectl delete deployment gateway-deployment
kubectl delete deployment users-deployment
kubectl delete deployment ui-memploi-deployment
kubectl delete deployment emploi-deployment

kubectl rollout restart deployment eureka-deployment
kubectl rollout restart deployment gateway-deployment
kubectl rollout restart deployment users-deployment
kubectl rollout restart deployment ui-memploi-deployment
kubectl rollout restart deployment emploi-deployment




   annotations:
    kubernetes.digitalocean.com/load-balancer-id: "aa38e471-f990-4152-8c42-b5ba9904523a"
    service.beta.kubernetes.io/do-loadbalancer-http-idle-timeout-seconds: "65"
    service.beta.kubernetes.io/do-loadbalancer-protocol: "http"
    service.beta.kubernetes.io/do-loadbalancer-tls-ports: "8070"
    service.beta.kubernetes.io/do-loadbalancer-certificate-id: "eb7004be-bb83-4b3d-8094-9459adad52d8"


     annotations:
    kubernetes.digitalocean.com/load-balancer-id: "2c11d3de-035d-483d-bba1-0fe0c7af72fe"
    service.beta.kubernetes.io/do-loadbalancer-http-idle-timeout-seconds: "65"
    service.beta.kubernetes.io/do-loadbalancer-protocol: "http"
    service.beta.kubernetes.io/do-loadbalancer-tls-ports: "443"
    service.beta.kubernetes.io/do-loadbalancer-certificate-id: "932680d8-03b0-4d65-b849-9bb6f64f2cbf"


kubectl exec -it eureka-deployment-6794bff74c-9n7rb  -c eureka -- printenv