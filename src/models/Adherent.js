import mongoose from "mongoose";

const { Schema } = mongoose;

// Définition du schéma pour la collection Adherent
const adherentSchema = new Schema({
  id: {
    type: Number,
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

// Vérifiez si le modèle existe déjà avant de le définir
const Adherent = mongoose.models.Adherent || mongoose.model('Adherent', adherentSchema);

export default Adherent;
