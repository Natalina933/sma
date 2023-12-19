import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request) => {
    try {
        const { civility, name, surname, email, password } = await request.json();
        await connectDB(); // Connexion à la base de données
        // console.log({ civility, name, surname, email, password });
        // Vérifier si l'utilisateur existe déjà

        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return NextResponse.json({ message: "Cet utilisateur existe déjà" }, {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ civility, name, surname, email, password: hashedPassword })

        // Créer un nouvel utilisateur
        // const newUser = new User({ civility, name, surname, email, password: hashedPassword });
        // await newUser.save();

        return NextResponse.json({ message: "Utilisateur créé avec succès" }, {
            status: 201, // Utilisateur créé avec succès
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return NextResponse.json(error.message, {
            status: 500, // Erreur serveur
        });
    }
};
