FROM node:latest

WORKDIR /app
# Copiez les fichiers compilés/dist de vos projets dans le conteneur
COPY ./dist/common /app/common
COPY ./dist/api /app/api

# Copiez le package.json dans le répertoire /emploi
COPY package.json /app/api/admin

# Copiez le package.json dans le répertoire /emploi
COPY .env /app/api/admin

# Installez les dépendances dans le répertoire /emploi
WORKDIR /app/api/admin

RUN npm install --force

# Exposez le port sur lequel votre application Node.js s'exécutera
EXPOSE 3001


# Définissez la commande pour démarrer votre application Node.js
CMD ["npm", "start"]