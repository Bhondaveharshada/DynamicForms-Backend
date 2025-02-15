const { Timepoint } = require('./model');

// Helper function to map `_id` to `id` for responses
const mapId = (doc) => {
  return { id: doc.id, ...doc._doc }; // `doc.id` is the custom sequential ID
};

// Create a new interval
exports.createInterval = async (req, res) => {
  try {
    const { name, interval } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: 'Name and interval are required.' });
    }

    const newInterval = await Timepoint.create({ name, interval });
    res.status(201).json(mapId(newInterval));
  } catch (error) {
    res.status(500).json({ message: 'Error creating interval', error });
  }
};

// Get all intervals
exports.getAllIntervals = async (req, res) => {
  try {
    const intervals = await Timepoint.find();
    const mappedIntervals = intervals.map(mapId); // Map custom id
    res.status(200).json(mappedIntervals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching intervals', error });
  }
};

// Get a single interval by ID
exports.getIntervalById = async (req, res) => {
  try {
    const { id } = req.params;
    const interval = await Timepoint.findOne({ id });

    if (!interval) {
      return res.status(404).json({ message: 'Interval not found' });
    }

    res.status(200).json(mapId(interval));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interval', error });
  }
};

// Update an interval
exports.updateInterval = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, interval } = req.body;

    const updatedInterval = await Timepoint.findOneAndUpdate(
      { id },
      { name, interval },
      { new: true, runValidators: true }
    );

    if (!updatedInterval) {
      return res.status(404).json({ message: 'Interval not found' });
    }

    res.status(200).json(mapId(updatedInterval));
  } catch (error) {
    res.status(500).json({ message: 'Error updating interval', error });
  }
};

// Delete an interval
exports.deleteInterval = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInterval = await Timepoint.findOneAndDelete({ id });

    if (!deletedInterval) {
      return res.status(404).json({ message: 'Interval not found' });
    }

    res.status(200).json({ message: 'Interval deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting interval', error });
  }
};

