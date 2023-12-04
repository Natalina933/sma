import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


const SALT_ROUNDS = 10;

export const GET = async (request) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    try {
        await connect();
        const users = await User.find(username ? { name: username } : {});
        return new NextResponse(JSON.stringify(users), { status: 200 }); // Correction de la variable `posts`
    } catch (error) {
        return new NextResponse("Erreur de base de données", { status: 500 }); // Correction du message d'erreur
    }
};

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();

        console.log("Tentative de création d'utilisateur...");

        await connect(); // Connexion à la base de données

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Cet utilisateur existe déjà dans la base de données");
            return new NextResponse("Cet utilisateur existe déjà", {
                status: 400, // Utilisateur déjà existant
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log("Utilisateur créé avec succès");

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