import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Activity from "@/models/Activities";

export const GET = async (_, { params }) => {
  try {
    await connect();
    const activity = await Activity.findById(params.id);

    if (!activity) {
      return new NextResponse("Activité non trouvée", { status: 404 });
    }

    return new NextResponse(JSON.stringify(activity), { status: 200 });
  } catch (error) {
    if (error.name === 'CastError') {
      return new NextResponse("ID invalide", { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connect();
    const body = await request.json();

    const updatedActivity = await Activity.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return new NextResponse("Activité non trouvée", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedActivity), { status: 200 });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await connect();
    const deletedActivity = await Activity.findByIdAndDelete(params.id);

    if (!deletedActivity) {
      return new NextResponse("Activité non trouvée", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Activité supprimée" }), { 
      status: 200 
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return new NextResponse("ID invalide", { status: 400 });
    }
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};
