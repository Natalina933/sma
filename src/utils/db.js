import mongoose from "mongoose";
//connexion à mongoose
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw new Error("Connection failed!");//connexion échouée
    }
};
export default connect;
