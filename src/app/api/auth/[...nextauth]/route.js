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
      id: "admin-credentials",
      name: "Gestionnaire",
      async authorize(credentials) {
        const [rows] = await pool.execute(
          "SELECT * FROM usr_users WHERE email = ?",
          [credentials.email]
        );
        const user = rows[0];
        if (!user || user.role !== "admin") return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      id: "member-credentials",
      name: "Adhérent",
      async authorize(credentials) {
        const [rows] = await pool.execute(
          "SELECT * FROM adh_members WHERE mail = ?",
          [credentials.email]
        );
        const user = rows[0];
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.mail,
          role: "member",
        };
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
