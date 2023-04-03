const {
    modelGetUsers,
    modelGetUserByEmail,
    modelCreateUser,
    modelLoginUser,
    modelChangePassword,
    modelLogoutUser } = require('../models/modelUsers')


const getUsers = async (req, res) => {

    try {

        const data = await modelGetUsers();

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: 'No hay usuarios en la base de datos.'
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en getUsers.',
            error: e
        });

    };
};


const getUserByEmail = async ({ params }, res) => {

    try {

        const data = await modelGetUserByEmail(params.email);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: `No se encontró ningún usuario con el email: ${params.email}`
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en getUserByEmail.',
            error: e.stack
        });

    };
};


const createUser = async ({ body }, res) => {

    try {

        const data = await modelCreateUser(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });        

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en createUser.',
            error: e.stack
        });

    };
}


const loginUser = async ({ body }, res) => {

    try {

        const { result, isPassOK } = await modelLoginUser(body);

        if (result) {
            if (!isPassOK) return res.status(401).json({
                ok: false,
                msg: 'loginUser: el usuario/contraseña no corresponden a los datos almacenados.'
            })

            return res.status(200).json({
                ok: true,
                msg: 'loginUser OK.'
            });
        } else return res.status(401).json({
            ok: false,
            msg: 'loginUser: el usuario/contraseña no corresponden a los datos almacenados.'
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en loginUser.',
            error: e.stack
        });

    };
}


const changePassword = async ({ body }, res) => {

    try {

        const { result, isPassOK } = await modelChangePassword(body);

        if (result) {
            if (!isPassOK) return res.status(401).json({
                ok: false,
                msg: 'changePassword: la contraseña proporcionada no se corresponde con la almacenada.'
            })

            return res.status(200).json({
                ok: true,
                msg: 'changePassword OK.'
            });
        } else return res.status(401).json({
            ok: false,
            msg: `changePassword: el email: ${body.email}, no existe en la bd.`
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en changePassword.',
            error: e.stack
        });

    };
}


const logoutUser = async ({ body }, res) => {

    try {

        await modelLogoutUser(body);

        return res.status(200).json({
            ok: true,
            msg: 'logoutUser OK.'
        });

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en logoutUser.',
            error: e.stack
        });

    };
}


module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    loginUser,
    changePassword,
    logoutUser
}