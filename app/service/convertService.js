import { formatFileSize } from '../helper/pageHelper';

// ─── Core conversion: Using existing API ──────────────────────────────────────

export async function convertDocxToImage(file) {

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/convert", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !Array.isArray(data.images)) {
    throw new Error(data.error || "Erreur lors de la conversion");
  }

  return {
    images: data.images.map((base64) => `data:image/png;base64,${base64}`),
    fileName: file.name.replace(/\.(docx|pdf)$/i, `.png`),
    fileSize: formatFileSize(file.size),
    pageCount: data.pageCount,
  };
}