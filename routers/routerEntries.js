const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validarInputs');

const {
    getEntries,
    getEntriesBySearch,
    getEntriesByEmail,
    getEntryByID,
    createEntry,
    updateEntry,
    deleteEntry } = require('../controllers/controllerApiEntries');


router.get('/', getEntries);


router.get('/search/:text', getEntriesBySearch);


router.get('/email/:email', getEntriesByEmail);


router.get('/id/:id', getEntryByID);


router.post('/', [
    check('title', 'El título es obligatorio').trim().not().isEmpty(),
    check('content', 'La descripción es obligatoria').trim().not().isEmpty(),
    check('extract', 'El extracto es obligatorio').trim().not().isEmpty(),
    check('image', 'La imagen es obligatoria').trim().not().isEmpty(),
    validateInputs
], createEntry);


router.put('/', [
    check('title', 'El título es obligatorio').trim().not().isEmpty(),
    check('content', 'La descripción es obligatoria').trim().not().isEmpty(),
    check('extract', 'El extracto es obligatorio').trim().not().isEmpty(),
    check('image', 'La imagen es obligatoria').trim().not().isEmpty(),
], updateEntry);


router.delete('/:entryID', deleteEntry);


module.exports = router