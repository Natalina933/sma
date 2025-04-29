import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import mysql from "mysql2/promise";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // Connexion à la base de données MySQL
        const connection = await connectDB();

        try {
          // Vérifier si l'utilisateur existe en cherchant par email
          const [rows] = await connection.execute(
            "SELECT * FROM use_users WHERE email = ?",
            [credentials.email]
          );

          if (rows.length === 0) {
            throw new Error("Utilisateur introuvable!");
          }

          const user = rows[0];

          // Comparer le mot de passe haché
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            // Si l'authentification réussit, retourner l'utilisateur
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            };
          } else {
            throw new Error("Mauvaises informations d'identification!");
          }
        } catch (err) {
          throw new Error("Erreur serveur");
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    // Rediriger vers la page de connexion en cas d'erreur
    error: "/dashboard/login",
  },

  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
