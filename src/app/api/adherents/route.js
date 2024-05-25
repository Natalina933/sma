
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent"; 
import mongoose from "mongoose";
// Fonction de journalisation améliorée
function logWithDetails(message, details = {}) {
  console.log(message, details);
}

export const GET = async () => {
  try {
    logWithDetails("Tentative de connexion à la base de données...");
    await connect();
    logWithDetails("Connexion à la base de données établie.");

    const adherents = await Adherent.find();
    logWithDetails("Liste des adhérents récupérée avec succès:", adherents);

    return new NextResponse(JSON.stringify(adherents), { status: 200 });
  } catch (error) {
    logWithDetails("Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};

export const POST = async (request) => {
  const adherentData = await request.json();

  // Validation des données d'entrée
  if (!adherentData.name || !adherentData.surname || !adherentData.email) {
    return new NextResponse(
      JSON.stringify({
        error: "Nom, prénom et email requis.",
        code: 400,
      }),
      { status: 400 }
    );
  }

  try {
    logWithDetails("Tentative de connexion à la base de données adhérent...");
    await connect();
    logWithDetails("Connexion à la base de données établie.");

    const newAdherent = new Adherent(adherentData);
    await newAdherent.save();
    logWithDetails("Nouvel adhérent enregistré:", newAdherent);

    const responseBody = JSON.stringify(newAdherent);
    return new NextResponse(responseBody, { status: 201 });
  } catch (error) {
    logWithDetails("Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", { status: 500 });
  }
};
  