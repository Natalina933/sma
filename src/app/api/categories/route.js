import pool from "@/utils/db";

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.execute(`
      SELECT DISTINCT c.id, c.title, c.img, c.alt
      FROM act_categories c
      JOIN act_activities a ON a.category_id = c.id
      WHERE a.category_id IS NOT NULL
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
