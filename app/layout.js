import './globals.css';

export const metadata = {
  title: 'Convertisseur DOCX → PNG',
  description: 'Convertit un fichier DOCX en image PNG via Next.js API Route',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
