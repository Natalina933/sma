import mongoose from "mongoose";

const adherentSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    mail: { type: String, unique: true, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    complement: { type: String, trim: true },
    city: { type: String, trim: true },
    cp: { type: String, trim: true },
    dateOfBirth: { type: Date },
    membership_type: {
      type: String,
      enum: ["single", "duo", "family"],
      default: "single",
    },
    status: {
      type: String,
      enum: ["actif", "inactif"],
      default: "active",
    },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// Pre-validate middleware to trim strings before saving
adherentSchema.pre('validate', function(next) {
  for (const field in this.schema.paths) {
    if (this[field] && this.schema.paths[field].instance === 'String') {
      this[field] = this[field].trim();
    }
  }
  next();
});

// Email validation middleware
adherentSchema.path('mail').validate(function(email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'Invalid email address.');

// Phone validation middleware
adherentSchema.path('phone').validate(function(phone) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(phone);
}, 'Invalid phone number.');

// Middleware to generate incremental ID
adherentSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastAdherent = await this.constructor.findOne({}, { id: 1 }, { sort: { id: -1 } });
    this.id = lastAdherent ? lastAdherent.id + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.models.Adherent || mongoose.model("Adherent", adherentSchema);
