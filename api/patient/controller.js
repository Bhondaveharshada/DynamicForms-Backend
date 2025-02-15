const { Patient } = require('./model');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    console.log("Creating new patient");
    
    const newPatient = new Patient(req.body); // ID will auto-generate
    const savedPatient = await newPatient.save();
    console.log("Created new patient");
    
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findOneAndDelete({ id: req.params.id });
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
