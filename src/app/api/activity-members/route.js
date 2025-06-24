// /api/activity-members/route.js
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function POST(request) {
  const { activity_id, member_id } = await request.json();
  if (!activity_id || !member_id) {
    return NextResponse.json(
      { error: "Paramètres manquants" },
      { status: 400 }
    );
  }
  try {
    // Vérifier si l'inscription est autorisée
    const [[{ inscription }]] = await pool.query(
      "SELECT inscription FROM act_activities WHERE id = ?",
      [activity_id]
    );
    if (inscription !== "oui") {
      return NextResponse.json(
        { error: "Inscription non autorisée" },
        { status: 403 }
      );
    }
    // Vérifier si déjà inscrit
    const [[{ count }]] = await pool.query(
      "SELECT COUNT(*) as count FROM act_activity_members WHERE activity_id = ? AND member_id = ?",
      [activity_id, member_id]
    );
    if (count > 0) {
      return NextResponse.json({ error: "Déjà inscrit" }, { status: 409 });
    }
    // Vérifier la capacité
    const [[{ capacity }]] = await pool.query(
      "SELECT capacity FROM act_activities WHERE id = ?",
      [activity_id]
    );
    const [[{ inscrits }]] = await pool.query(
      "SELECT COUNT(*) as inscrits FROM act_activity_members WHERE activity_id = ?",
      [activity_id]
    );
    if (capacity !== null && inscrits >= capacity) {
      return NextResponse.json({ error: "Activité complète" }, { status: 403 });
    }
    // Inscription
    await pool.query(
      "INSERT INTO act_activity_members (activity_id, member_id) VALUES (?, ?)",
      [activity_id, member_id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur d'inscription" },
      { status: 500 }
    );
  }
}
// /api/activity-members/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const activity_id = searchParams.get("activity_id");
  const member_id = searchParams.get("member_id");

  try {
    if (activity_id) {
      // Récupérer les membres inscrits à une activité
      const [rows] = await pool.query(
        `SELECT m.id, m.name, m.surname, m.mail
                 FROM act_activity_members am
                 JOIN adh_members m ON am.member_id = m.id
                 WHERE am.activity_id = ?`,
        [activity_id]
      );
      return NextResponse.json(rows);
    } else if (member_id) {
      // Récupérer les activités auxquelles un membre est inscrit
      const [rows] = await pool.query(
        `SELECT a.id as activity_id, a.title, a.date, a.place
                 FROM act_activity_members am
                 JOIN act_activities a ON am.activity_id = a.id
                 WHERE am.member_id = ?`,
        [member_id]
      );
      return NextResponse.json(rows);
    } else {
      return NextResponse.json(
        { error: "activity_id ou member_id requis" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
