import { NextResponse } from "next/server";
import pool from "@/utils/db";

// Helper de validation d'ID
function isValidId(id) {
  return !isNaN(id) && Number.isInteger(Number(id)) && Number(id) > 0;
}

// GET : Récupérer un adhérent par ID
export const GET = async (_request, { params }) => {
  const { id } = params;
  if (!isValidId(id)) {
    return NextResponse.json({ message: "ID invalide" }, { status: 400 });
  }
  try {
    const [rows] = await pool.query("SELECT * FROM adh_members WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Adhérent non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ adherent: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'adhérent :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
};

// PUT : Mettre à jour un adhérent par ID
export const PUT = async (request, { params }) => {
  const { id } = params;
  if (!isValidId(id)) {
    return NextResponse.json({ message: "ID invalide" }, { status: 400 });
  }
  try {
    const data = await request.json();
    // On force tous les champs à une valeur par défaut si undefined
    const {
      name = "",
      surname = "",
      mail = "",
      phone = "",
      address = "",
      complement = "",
      cp = "",
      city = "",
      date_of_birth = null,
      profile_picture = null,
      membership_type = "single",
      membership_start = null,
      membership_end = null,
      payment_status = null,
      payment_method = null,
      preferred_contact = null,
      newsletter_subscription = 1,
      notes = null
    } = data;

    if (![name, surname, mail].every(Boolean)) {
      return NextResponse.json({ message: "Champs obligatoires manquants" }, { status: 400 });
    }

    const [result] = await pool.query(
      `UPDATE adh_members
      SET name = ?, surname = ?, mail = ?, phone = ?, address = ?, complement = ?, cp = ?, city = ?,
          date_of_birth = ?, profile_picture = ?, membership_type = ?, membership_start = ?, membership_end = ?,
          payment_status = ?, payment_method = ?, preferred_contact = ?, newsletter_subscription = ?, notes = ?
      WHERE id = ?`,
      [
        name, surname, mail, phone, address, complement, cp, city,
        date_of_birth, profile_picture, membership_type, membership_start, membership_end,
        payment_status, payment_method, preferred_contact, newsletter_subscription, notes,
        id
      ]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Adhérent non trouvé" }, { status: 404 });
    }

    const [updatedRows] = await pool.query("SELECT * FROM adh_members WHERE id = ?", [id]);
    return NextResponse.json({ adherent: updatedRows[0] }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adhérent :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
};

// DELETE : Supprimer un adhérent par ID
export const DELETE = async (_request, { params }) => {
  const { id } = params;
  if (!isValidId(id)) {
    return NextResponse.json({ message: "ID invalide" }, { status: 400 });
  }
  try {
    const [result] = await pool.query("DELETE FROM adh_members WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Adhérent non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
};
