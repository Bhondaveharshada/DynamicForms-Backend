const Relation = require('./model');

// Store Relations
exports.storeRelations = async (req, res) => {
  try {
    const { relations } = req.body; // Expecting an array of relations

    const savedRelations = [];
    const errors = [];

    for (const relation of relations) {
      const { formId, timepoints } = relation;

      // Check if a relation with this formId already exists
      const existingRelation = await Relation.findOne({ formId });

      if (existingRelation) {
        // If the formId exists, update the timepoints
        existingRelation.timepoints = timepoints; 
        await existingRelation.save();
        savedRelations.push(existingRelation);
      } else {
        // If the formId does not exist, create a new relation
        try {
          const newRelation = new Relation({ formId, timepoints });
          await newRelation.save();
          savedRelations.push(newRelation);
        } catch (error) {
          errors.push({ formId, error: error.message });
        }
      }
    }

    return res.status(201).json({
      message: 'Relations processed successfully!',
      data: savedRelations,
      errors,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing relations', error });
  }
};


// Update Relation by Form ID
exports.updateRelation = async (req, res) => {
  try {
    const { formId } = req.params;
    const { timepoints } = req.body;

    const updatedRelation = await Relation.findOneAndUpdate(
      { formId },
      { timepoints },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Relation updated successfully!', data: updatedRelation });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating relation', error });
  }
};

// Delete Relation by Form ID
exports.deleteRelation = async (req, res) => {
  try {
    const { formId } = req.params;

    const deletedRelation = await Relation.findOneAndDelete({ formId });

    if (!deletedRelation) {
      return res.status(404).json({ message: 'Relation not found' });
    }

    return res.status(200).json({ message: 'Relation deleted successfully!', data: deletedRelation });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting relation', error });
  }
};

// Fetch all relations
exports.getAllRelations = async (req, res) => {
  try {
    const relations = await Relation.find();
    return res.status(200).json({ message: 'Relations fetched successfully!', data: relations });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching relations', error });
  }
};

// Fetch relations by form ID
exports.getRelationByFormId = async (req, res) => {
  try {
    const { formId } = req.params;
    const relation = await Relation.findOne({ formId });

    if (!relation) {
      return res.status(404).json({ message: 'Relation not found' });
    }

    return res.status(200).json({ message: 'Relation fetched successfully!', data: relation });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching relation', error });
  }
};
