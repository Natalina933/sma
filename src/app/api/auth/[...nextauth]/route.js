import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorized(credentials) {
        console.log({ credentials });

        // Vérifier si l'utilisateur existe.
        const userId = await User.findOne({ email: credentials.email });

        if (!userId) {
          throw new Error("Utilisateur non trouvé !");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          await User.findOne({ _id: userId }).then(user => user.password)
        );

        if (isPasswordCorrect) {
          const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);

          const session = {
            user: {
              id: userId,
              email: credentials.email,
            },
            token,
          };

          return session;
        } else {
          throw new Error("Invalid credentials!");
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],


  // pages: {
  //   // Redirigez vers la page de connexion en cas d'erreur
  //   error: "/dashboard/login",
  // }
});

export { handler as GET, handler as POST };
