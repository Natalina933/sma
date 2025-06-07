import { NextResponse } from "next/server";
import pool from "@/utils/db";

// GET : Récupérer toutes les activités
export const GET = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM act_activities ORDER BY date DESC"
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des activités :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
};

// POST : Créer une nouvelle activité
export const POST = async (request) => {
  let connection;
  try {
    const body = await request.json();
    const {
      title,
      description,
      date,
      place,
      price,
      organizer_id,
      organizer,
      capacity,
      img,
      alt,
      category,
      rating,
      programme,
      inscription,
      keywords,
    } = body;

    // Validation basique
    if (!title || !date) {
      return NextResponse.json(
        { message: "Titre et date sont obligatoires" },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO act_activities 
        (title, description, date, place, price, organizer_id, organizer, capacity, img, alt, category, rating, programme, inscription, keywords) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        date,
        place,
        price,
        organizer_id,
        organizer,
        capacity,
        img,
        alt,
        category,
        rating,
        programme,
        inscription,
        keywords,
      ]
    );

    return NextResponse.json({ id: result.insertId, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'activité :", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de l'activité" },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
};
