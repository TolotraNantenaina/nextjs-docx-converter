# Next.js DOCX → PNG Converter

Une application Next.js simple qui convertit un fichier DOCX ou PDF en image PNG via API Route et App Router.

## Installation

Assurez-vous que LibreOffice et Ghostscript sont installés sur la machine.

```bash
# Sur macOS (avec Homebrew)
brew install libreoffice ghostscript imagemagick graphicsmagick

# Sur Ubuntu/Debian
sudo apt update
sudo apt install libreoffice ghostscript imagemagick graphicsmagick
```

Puis dans le dossier du projet :

```bash
npm install
```

## Usage

```bash
npm run dev
```

Ouvrez ensuite http://localhost:3000

## Docker

Le `Dockerfile` fourni installe LibreOffice et Ghostscript pour exécuter la conversion dans un conteneur.
