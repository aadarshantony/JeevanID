const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    photo: { type: String },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    allergies: { type: String },
    medicalConditions: { type: String },
    emergencyContact: { type: String, required: true },
    personContact: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
