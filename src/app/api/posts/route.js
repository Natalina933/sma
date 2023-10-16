import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (resquest) => {
    try {
        console.log("Tentative de connexion à la base de données...");
        await connect();
        console.log("Connexion à la base de données établie.");

        const posts = await Post.find();
        console.log("Données récupérées avec succès:", posts);

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return new NextResponse("database Error!", { status: 500 });
    }
};

