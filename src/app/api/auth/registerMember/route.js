import pool from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  let connection;
  try {
    const { name, surname, mail, password } = await request.json();

    // Validation basique
    if (!name || !surname || !mail || !password) {
      return NextResponse.json(
        { message: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Vérifie unicité email
    connection = await pool.getConnection();
    const [existing] = await connection.execute(
      "SELECT id FROM adh_members WHERE mail = ?",
      [mail]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email déjà utilisé" },
        { status: 409 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // puis stocke hashedPassword dans la colonne password

    // Insertion du membre
    const [result] = await connection.execute(
      "INSERT INTO adh_members (name, surname, mail, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, surname, mail, hashedPassword, "member"]
    );

   

    return NextResponse.json(
      { message: "Adhérent créé avec succès", userId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'adhérent :", error);
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
