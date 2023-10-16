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
    {
        timestamps: true, // Mongoose ajoutera deux propriétés de type Date : createdAt et updatedAt
      }
);

// Si la collection Post n'existe pas, créez-en une nouvelle.
const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);

console.log("Le modèle de publication (PostModel) est le suivant : ", PostModel);

export default PostModel;