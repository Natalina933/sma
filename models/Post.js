// création schéma mongodb mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;
//schema de publication
const postSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    },
  { timestamps: true } //horodatage Mongoose ajoutera deux propriétés de type Date createdAt: une date représentant la date à laquelle ce document a été créé updatedAt: une date représentant la dernière mise à jour de ce document
);
export default mongoose.model("Post", postSchema);
