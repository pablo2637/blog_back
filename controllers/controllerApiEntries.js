const {
    modelGetEntries,
    modelGetEntriesBySearch,
    modelGetEntriesByEmail,
    modelGetEntryByID,
    modelCreateEntry,
    modelUpdateEntry,
    modelDeleteEntry } = require('../models/modelEntries');

const { pages } = require('../helpers/pages');

const limitePorDefecto = 5;


const getEntries = async ({ query }, res) => {

    try {

        const limit = parseInt(query.limit) || limitePorDefecto;
        let page = parseInt(query.page) || 1;

        const data = await modelGetEntries();

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

        } else return res.status(400).json({
            ok: true,
            msg: 'No hay entradas en la base de datos.'
        });

    } catch (e) {
        console.log('catchError en getEntries:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getEntries.',
            error: e
        });

    };
}


const getEntriesBySearch = async ({ params, query }, res) => {

    try {

        const limit = parseInt(query.limit) || limitePorDefecto;
        let page = parseInt(query.page) || 1;

        const data = await modelGetEntriesBySearch(params.text);

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

        } else return res.status(400).json({
            ok: true,
            msg: `No hay entradas en la base de datos con el texto: ${params.text}.`
        });

    } catch (e) {
        console.log('catchError en getEntriesBySearch:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getEntriesBySearch.',
            error: e
        });

    };
}


const getEntriesByEmail = async ({ params, query }, res) => {

    try {

        const limit = parseInt(query.limit) || limitePorDefecto;
        let page = parseInt(query.page) || 1;

        const data = await modelGetEntriesByEmail(params.email);

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

        } else return res.status(400).json({
            ok: true,
            msg: `No hay entradas en la base de datos con el email: ${params.email}.`
        });

    } catch (e) {
        console.log('catchError en getEntriesByEmail:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getEntriesByEmail.',
            error: e
        });

    };
};


const getEntryByID = async ({ params }, res) => {

    try {

        const data = await modelGetEntryByID(params.id);

        if (data) return res.status(200).json({
            ok: true,
            data
        });
        else return res.status(400).json({
            ok: true,
            msg: `No se encontró la entrada con id: ${params.id}.`
        });

    } catch (e) {
        console.log('catchError en getEntryByID:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en getEntryByID.',
            error: e
        });

    };
};


const createEntry = async ({ body }, res) => {

    try {

        const data = await modelCreateEntry(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        console.log('catchError en createEntry:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en createEntry.',
            error: e
        });

    };
};


const updateEntry = async ({ body }, res) => {

    try {

        const data = await modelUpdateEntry(body);

        if (data) return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        console.log('catchError en updateEntry:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en updateEntry.',
            error: e
        });

    };
};


const deleteEntry = async ({ params }, res) => {

    try {

        const data = await modelDeleteEntry(params.entryID);

        if (!data) return res.status(400).json({
            ok: false,
            msg: `deleteEntry: no se encontró la entrada con id: ${params.entryID}`
        });

        return res.status(200).json({
            ok: true,
            data
        });

    } catch (e) {
        console.log('catchError en deleteEntry:', e);

        return res.status(500).json({
            ok: false,
            msg: 'Error en deleteEntry.',
            error: e
        });

    };
};


module.exports = {
    getEntries,
    getEntriesBySearch,
    getEntriesByEmail,
    getEntryByID,
    createEntry,
    updateEntry,
    deleteEntry
}