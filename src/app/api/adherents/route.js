import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent"; 
import mongoose from "mongoose";

export const GET = async (request) => {
  const url = new URL(request.url);
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");

    const name = url.searchParams.get("name");
    console.log("Requête de recherche par nom :", name);

    const adherents = await Adherent.find(name && { name });
    console.log("Données récupérées avec succès:", adherents);

    const responseBody = JSON.stringify(adherents);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", {
      status: 500,
    });
  }
};


export const POST = async (request) => {
  try {
    const body = await request.json();
    await connect();
    const newAdherent = new Adherent(body);
    await newAdherent.save();
    const responseBody = JSON.stringify(newAdherent);
    return new NextResponse(responseBody, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", {
      status: 500,
    });
  }
};
