import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  location: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adherent'
  }],
  status: {
    type: String,
    enum: ['planifié', 'en_cours', 'terminé', 'annulé'],
    default: 'planifié'
  }
}, { timestamps: true });

// Middleware pour ID auto-incrémenté
activitySchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastActivity = await this.constructor.findOne().sort({ id: -1 });
    this.id = lastActivity ? lastActivity.id + 1 : 1;
  }
  next();
});

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);
