import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";


const handler = NextAuth({
  pages:{
    signIn:"/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorized(credentials) {
        // Vérifier si l'utilisateur existe.
        try {
          const user=await Login(credentials)
          console.log("Cet Utilisateur est=",user);
          return user;
          // console.log({credentials});
          // await connect();
          // const user = await User.findOne({
          //   email: credentials.email
          // });
          // if (!user) {
          //   return Promise.reject(new Error("Utilisateur non trouvé !"));
          // }

          // Vérifier le mot de passe
          // const isPasswordCorrect = await bcrypt.compare(
          //   credentials.password,
          //   user.password
          // );

          // if (isPasswordCorrect) {
          //   // Generate a JWT token
          //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

          //   // Stocker le token dans la session
          //   const session = {
          //     user: {
          //       id: user._id,
          //       email: user.email,
          //     },
          //     token,
          //   };

          //   return session;
          // } else {
          //   throw new Error("Invalid credentials!");
          // }
        } catch (error) {
          console.log("Error=",error);
          return null
          // throw new Error(err);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],



  // pages: {
  //   // Redirigez vers la page de connexion en cas d'erreur
  //   error: "/dashboard/login",
  // }
});

export { handler as GET, handler as POST };
