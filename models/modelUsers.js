const { pool } = require('../configs/configPostgreSQL');
const bcrypt = require('bcryptjs');

const {
    queriesUser,
    queriesLog,
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

        client = await pool.connect();

        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const data = await client.query(queriesUser.createUser, [name, email, password]);

        await client.query(queriesRol.insertRol, [data.rows[0].userid, 'user']);

        await client.query(queriesLog.insertLog, [email, 'register']);

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

        client = await pool.connect();

        const data = await client.query(queriesUser.getUserPassByEmail, [email]);

        data.rowCount != 0 ? result = data.rows[0] : result = false;

        if (result) {
            isPassOK = bcrypt.compareSync(password, result.password);

            await client.query(queriesLog.insertLog, [email, `login attempt: ${isPassOK}`]);

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

            await client.query(queriesLog.insertLog, [email, `change password: ${isPassOK}`]);

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

        client = await pool.connect();

        await client.query(queriesLog.insertLog, [email, 'logout']);

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