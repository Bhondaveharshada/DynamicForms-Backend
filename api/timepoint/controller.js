const { Timepoint } = require('./model');

const mapId = (doc) => {
  return { id: doc.id, ...doc._doc };
};

exports.createInterval = async (req, res) => {
  try {
    const { name, interval } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name and interval are required.' });
    }

    const newInterval = await Timepoint.create({ name, interval });
    res.status(201).json(mapId(newInterval));
  } catch (error) {
    res.status(500).json({ message: 'Error creating interval', error });
  }
};

exports.getAllIntervals = async (req, res) => {
  try {
    const intervals = await Timepoint.find();
    const mappedIntervals = intervals.map(mapId);
    res.status(200).json(mappedIntervals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching intervals', error });
  }
};

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

