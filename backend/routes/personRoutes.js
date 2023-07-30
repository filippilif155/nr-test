const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');

const personController = require('../controllers/personController');
const { validateRequest } = require('../middlewares/validationMiddleware');


// Create a new person
router.post(
    '/',
    [
        body('name')
            .isLength({ min: 2, max: 40 }).withMessage('Must hav between 2 and 40 characters.')
            .notEmpty().withMessage('This field is required.'),
        check('surname')
            .isLength({ min: 2, max: 40 }).withMessage('Must hav between 2 and 40 characters.')
            .notEmpty().withMessage('This field is required.'),
        check('city').notEmpty().withMessage('This field is required.'),
        check('address').notEmpty().withMessage('This field is required.'),
        check('phone')
            .matches(/^\+382\d{6,9}$/).withMessage('Invalid phone number.')
            .notEmpty().withMessage('This field is required.'),
    ],
    validateRequest,
    personController.createPerson
);

// Get all persons
router.get('/', personController.getAllPersons);

// Get a specific person by ID
router.get('/:id', personController.getPersonById);

// Update a person by ID
router.put('/:id', personController.updatePerson);

// Delete a person by ID
router.delete('/:id', personController.deletePerson);

module.exports = router;