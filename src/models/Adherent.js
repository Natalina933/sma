// Fichier: models/Adherent.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma pour la collection Adherent
const adherentSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String
  },
  complement: {
    type: String
  },
  CP: {
    type: Number
  },
  city: { type: String }
}, {
  timestamps: true // Ajoute les propriétés createdAt et updatedAt
});

const AdherentModel = mongoose.model("Adherent", adherentSchema);
console.log("Le modèle de publication (AdherentModel) est le suivant : ", AdherentModel);

// Exportation du modèle Adherent
export default AdherentModel;
