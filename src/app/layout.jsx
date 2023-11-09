import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import { ThemeProvider } from "../context/ThemeContext";
// import { AuthProvider } from "../components/authProvider/AuthProvider"


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SMA",
  description: "Association Saint-Mandé Accueil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider>
          {/* <AuthProvider> */}
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}