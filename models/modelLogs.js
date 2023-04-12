const { pool } = require('../configs/configPostgreSQL');
const { queriesLogs } = require('../models/queries');


const modelGetLogs = async () => {

    let client, result;
    try {

        client = await pool.connect();

        const data = await client.query(queriesLogs.getLogs);

        data.rowCount != 0 ? result = data.rows : result = false;

    } catch (e) {
        throw e;

    } finally {
        client.release();

    };

    return result;

};


module.exports={
    modelGetLogs
}