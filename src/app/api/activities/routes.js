import { NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM act_activities ORDER BY created_at DESC");
        return new NextResponse(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Erreur MySQL:", error);
        return new NextResponse("Erreur de base de données", { status: 500 });
    }
};

export const POST = async (request) => {
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

        const [result] = await db.query(
            `INSERT INTO act_activities 
        (title, description, date, place, price, organizer_id, organizer, capacity, img, alt, category, rating, programme, inscription, keywords) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, date, place, price, organizer_id, organizer, capacity, img, alt, category, rating, programme, inscription, keywords]
        );

        return new NextResponse(JSON.stringify({ id: result.insertId, ...body }), { status: 201 });
    } catch (error) {
        console.error("Erreur MySQL:", error);
        return new NextResponse("Erreur de création", { status: 400 });
    }
};
