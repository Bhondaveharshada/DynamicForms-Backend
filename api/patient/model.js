const mongoose = require('mongoose');

// Define Patient schema
const patientSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  birthdate: { type: Date, required: true },
  onboardDate: { type: Date, default: Date.now },
});

const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, required: true },
});

const Counter = mongoose.model('Counter', counterSchema);
patientSchema.pre('save', async function (next) {
  const patient = this;
  if (!patient.id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { key: 'patientId' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true } 
      );
      patient.id = counter.sequenceValue;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient, Counter };
