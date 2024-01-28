import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        console.log("Tentative de connexion à la base de données...");
        await connect();
        console.log("Connexion à la base de données établie.");
        const post = await Post.findById(id);
        console.log("Données récupérées avec succès:", post);
        if (!post) {
            return new NextResponse("Publication non trouvée", { status: 404 });
        }
        const responseBody = JSON.stringify(post);
        return new NextResponse(responseBody, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);

        return new NextResponse("Erreur lors de la récupération des données", {
            status: 500,
        });
    }
};
export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        console.log("Tentative de connexion à la base de données...");
        await connect();
        console.log("Connexion à la base de données établie.");
        // console.log(mongoose.models);

        await Post.findByIdAndDelete(id);

        const responseBody = ("Publication supprimée avec succès");
        return new NextResponse(responseBody, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);

        return new NextResponse("Erreur lors de la récupération des données", {
            status: 500,
        });
    }
};
