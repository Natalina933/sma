import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent"; 
import mongoose from "mongoose";


export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");

    const adherent = await Adherent.findById(id);
    console.log("Donnée récupérée avec succès:", adherent);

    if (!adherent) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    const responseBody = JSON.stringify(adherent);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", {
      status: 500,
    });
  } finally {
    await mongoose.disconnect();
  }
};

export const POST = async (request) => {
  try {
    await connect();
    const body = await request.json();
    const newAdherent = new Adherent(body);
    await newAdherent.save();
    const responseBody = JSON.stringify(newAdherent);
    return new NextResponse(responseBody, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", {
      status: 500,
    });
  } finally {
    await mongoose.disconnect();
  }
};