import pool from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  let connection;
  try {
    const { name, username, email, password, role } = await request.json();

    if (!name || !username || !email || !password || !role) {
      return NextResponse.json({ message: "Champs requis manquants" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Email invalide" }, { status: 400 });
    }

    connection = await pool.getConnection();

    const [existing] = await connection.execute(
      "SELECT id FROM usr_users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existing.length > 0) {
      return NextResponse.json({ message: "Email ou nom déjà utilisé" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      "INSERT INTO usr_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, username, email, hashedPassword, role]
    );

    return NextResponse.json({ message: "Gestionnaire créé", userId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Erreur register gestionnaire :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
};
