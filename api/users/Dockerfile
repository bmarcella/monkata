FROM node:latest


WORKDIR /app
# Copiez les fichiers compilés/dist de vos projets dans le conteneur
COPY ./dist/common /app/common
COPY ./dist/emploi /app/users

# Copiez le package.json dans le répertoire /emploi
COPY package.json /app/users/

# Installez les dépendances dans le répertoire /emploi
WORKDIR /app/users
RUN npm install

# Exposez le port sur lequel votre application Node.js s'exécutera
EXPOSE 3002

# Définissez la commande pour démarrer votre application Node.js
CMD ["npm", "start"]