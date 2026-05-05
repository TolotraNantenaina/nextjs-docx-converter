import './globals.css';
import { Providers } from './providers'; // Importez le nouveau fournisseur

export const metadata = {
  title: 'Convertisseur DOCX, PDF → PNG',
  description: 'Convertit un fichier DOCX ou PDF en image PNG via Next.js API Route',
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
