docker-compose up --build
netstat -ano | findstr 8070

taskkill /F /pid {id}

kubectl exec -it gateway-deployment-69cffc68cf-k4tds  -c gateway -- printenv

kubectl create secret generic {key_name} --from-literal=JWT-KEY={any_value}

kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes/keycloak.yaml