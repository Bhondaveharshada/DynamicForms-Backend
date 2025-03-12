const mongoose = require('mongoose');

// Check if Counter model already exists
const Counter = mongoose.models.Counter || mongoose.model('Counter', new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, required: true },
}));

const timepointSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Custom Sequential ID
  name: { type: String, required: true },
  interval: { type: Number, required: true, min: 0 },
});

// Pre-save hook to auto-generate sequential IDs
timepointSchema.pre('save', async function (next) {
  const Timepoint = this;
  if (!Timepoint.id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { key: 'intervalId' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      Timepoint.id = counter.sequenceValue; 
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Timepoint = mongoose.models.Timepoint || mongoose.model('Timepoint', timepointSchema);

module.exports = { Timepoint, Counter };
