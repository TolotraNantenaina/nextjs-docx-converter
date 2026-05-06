import './globals.css';
import { Providers } from './providers'; // Importez le nouveau fournisseur

export const metadata = {
  title: 'Convertisseur DOCX, PDF → PNG',
  description: 'Convertit un fichier DOCX ou PDF en image PNG via Next.js API Route',
  opensGraph: {
    title: 'Convertisseur DOCX, PDF → PNG',
    description: 'Convertit un fichier DOCX ou PDF en image PNG via Next.js API Route',
    url: 'https://doc-vers-image.onrender.com',
    siteName: 'DocVersImage',
    images: [
      {
        url: 'https://doc-vers-image.onrender.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DocVersImage - Convertisseur DOCX, PDF → PNG',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertisseur DOCX, PDF → PNG',
    description: 'Convertit un fichier DOCX ou PDF en image PNG via Next.js API Route',
    images: ['https://doc-vers-image.onrender.com/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
