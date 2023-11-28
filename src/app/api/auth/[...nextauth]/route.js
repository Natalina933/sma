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
            return Promise.reject(new Error("Email ou mot de passe invalide !"));
          }

          // Vérifier le mot de passe
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return { error: "Email ou mot de passe invalide" };
          }

          // Générer un jeton en utilisant la bibliothèque JSON Web Token (JWT)
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

          // Stocker le jeton dans la session
          const session = {
            user: {
              id: user._id,
              email: user.email,
            },
            token,
          };

          return session;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
      // Redirigez vers la page de connexion en cas d'erreur
    error: "/dashboard/login",
  }
});

export { handler as GET, handler as POST };
