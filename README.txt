docker-compose up --build
netstat -ano | findstr 8070

taskkill /F /pid {id}

kubectl exec -it gateway-deployment-69cffc68cf-k4tds  -c gateway -- printenv

kubectl create secret generic {key_name} --from-literal=JWT-KEY={any_value}
kubectl scale deployment <deployment-name> --replicas=0
kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes/keycloak.yaml

kubectl scale deployment gateway-deployment --replicas=0
kubectl scale deployment keycloak-deployment --replicas=0
kubectl scale deployment ui-memploi-deployment --replicas=0
doctl compute certificate list
doctl compute load-balancer list --format "ID,Name,IP"