// /api/activity-members/[id]/route.js
import { NextResponse } from "next/server";
import pool from "@/utils/db";

export async function DELETE(request, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "id requis" }, { status: 400 });
  }
  try {
    const [result] = await pool.query(
      "DELETE FROM act_activity_members WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Inscription non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const { activity_id, member_id } = await request.json();
  if (!id || !activity_id || !member_id) {
    return NextResponse.json(
      { error: "Paramètres manquants" },
      { status: 400 }
    );
  }
  try {
    const [result] = await pool.query(
      "UPDATE act_activity_members SET activity_id = ?, member_id = ? WHERE id = ?",
      [activity_id, member_id, id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Inscription non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
