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
  kubectl scale deployment gateway-deployment --replicas=0
   kubectl scale deployment users-deployment  --replicas=0
   kubectl scale deployment ui-memploi-deployment --replicas=0
  kubectl scale deployment  emploi-deployment --replicas=0




   

emploi-service              LoadBalancer   10.245.27.127    159.89.246.9      3003:32468/TCP               81d
eureka-service              LoadBalancer   10.245.172.150   174.138.119.88    8070:30914/TCP               73d
gateway-service             LoadBalancer   10.245.70.130    165.227.250.151   80:31985/TCP,443:30319/TCP   81d
kubernetes                  ClusterIP      10.245.0.1       <none>            443/TCP                      81d
ui-memploi-service          LoadBalancer   10.245.59.109    45.55.96.100      80:30414/TCP,443:32716/TCP   73d
users-service               LoadBalancer   10.245.23.71     45.55.98.187      3002:32164/TCP               80d

kubectl delete service eureka-service 
kubectl delete service emploi-service 
kubectl delete service gateway-service
kubectl delete service ui-memploi-service
kubectl delete service users-service




   annotations:
    kubernetes.digitalocean.com/load-balancer-id: "20634e8b-73c5-4fea-99a0-96a89b5b1ee3"
    service.beta.kubernetes.io/do-loadbalancer-http-idle-timeout-seconds: "65"
    service.beta.kubernetes.io/do-loadbalancer-protocol: "http"
    service.beta.kubernetes.io/do-loadbalancer-tls-ports: "443"
    service.beta.kubernetes.io/do-loadbalancer-certificate-id: "eb7004be-bb83-4b3d-8094-9459adad52d8"
