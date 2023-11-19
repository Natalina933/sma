import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Error from "next/error";
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
         //Check if the user exists.
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            //vérifier le mot de passe
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Mot de passe incorrect");
            }
          } else {
            throw new Error("Utilisateur non trouvé!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
