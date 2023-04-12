const { modelGetLogs } = require('../models/modelLogs');

const { pages } = require('../helpers/pages');

const limitePorDefecto = 5;


const getLogs = async ({ query }, res) => {

    try {

        const limit = parseInt(query.limit) || limitePorDefecto;
        let page = parseInt(query.page) || 1;

        const data = await modelGetLogs();

        if (data) {

            const { arrPage,
                totalEntries,
                totalPages,
                pageFix } = pages(data, page, limit);

            return res.status(200).json({
                ok: true,
                msg: '',
                totalEntries,
                limit,
                totalPages,
                page: pageFix + 1,
                data: arrPage[pageFix]
            });

        } else
            return res.status(400).json({
                ok: true,
                msg: 'No hay entradas en la base de datos.'
            });

    } catch (e) {
        console.log('catchError en getLogs:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getLogs.',
            error: e
        });

    };
};


module.exports = {
    getLogs
}