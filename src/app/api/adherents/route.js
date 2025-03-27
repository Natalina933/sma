import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";



export const GET = async () => {
  try {
    console.log("Tentative de connexion à la base de données...");
    await connect();
    console.log("Connexion à la base de données établie.");

    const adherents = await Adherent.find();
    console.log("Liste des adhérents récupérée avec succès:", adherents);

    return new NextResponse(JSON.stringify(adherents), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return new NextResponse("Erreur lors de la récupération des données", { status: 500 });
  }
};

export const POST = async (request) => {
//   const adherentData = await request.json();

//   // Validation des données d'entrée
//   if (!adherentData.name || !adherentData.surname || !adherentData.mail) {
//     console.log("POST Adhérent - Données de formulaire invalides", adherentData);
//     return new NextResponse(
//       JSON.stringify({
//         error: "Nom, prénom et email requis.",
//         code: 400,
//       }),
//       { status: 400 }
//     );
//   }

  try {
    console.log("POST Adhérent - Tentative de connexion à la base de données adhérent...");
    await connect();
    console.log("POST Adhérent - Connexion à la base de données établie.");

    const newAdherent = new Adherent(adherentData);
    await newAdherent.save();
    console.log("POST Adhérent - Nouvel adhérent enregistré:", newAdherent);

    return new NextResponse(JSON.stringify(newAdherent), { status: 201 });
  } catch (error) {
    console.error("POST Adhérent - Erreur lors de l'enregistrement de l'adhérent:", error);
    return new NextResponse("Erreur lors de l'enregistrement de l'adhérent", { status: 500 });
  }
};
