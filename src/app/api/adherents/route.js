import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent"; 
import mongoose from "mongoose";

/**
 * Perform a GET request to retrieve data from the database.
 *
 * @param {Object} request - the request object
 * @return {NextResponse} the response object
 */
export const GET = async (request) => {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");

  try {
    console.log("Tentative de connexion à la base de données adhérents...");
    await connect();
    console.log("Connexion à la base de données adhérents établie.");
    console.log(Object.keys(mongoose.models));

    const adherents = await Adherent.find(name && { name }); // Recherche d'adhérents
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
  const body = await request.json();

  const newAdherent = new Adherent(body); // Création d'un nouvel adhérent

  try {
    console.log("Tentative de connexion à la base de données adhérents...");
    await connect();
    console.log("Connexion à la base de données adhérents établie.");
    console.log(Object.keys(mongoose.models));

    await newAdherent.save(); // Enregistrement d'un nouvel adhérent
    console.log("Nouvel adhérent enregistré:", newAdherent);

    const responseBody = JSON.stringify(newAdherent);
    return new NextResponse(responseBody, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", {
      status: 500,
    });
  }
};