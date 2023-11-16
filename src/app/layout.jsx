import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import { AuthProvider } from "../components/authProvider/AuthProvider"
import { ThemeProvider } from "../context/ThemeContext";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SMA",
  description: "Association Saint-Mandé Accueil",
};

export default function RootLayout({ children }) {
  return (
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
}