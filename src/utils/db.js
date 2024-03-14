import mongoose from "mongoose";

// Connexion à MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connecté à MongoDB");
    } catch (error) {
        // En cas d'erreur lors de la connexion à MongoDB, lancez une exception avec un message d'erreur
        throw new Error("Connexion à MongoDB échouée : " + error.message);
    }
};

export default connect;