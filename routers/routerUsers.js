const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validarInputs');

const {
    getUsers,
    getUserByEmail,
    createUser,
    loginUser,
    changePassword,
    logoutUser } = require('../controllers/controllerApiUsers')


router.get('/', getUsers);


router.get('/:email', getUserByEmail);


router.post('/', [
    check('name', 'El nombre es obligatorio.').trim().not().isEmpty(),    
    check('password', 'La contraseña es obligatoria y debe tener entre 5 y 10 caracteres.').trim().isLength({ min: 5, max: 10 }).not().isEmpty(),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    validateInputs
], createUser);


router.post('/login',[    
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    validateInputs
], loginUser);


router.post('/logout', logoutUser);


router.put('/changePassword',[    
    check('password', 'La contraseña es obligatoria y debe tener entre 5 y 10 caracteres.').trim().isLength({ min: 5, max: 10 }).not().isEmpty(),    
    validateInputs
], changePassword);


module.exports = router