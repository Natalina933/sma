
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent"; 
import mongoose from "mongoose";

export const GET = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");
    console.log(Object.keys(mongoose.models));

    const adherents = await Adherent.findById(id);
    console.log("adhérent récupéré avec succès:", adherents);

    const responseBody = JSON.stringify(adherents);
    return new NextResponse(responseBody, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newAdherent = new Adherent(body);
  try {
    console.log("Tentative de connexion à la base de données adhérent...");
    await connect();
    console.log("Connexion à la base de données établie.");
    console.log(Object.keys(mongoose.models));

    await newAdherent.save();
    console.log("Nouvel adhérent enregistré:", newAdherent);

    const responseBody = JSON.stringify(newAdherent);
    return new NextResponse(responseBody, { status: 201 });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", { status: 500 });
  }
};
