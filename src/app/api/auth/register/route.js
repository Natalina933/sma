import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();
        await connect(); // Connexion à la base de données

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse("Cet utilisateur existe déjà", {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        // Créer un nouvel utilisateur
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return new NextResponse("Utilisateur créé avec succès", {
            status: 201, // Utilisateur créé avec succès
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return new NextResponse(error.message, {
            status: 500, // Erreur serveur
        });
    }
};
