// Import des modules
import mongoose from "mongoose";

// Définition du schéma pour la collection Adherent
const adherentSchema = new mongoose.Schema({
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
    required: true,

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

// Création du modèle Adherent à partir du schéma
const Adherent = mongoose.model("Adherent", adherentSchema);


// Exporation du modèle Adherent
export default Adherent;
