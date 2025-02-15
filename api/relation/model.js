const mongoose = require('mongoose');

const RelationSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      required: true,
    },
    timepoints: {
      type: [String], // Array of timepoint IDs
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Relation', RelationSchema);
