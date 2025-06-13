import pool from "@/utils/db";
import { NextResponse } from "next/server";

// GET toutes les activités ou filtrées par catégorie
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = `
    SELECT 
      a.*, 
      c.title AS category_title,
      c.img AS category_img,
      c.alt AS category_alt
    FROM act_activities a
    LEFT JOIN act_categories c ON a.category_id = c.id
  `;
  const params = [];

  if (category) {
    query += " WHERE a.category_id = ?";
    params.push(category);
  }

  try {
    const [rows] = await pool.execute(query, params);
    return Response.json(rows);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
export const PUT = async (request, { params }) => {
  try {
    const body = await request.json();
    const fields = [
      "title",
      "description",
      "date",
      "place",
      "price",
      "organizer_id",
      "organizer",
      "capacity",
      "img",
      "alt",
      "category_id", // <--- CORRECTION ICI
      "inscription",
      "keywords",
    ];
    const updates = [];
    const values = [];

    fields.forEach((field) => {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    });

    if (updates.length === 0) {
      return new NextResponse("Aucune donnée à mettre à jour", { status: 400 });
    }

    values.push(params.id);

    await pool.execute(
      `UPDATE act_activities SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    const [rows] = await pool.execute(
      `SELECT * FROM act_activities WHERE id = ?`,
      [params.id]
    );

    if (rows.length === 0) {
      return new NextResponse("Activité non trouvée", { status: 404 });
    }

    return new NextResponse(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};
export const DELETE = async (_, { params }) => {
  try {
    const [result] = await pool.execute(
      "DELETE FROM act_activities WHERE id = ?",
      [params.id]
    );
    if (result.affectedRows === 0) {
      return new NextResponse("Activité non trouvée", { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({ message: "Activité supprimée" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};
