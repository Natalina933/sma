import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");

    const adherent = await Adherent.findOne({ _id: id });

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
  }
};

export const PUT = async (request, { params, body }) => {
  const { id } = params;
  const data = JSON.parse(body);

  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");

    const adherent = await Adherent.findByIdAndUpdate(id, data, { new: true });

    if (!adherent) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    const responseBody = JSON.stringify(adherent);
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données:", error);
    return new NextResponse("Erreur lors de la mise à jour des données", {
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

    await Adherent.findByIdAndDelete(id);

    const responseBody = JSON.stringify("Adhérent supprimé avec succès");
    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression des données:", error);
    return new NextResponse("Erreur lors de la suppression des données", {
      status: 500,
    });
  }
};