import mongoose from "mongoose";
//connexion à mongoose
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connecté à MongoDB");
    } catch (error) {
        throw new Error("Connexion échouée!");//connexion échouée
    }
};
export default connect;
