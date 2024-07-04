docker-compose up --build
netstat -ano | findstr 8070

taskkill /F /pid {id}

kubectl exec -it gateway-deployment-69cffc68cf-k4tds  -c gateway -- printenv

kubectl create secret generic jwt-secret --from-literal=JWT-KEY={any_value}