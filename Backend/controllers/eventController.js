const Event = require('../models/eventModel');

// Create Event
const createEvent = async (req, res) => {
    const { title, description, date, location } = req.body; // Fixed typo from 'itle' to 'title'

    const event = await Event.create({
        title,
        description,
        date,
        location,
        createdBy: req.user.id,
    });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(400).json({ message: "Invalid event data" });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    const events = await Event.find(); // Fixed incorrect variable name
    res.json(events);
};

// Get single event
const getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

// Update event
const updateEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" }); // Added return
        }
        Object.assign(event, req.body); // Fixed incorrect Object.assign syntax
        await event.save();
        res.json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

// Delete event
const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" }); // Added return
        }
        await event.deleteOne();
        res.json({ message: "Event deleted" });
    } else {
        res.status(404).json({ message: "Event not found" }); // Changed status code to 404
    }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
