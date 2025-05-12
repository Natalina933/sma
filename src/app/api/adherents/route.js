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
