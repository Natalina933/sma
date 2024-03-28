import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";

export const GET = async (_request, { params }) => {
  const { id } = params;

  try {
    console.log("GET Adherent - Tentative de connexion à la base de données...");
    await connect();
    console.log("GET Adherent - Connexion à la base de données établie.");

    const adherent = await Adherent.findOne({ _id: id });
    console.log("GET Adherent - Données récupérées avec succès:", adherent);

    if (!adherent) {
      console.log("GET Adherent - Adhérent non trouvé");
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    const responseBody = JSON.stringify(adherent);
    console.log("GET Adherent - Réponse créée avec succès");

    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("GET Adherent - Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", {
      status: 500,
    });
  }
};

export const PUT = async (_request, { params, body }) => {
  const { id } = params;
  const data = JSON.parse(body);

  try {
    console.log("PUT Adherent - Tentative de connexion à la base de données...");
    await connect();
    console.log("PUT Adherent - Connexion à la base de données établie.");

    console.log("PUT Adherent - Recherche de l'adhérent à mettre à jour...");
    const adherent = await Adherent.findByIdAndUpdate(id, data, { new: true });
    console.log("PUT Adherent - Données mises à jour avec succès:", adherent);

    if (!adherent) {
      console.log("PUT Adherent - Adhérent non trouvé");
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    const responseBody = JSON.stringify(adherent);
    console.log("PUT Adherent - Réponse créée avec succès");

    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("PUT Adherent - Erreur lors de la mise à jour des données:", error);
    return new NextResponse("Erreur lors de la mise à jour des données", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  console.log("DELETE Adherent - Suppression d'un adhérent");
  console.log("DELETE Adherent - ID de l'adhérent à supprimer:", id);

  try {
    console.log("DELETE Adherent - Tentative de connexion à la base de données...");
    await connect();
    console.log("DELETE Adherent - Connexion à la base de données établie.");

    await Adherent.findByIdAndDelete(id);

    const responseBody = JSON.stringify("Adhérent supprimé avec succès");
    console.log("DELETE Adherent - Suppression réussie");

    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("DELETE Adherent - Erreur lors de la suppression des données:", error);
    return new NextResponse("Erreur lors de la suppression des données", {
      status: 500,
    });
  }
};
