import Navbar from "@/components/layout/navbar/Navbar";
import "./globals.css"; // Fichier de styles globaux
import { Inter } from "next/font/google"; // Import de la police Inter depuis Google Fonts
import Footer from "@/components/layout/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext"; // Import du fournisseur de thème
import AuthProvider from "@/components/auth/authProvider/AuthProvider"; // Import du fournisseur d'authentification

// Définition de la police Inter avec un sous-ensemble latin
const inter = Inter({ subsets: ["latin"] });

// Métadonnées de la page
export const metadata = {
  title: "SMA",
  description: "Association Saint-Mandé Accueil",
};


const RootLayout = ({ children }) => (
  <html lang="fr">
    <head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </head>
    <body className={inter.className}>
      <ThemeProvider>
        <AuthProvider>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;