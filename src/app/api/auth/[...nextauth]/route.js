import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/utils/db"; // Utilise le pool créé dans src/utils/db.js

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
          // Ouvre une connexion à chaque appel
          connection = await pool.getConnection();

          // Vérifie si l'utilisateur existe (adapte le nom de la table si besoin)
          const [rows] = await connection.execute(
            "SELECT * FROM usr_users WHERE email = ?",
            [credentials.email]
          );

          if (rows.length === 0) {
            throw new Error("Utilisateur introuvable!");
          }

          const user = rows[0];

          // Vérifie le mot de passe haché
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            // Retourne l'utilisateur si authentification réussie
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
    signIn: "/dashboard",
    error: "/dashboard/login",
  },

  callbacks: {
    async session({ session, token }) {
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
