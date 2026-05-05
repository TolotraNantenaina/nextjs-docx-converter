//"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
export const APP_STATES = {
  IDLE: "inactif",
  PROCESSING: "traitement",
  SUCCESS: "succes",
  ERROR: "erreur"
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export function getStateLabel(state) {
  const labels = {
    inactif: `Inactif`,
    traitement: `Traitement`,
    succes: `Succès`,
    erreur: `Erreur`,
  };
  return labels[state];
}

export async function createOrUpdateRoot(strPath) {
  
  // Définit le chemin complet du dossier de téléchargement
  const uploadDir = path.join(process.cwd(), strPath);

  try {
    // Créer le dossier s'il n'existe pas
    await fs.mkdir(uploadDir, { recursive: true });

    return { success: true, path: uploadDir };
  } catch (error) {
    return { error: error.message };
  }
}