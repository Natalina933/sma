import mongoose from "mongoose";

const { Schema } = mongoose;

const adherentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    adress: {
      type: String,
    },
    complement: {
      type: String,
    },
    cp: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true, // Mongoose ajoutera deux propriétés de type Date : createdAt et updatedAt
  }
);

// Si la collection Adherent n'existe pas, créez-en une nouvelle.
const AdherentModel = mongoose.models.Adherent || mongoose.model("Adherent", adherentSchema);
console.log("Le modèle Adherent (AdherentModel) est le suivant : ", AdherentModel);

export default AdherentModel;