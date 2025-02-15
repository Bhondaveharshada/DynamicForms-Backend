const mongoose = require('mongoose');

// Define Patient schema
const patientSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Sequential ID
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  birthdate: { type: Date, required: true },
  onboardDate: { type: Date, default: Date.now }, // New field with default value as current date
});

// Define a separate schema for maintaining a sequence counter
const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, required: true },
});

// Counter model
const Counter = mongoose.model('Counter', counterSchema);

// Pre-save hook to auto-generate sequential IDs
patientSchema.pre('save', async function (next) {
  const patient = this;
  if (!patient.id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { key: 'patientId' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true } // Create the counter if it doesn’t exist
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

// Create Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient, Counter };
