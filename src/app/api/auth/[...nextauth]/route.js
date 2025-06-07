import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/utils/db";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        let connection;
        try {
          connection = await pool.getConnection();

          // Recherche l'utilisateur par email
          const [rows] = await connection.execute(
            "SELECT * FROM usr_users WHERE email = ?",
            [credentials.email]
          );

          if (!rows || rows.length === 0) {
            return null; // Utilisateur non trouvé
          }

          const user = rows[0];

          // Vérifie le mot de passe
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null; // Mauvais mot de passe
          }

          // Retourne l'utilisateur (ajoute les champs nécessaires)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            status: user.status,
          };
        } catch (err) {
          console.error("Erreur NextAuth authorize:", err);
          throw new Error("Erreur serveur");
        } finally {
          if (connection) connection.release();
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/dashboard/login",
    error: "/dashboard/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      if (token?.status) session.user.status = token.status;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
