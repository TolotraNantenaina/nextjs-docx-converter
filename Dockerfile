# Utilise une image Node.js avec Debian pour pouvoir installer LibreOffice et Ghostscript
FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  libreoffice \
  ghostscript \
  imagemagick \
  graphicsmagick \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
