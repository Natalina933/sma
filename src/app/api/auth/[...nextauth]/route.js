import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorized(credentials) {
        // Vérifier si l'utilisateur existe.
        try {
          await connect();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return Promise.reject(new Error("Utilisateur non trouvé!"));
          }
          //vérifier le mot de passe
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return { error: "Mot de passe incorrect" };
          }
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    error: "/dashboard/login",
  }
});

export { handler as GET, handler as POST };
