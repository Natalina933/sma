import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  let connection;
  try {
    // Récupérer les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const offset = (page - 1) * limit;
    const sort = searchParams.get("sort") || "id";
    const direction = searchParams.get("direction") === "desc" ? "DESC" : "ASC";

    // Liste blanche des champs de tri autorisés
    const allowedSorts = [
      "id", "name", "surname", "mail", "phone", "city", "cp",
      "membership_type", "membership_start", "membership_end", "payment_status", "status"
    ];
    const sortKey = allowedSorts.includes(sort) ? sort : "id";

    connection = await pool.getConnection();

    // Compter le nombre total d'adhérents
    const [countRows] = await connection.query("SELECT COUNT(*) as count FROM adh_members");
    const total = countRows[0].count;

    // Récupérer les adhérents paginés et triés
    const [rows] = await connection.query(
      `SELECT * FROM adh_members ORDER BY ${sortKey} ${direction} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return NextResponse.json({ adherents: rows, total }, { status: 200 });
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
