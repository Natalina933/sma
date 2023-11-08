import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Post from "../../../models/Post";
import mongoose from "mongoose";


export const GET = async (request) => {
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");
    console.log(mongoose.models);
    const posts = await Post.find();
    console.log("Données récupérées avec succès:", posts);

    const responseBody = JSON.stringify(posts);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);

    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};

