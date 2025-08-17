const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AccidentReport = require('../models/Report')

router.post('/', async (req, res) => {
    try {
        const { phone, location, info, photo, victimPhone } = req.body;

        let victimData = null;
        if (victimPhone) {
            victimData = await User.findOne({ personContact: victimPhone }).select('-_id -__v');
            if (!victimData) {
                return res.status(404).json({ message: "Victim's JeevanID not found." });
            }
        }

        let latitude = null, longitude = null;
        if (location) {
            const [lat, lng] = location.split(',').map(Number);
            latitude = lat;
            longitude = lng;
        }

        const newReport = new AccidentReport({
            reporterPhone: phone,
            location: { latitude, longitude },
            description: info,
            photo,
            victim: victimData ? { ...victimData.toObject() } : undefined
        });

        await newReport.save();
        res.status(201).json({ message: 'Accident report submitted successfully.', report: newReport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit accident report.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const reports = await AccidentReport.find(filter).sort({ createdAt: -1 });
        res.json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const report = await AccidentReport.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found.' });
        res.json({ report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch report.' });
    }
});


router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!["open", "in_progress", "resolved"].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const report = await AccidentReport.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!report) return res.status(404).json({ message: 'Report not found.' });
        res.json({ message: 'Status updated successfully.', report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update status.' });
    }
});

module.exports = router;