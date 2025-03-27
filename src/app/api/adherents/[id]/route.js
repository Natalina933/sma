import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Adherent from "@/models/Adherent";

export const GET = async (_request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const adherent = await Adherent.findById(id);

    if (!adherent) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify(adherent), { status: 200 });
  } catch (error) {
    if (error.name === 'CastError') {
      return new NextResponse("Format d'ID invalide", { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const data = await request.json();

    const updatedAdherent = await Adherent.findByIdAndUpdate(
      id,
      data,
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedAdherent) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedAdherent), { status: 200 });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return new NextResponse(error.message, { status: 400 });
    }
    if (error.name === 'CastError') {
      return new NextResponse("Format d'ID invalide", { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

export const DELETE = async (_request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const deletedAdherent = await Adherent.findByIdAndDelete(id);

    if (!deletedAdherent) {
      return new NextResponse("Adhérent non trouvé", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Supprimé avec succès" }), { 
      status: 200 
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return new NextResponse("Format d'ID invalide", { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};