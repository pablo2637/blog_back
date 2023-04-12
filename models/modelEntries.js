const { pool } = require('../configs/configPostgreSQL');
const { queriesEntries } = require('../models/queries');


const modelGetEntries = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.getEntries);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelGetEntriesBySearch = async (text) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.getEntriesBySearch, [`%${text.replace(' ', '%')}%`]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelGetEntriesByEmail = async (email) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.getEntriesByEmail, [email]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelGetEntryByID = async (id) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.getEntryByID, [id]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelCreateEntry = async ({ title, content, email, extract, image }) => {

    let client, result;
    try {

        const hora = new Date();

        client = await pool.connect();

        const data = await client.query(queriesEntries.createEntry, [title, content, email, extract, image, , hora.toLocaleTimeString()]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelUpdateEntry = async ({ title, content, extract, image, entryID }) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.updateEntryByID, [title, content, extract, image, entryID]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


const modelDeleteEntry = async (entryID) => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesEntries.deleteEntry, [entryID]);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;
};


module.exports = {
    modelGetEntries,
    modelGetEntriesBySearch,
    modelGetEntriesByEmail,
    modelGetEntryByID,
    modelCreateEntry,
    modelUpdateEntry,
    modelDeleteEntry
}