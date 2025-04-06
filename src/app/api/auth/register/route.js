import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { name, username, email, password } = await request.json();

    // Connexion à la base de données MySQL
    const connection = await connectDB();

    console.log({ name, username, email, password });

    // Vérifier si l'utilisateur existe déjà (par email ou nom)
    const [existingUser] = await connection.execute(
      "SELECT * FROM use_users WHERE email = ? OR name = ?",
      [email, name]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà" },
        {
          status: 400,
        }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // Utiliser un facteur de hachage plus sécurisé

    // Insérer le nouvel utilisateur dans la base de données
    await connection.execute(
      "INSERT INTO use_users (name, username, email, password) VALUES (?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      {
        status: 201, // Utilisateur créé avec succès
      }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return NextResponse.json(error.message, {
      status: 500, // Erreur serveur
    });
  }
};
