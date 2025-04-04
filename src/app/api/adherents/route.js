// src/app/api/adherents/route.js
import { createConnection } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /api/adherents - Début");
    const db = await createConnection();
    console.log("GET /api/adherents - Connexion à la DB réussie");

    const sql = "SELECT * FROM adh_members";
    console.log("GET /api/adherents - SQL:", sql);

    const [adh_members] = await db.query(sql);
    console.log("GET /api/adherents - Résultats :", adh_members);

    return NextResponse.json(adh_members, { status: 200 });
  } catch (error) {
    console.error("GET /api/adherents - Erreur :", error);
    return NextResponse.json({ error: "Failed to fetch adherents" }, { status: 500 });
  }
}
