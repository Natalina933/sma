import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    console.log("GET Adherent - Tentative de connexion à la base de données...");
    await connect();
    console.log("GET Adherent - Connexion à la base de données établie.");

    const adherent = await Adherent.findById(id);

    if (!adherent) {
      console.log("GET Adherent - Adhérent non trouvé");
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    console.log("GET Adherent - Données récupérées avec succès:", adherent);
    const responseBody = JSON.stringify(adherent);
    console.log("GET Adherent - Réponse créée avec succès");
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("GET Adherent - Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
};

export const POST = async (request) => {
  try {
    console.log("POST Adherent - Tentative de connexion à la base de données...");
    await connect();
    console.log("POST Adherent - Connexion à la base de données établie.");

    const body = await request.json();
    const newAdherent = new Adherent(body);
    await newAdherent.save();

    console.log("POST Adherent - Adhérent enregistré avec succès:", newAdherent);
    const responseBody = JSON.stringify(newAdherent);
    console.log("POST Adherent - Réponse créée avec succès");
    return new NextResponse(responseBody, { status: 201 });
  } catch (error) {
    console.error("POST Adherent - Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
};
