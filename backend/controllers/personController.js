const Person = require('../models/person');

// Create a new person
exports.createPerson = async (req, res) => {
    try {
        const person = new Person(req.body);
        await person.save();
        res.status(201).json({ message: 'Person created successfully.', person });
    } catch (err) {
        res.status(500).json({ error: 'Error creating person.', message: err.message });
    }
};

// Get all persons
exports.getAllPersons = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10; // Default limit of 10 if not provided
        // Fetch the total count of persons (for pagination metadata)
        const totalCount = await Person.countDocuments();
        // Fetch the paginated persons
        const persons = await Person.find().skip(offset).limit(limit);
        res.json({
            totalCount,
            offset,
            limit,
            persons,
        });
        res.json(persons);
    } catch (err) {
        res.status(500).json({ error: 'Error getting persons.', message: err.message });
    }
};

// Get a specific person by ID
exports.getPersonById = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found.' });
        }
        res.json(person);
    } catch (err) {
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid ID', message: 'The provided ID is not valid.' });
        } else {
            res.status(500).json({ error: 'Error getting persons.', message: err.message });
        }
    }
};

// Update a person by ID
exports.updatePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) {
            return res.status(404).json({ error: 'Person not found.' });
        }
        res.json({ message: 'Person updated successfully.', person });
    } catch (err) {
        res.status(500).json({ error: 'Error updating person.', message: err.message });
    }
};

// Delete a person by ID
exports.deletePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found.' });
        }
        res.json({ message: 'Person deleted successfully.', person });
    } catch (err) {
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid ID', message: 'The provided ID is not valid.' });
        } else {
            res.status(500).json({ error: 'Error getting persons.', message: err.message });
        }
    }
};
