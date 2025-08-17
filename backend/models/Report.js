const mongoose = require('mongoose');

const accidentReportSchema = new mongoose.Schema({
    reporterPhone: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    description: { type: String },
    photo: { type: String },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },

    victim: {
        name: { type: String },
        age: { type: Number },
        bloodGroup: { type: String },
        allergies: { type: String },
        medicalConditions: { type: String },
        emergencyContact: { type: String },
        personContact: { type: String },
        photo: { type: String },
    }
}, { timestamps: true });

module.exports = mongoose.model('AccidentReport', accidentReportSchema);
