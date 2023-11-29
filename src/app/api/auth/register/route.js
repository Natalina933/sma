import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();
        // si l'utilisateur existe déjà dans la base de données
        await connect(); // Connection à la base de données

        //  si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new NextResponse("Cet utilisateur existe déjà", {
                status: 400, // Utilisateur déjà existant
            });
        }

        // Hash du mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10); // Utilise une valeur de salage plus élevée

        // Création d'un nouvel utilisateur avec le mot de passe haché
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Enregistre le nouvel utilisateur dans la base de données
        await newUser.save();

        return new NextResponse("Utilisateur créé", {
            status: 201, // Utilisateur créé avec succès
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500, // Erreur serveur
        });
    }
};
