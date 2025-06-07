import pool from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  let connection;
  try {
    const { username, email, password } = await request.json();

    // Validation basique
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Vérification du format d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Format d'email invalide" },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();

    // Vérifie unicité email et username
    const [existing] = await connection.execute(
      "SELECT id FROM usr_users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 409 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion
    const [result] = await connection.execute(
      "INSERT INTO usr_users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", userId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  } finally {
    try {
      if (connection) connection.release();
    } catch (e) {
      // ignore
    }
  }
};
