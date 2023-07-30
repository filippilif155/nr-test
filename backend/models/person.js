const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    createdDate: { type: Date, default: Date.now },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
    },
});

personSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

personSchema.set('toJSON', {
    virtuals: true,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
