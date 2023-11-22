import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import mongoose from "mongoose";



export const GET = async (request) => {
  const url = new URL(request.url)

  const username = url.searchParams.get("username");
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");
    console.log(Object.keys (mongoose.models));

    const posts = await Post.find(username && { username });
    console.log("Données récupérées avec succès:", posts);

    const responseBody = JSON.stringify(posts);
    return new NextResponse(responseBody, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);

    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};


export const POST = async (request) => {
  const body = await request.json()

  const newPost = new Post(body)
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");
    console.log(Object.keys(mongoose.models));

    await newPost.save()
    console.log("Nouvelle publication enregistrée:", newPosts);

    const responseBody = JSON.stringify(newPost);
    return new NextResponse(responseBody, { status: 201 });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la publication:", error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};