// création schéma mongodb mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;
//schema utilisateur
const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: [true,"Must be unique."],
            required: [true,"Must provide a name"],
        },
        email: {
            type: String,
            unique: [true,"Must be unique."],
            required: [true,"Must provide an mail"],
        },
        password: {
            type: String,
            required: [true,"Must provide an pass"],
        },
    },
    { timestamps: true } //horodatage Mongoose ajoutera deux propriétés de type Date createdAt: une date représentant la date à laquelle ce document a été créé updatedAt: une date représentant la dernière mise à jour de ce document
);
//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema);