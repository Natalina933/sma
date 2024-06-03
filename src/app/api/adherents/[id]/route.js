import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";
export const GET = async (_request, { params }) => {
  const { id } = params;

  try {
    console.log(`GET Adhérent - Tentative de connexion à la base de données...`);
    await connect();
    console.log("GET Adhérent - Connexion à la base de données établie.");

    if (id) {
      // Gérer la récupération d'un seul adhérent par ID
      const adherent = await Adherent.findById(id);
      console.log(`GET Adhérent - Données récupérées pour l'adhérent ID: ${id}`, adherent);

      if (!adherent) {
        console.log(`GET Adhérent - Adhérent non trouvé pour ID: ${id}`);
        return new NextResponse("Adhérent non trouvé", { status: 404 });
      }

      return new NextResponse(JSON.stringify(adherent), { status: 200 });
    } else {
      // Gérer la récupération de tous les adhérents
      const adherents = await Adherent.find();
      console.log(`GET Adhérent - Tous les adhérents récupérés:`, adherents);
      return new NextResponse(JSON.stringify(adherents), { status: 200 });
    }
  } catch (error) {
    console.error(`GET Adhérent - Erreur lors de la récupération des données:`, error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  const { id } = params;
  const data = await request.json();

  try {
    console.log(`PUT Adhérent - Tentative de mise à jour pour l'adhérent ID: ${id} avec les données:`, data);
    await connect();
    console.log("PUT Adhérent - Connexion à la base de données établie.");

    const updatedAdherent = await Adherent.findByIdAndUpdate(id, data, { new: true });
    console.log(`PUT Adhérent - Adhérent mis à jour pour ID: ${id}`, updatedAdherent);

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

export const DELETE = async (_request, { params }) => {
  const { id } = params;

  try {
    console.log(`DELETE Adherent - Tentative de suppression pour l'adhérent ID: ${id}`);
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
