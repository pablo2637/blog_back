const { pool } = require('../configs/configPostgreSQL');
const bcrypt = require('bcryptjs');

const {
    queriesUser,
    queriesLogs,
    queriesRol } = require('./queries');


const modelGetUsers = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesUser.getUsers)

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelGetUserByEmail = async (email) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserByEmail, [email])

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelCreateUser = async ({ name, email, password }) => {

    let client, result;
    try {

        const hora = new Date();

        client = await pool.connect();

        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const data = await client.query(queriesUser.createUser, [name, email, password]);

        await client.query(queriesRol.insertRol, [data.rows[0].userid, 'user']);

        await client.query(queriesLogs.insertLog, [email, 'register', hora.toLocaleTimeString()]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelLoginUser = async ({ email, password }) => {

    let client, result, isPassOK;
    try {

        const hora = new Date();

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserPassByEmail, [email]);

        data.rowCount != 0 ? result = data.rows[0] : result = false;

        if (result) {
            isPassOK = bcrypt.compareSync(password, result.password);

            await client.query(queriesLogs.insertLog, [email, `login attempt: ${isPassOK}`, hora.toLocaleTimeString()]);

        }

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return { result, isPassOK };
};


const modelChangePassword = async ({ email, oldPassword, newPassword }) => {

    let client, result, isPassOK;
    try {

        const hora = new Date();

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserPassByEmail, [email]);

        data.rowCount != 0 ? result = data.rows[0] : result = false;

        if (result) {

            isPassOK = bcrypt.compareSync(oldPassword, result.password);

            if (isPassOK) {
                const salt = bcrypt.genSaltSync(10);
                newPassword = bcrypt.hashSync(newPassword, salt);

                const dataPass = await client.query(queriesUser.changePassByEmail, [newPassword, email]);
            }

            await client.query(queriesLogs.insertLog, [email, `change password: ${isPassOK}`, hora.toLocaleTimeString()]);

        }

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return { result, isPassOK };
};


const modelLogoutUser = async ({ email }) => {

    let client;
    try {

        const hora = new Date();

        client = await pool.connect();

        await client.query(queriesLogs.insertLog, [email, 'logout', hora.toLocaleTimeString()]);

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };
};


module.exports = {
    modelGetUsers,
    modelGetUserByEmail,
    modelCreateUser,
    modelLoginUser,
    modelChangePassword,
    modelLogoutUser
}