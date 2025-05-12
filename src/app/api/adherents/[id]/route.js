import { NextResponse } from "next/server";
import pool from "@/utils/db";

// GET : Récupérer un adhérent par ID
export const GET = async (_request, { params }) => {
  const { id } = params;
  try {
    const [rows] = await pool.query("SELECT * FROM adh_members WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }
    return new NextResponse(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'adhérent :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

// PUT : Mettre à jour un adhérent par ID
export const PUT = async (request, { params }) => {
  const { id } = params;
  try {
    const data = await request.json();
    const { name, surname, mail, phone, address, complement, cp, city } = data;
    const [result] = await pool.query(
      "UPDATE adh_members SET name = ?, surname = ?, mail = ?, phone = ?, address = ?, complement = ?, cp = ?, city = ? WHERE id = ?",
      [name, surname, mail, phone, address, complement, cp, city, id]
    );
    if (result.affectedRows === 0) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }
    return new NextResponse(JSON.stringify({ id, ...data }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adhérent :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

// DELETE : Supprimer un adhérent par ID
export const DELETE = async (_request, { params }) => {
  const { id } = params;
  try {
    const [result] = await pool.query("DELETE FROM adh_members WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({ message: "Supprimé avec succès" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};
