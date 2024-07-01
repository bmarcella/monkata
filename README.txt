docker-compose up --build
netstat -ano | findstr 8070

taskkill /F /pid {id}