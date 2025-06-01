import Navbar from "@/components/layout/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/auth/authProvider/AuthProvider";

// Définition de la police Inter avec un sous-ensemble latin
const inter = Inter({ subsets: ["latin"] });

// Métadonnées de la page (gérées automatiquement par Next.js App Router)
export const metadata = {
  title: "SMA",
  description: "Association Saint-Mandé Accueil",
};

const RootLayout = ({ children }) => (
  <html lang="fr" suppressHydrationWarning={true}>
    <body className={inter.className} suppressHydrationWarning={true}>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
