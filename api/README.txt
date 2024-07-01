docker-compose up --build


netstat -ano | findstr 8070

taskkill /F /pid {id}

How to create a new service ?

1 . Copy the template 
2 . Rename the folder 
3 . Config the .ENV file 
4 . Don't for to add the SERVICE NAME 
5 . Go to  ./src/index.ts add service name here [ app.use(' / { SERVICE_NAME }', routes); ]