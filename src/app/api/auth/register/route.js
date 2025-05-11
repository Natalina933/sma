import pool from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  let connection;
  try {
    const { username, email, password } = await request.json();

    // Vérification des champs obligatoires
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // Vérifier si l'utilisateur existe déjà
    const [existingUser] = await connection.execute(
      "SELECT id FROM use_users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 409 }
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    await connection.execute(
      "INSERT INTO use_users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
};
