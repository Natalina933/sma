import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";

export const GET = async (_request, { params }) => {
  const { id } = params;

  try {
    logWithDetails(`GET Adhérent - Tentative de connexion à la base de données pour l'adhérent ID: ${id}`);
    await connect();
    logWithDetails("GET Adhérent - Connexion à la base de données établie.");

    const adherent = await Adherent.findById(id);
    logWithDetails(`GET Adhérent - Données récupérées pour l'adhérent ID: ${id}`, adherent);

    if (!adherent) {
      logWithDetails(`GET Adhérent - Adhérent non trouvé pour ID: ${id}`);
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify(adherent), { status: 200 });
  } catch (error) {
    logWithDetails(`GET Adhérent - Erreur lors de la récupération des données pour l'adhérent ID: ${id}`, error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const data = await request.json();

  try {
    logWithDetails(`PUT Adhérent - Tentative de mise à jour pour l'adhérent ID: ${id} avec les données:`, data);
    await connect();
    logWithDetails("PUT Adhérent - Connexion à la base de données établie.");

    const updatedAdherent = await Adherent.findByIdAndUpdate(id, data, { new: true });
    logWithDetails(`PUT Adhérent - Adhérent mis à jour pour ID: ${id}`, updatedAdherent);

    if (!updatedAdherent) {
      console.log(`PUT Adherent - Adhérent non trouvé pour ID: ${id}`);
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedAdherent), { status: 200 });
  } catch (error) {
    console.error(`PUT Adherent - Erreur lors de la mise à jour des données pour l'adhérent ID: ${id}`, error);
    return new NextResponse("Erreur lors de la mise à jour des données", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  console.log(`DELETE Adherent - Tentative de suppression pour l'adhérent ID: ${id}`);

  try {
    await connect();
    console.log("DELETE Adherent - Connexion à la base de données établie.");

    await Adherent.findByIdAndDelete(id);
    console.log(`DELETE Adherent - Adhérent supprimé pour ID: ${id}`);

    return new NextResponse("Adhérent supprimé avec succès", { status: 200 });
  } catch (error) {
    console.error(`DELETE Adherent - Erreur lors de la suppression des données pour l'adhérent ID: ${id}`, error);
    return new NextResponse("Erreur lors de la suppression des données", { status: 500 });
  }
};
