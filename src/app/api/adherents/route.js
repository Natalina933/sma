import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    console.log("GET /api/adherents - Début");
    connection = await pool.getConnection();
    console.log("GET /api/adherents - Connexion à la DB réussie");

    const sql = "SELECT * FROM adh_members";
    console.log("GET /api/adherents - SQL:", sql);

    const [adh_members] = await connection.query(sql);
    console.log("GET /api/adherents - Résultats :", adh_members);

    return NextResponse.json(adh_members, { status: 200 });
  } catch (error) {
    console.error("GET /api/adherents - Erreur :", error);
    return NextResponse.json({ error: "Failed to fetch adherents" }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

export const POST = async (request) => {
  let connection;
  try {
    const data = await request.json();
    const { name, surname, mail, phone, address, complement, cp, city } = data;

    // Validation serveur
    if (!name || !surname || !mail || !phone) {
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO adh_members (name, surname, mail, phone, address, complement, cp, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, surname, mail, phone, address, complement, cp, city]
    );
    return NextResponse.json({ message: "Adhérent ajouté avec succès" }, { status: 201 });
  } catch (error) {
    console.error("Erreur API POST /api/adherents :", error);
    return NextResponse.json({ message: "Erreur lors de l'ajout de l'adhérent" }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
};