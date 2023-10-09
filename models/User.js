// création schéma mongodb mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    },
  { timestamps: true } //horodatage Mongoose ajoutera deux propriétés de type Date createdAt: une date représentant la date à laquelle ce document a été créé updatedAt: une date représentant la dernière mise à jour de ce document
);
export default mongoose.model("User", userSchema);
