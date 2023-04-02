const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserByEmail,
    createUser,
    loginUser,
    changePassword,
    logoutUser } = require('../controllers/controllerApiUsers')


router.get('/', getUsers);


router.get('/:email', getUserByEmail);


router.post('/', createUser);


router.post('/login', loginUser);


router.post('/logout', logoutUser);


router.post('/changePassword', changePassword);


module.exports = router