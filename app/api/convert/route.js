import { NextResponse } from "next/server";
import libre from "libreoffice-convert";
import { fromBuffer } from "pdf2pic";
import { PDFDocument } from 'pdf-lib';
import fs from "fs";
import path from "path";

// Correction du promisify pour libreoffice-convert
const convertAsync = (buffer, ext, opts) => 
  new Promise((resolve, reject) => {
    libre.convert(buffer, ext, opts, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const name = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pdfBuffer;
    if (file.type === "application/pdf" || name.toLowerCase().endsWith(".pdf")) {
      pdfBuffer = buffer;
    } else {
      // Conversion DOCX -> PDF
      pdfBuffer = await convertAsync(buffer, ".pdf", undefined);
    }

    // Charger le PDF pour compter les pages
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfDoc.getPageCount();

    const fileName = name ? name.replace(/\.[^/.]+$/, "") : `conv_${Date.now()}`;
    const savePath = "/tmp"; // Assurez-vous que ce dossier existe ou utilisez path.join(process.cwd(), 'tmp')

    const options = {
      density: 100,
      format: "png",
      width: 1200,
      height: 1600,
      savePath: savePath,
      saveFilename: fileName,
    };

    const convert = fromBuffer(pdfBuffer, options);

    // Utilisation de for...of ou Promise.all correct avec AWAIT
    const images = [];
    for (let i = 1; i <= pageCount; i++) {
      const output = await convert(i); // INDISPENSABLE : await ici
      
      if (output.path) {
        const imageBuffer = fs.readFileSync(output.path);
        images.push(imageBuffer.toString('base64'));
        
        // Nettoyage immédiat
        fs.unlinkSync(output.path);
      }
    }

    return NextResponse.json({ images, fileName, pageCount });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json({ error: error.message || "Erreur de conversion" }, { status: 500 });
  }
}
