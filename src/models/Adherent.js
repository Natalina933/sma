import mongoose from "mongoose";
// Middleware to generate an incremental ID

const adherentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  complement: { type: String },
  cp: { type: String },
  city: { type: String },
}, { timestamps: true });

adherentSchema.index({ mail: 1 }, { unique: true });
adherentSchema.index({ id: 1 });

const Adherent = mongoose.models.Adherent || mongoose.model('Adherent', adherentSchema);

export default Adherent;