const {
    modelGetEntries,
    modelGetEntriesBySearch,
    modelGetEntriesByEmail,
    modelGetEntryByID,
    modelCreateEntry,
    modelUpdateEntry,
    modelDeleteEntry } = require('../models/modelEntries');

const limitePorDefecto = 10;


const getEntries = async ({ query }, res) => {

    try {

        const limit = parseInt(query.limit) || limitePorDefecto;
        let page = parseInt(query.page) || 1;

        const data = await modelGetEntries();

        if (data) {
            let totalEntries, totalPages;
            const arrPage = [];

            for (let i = 0; i < data.length; i += limit) {
                const pag = data.slice(i, i + limit);
                arrPage.push(pag);
            }

            totalEntries = data.length;

            totalPages = Math.ceil(totalEntries / limit);
            
            if (page - 1 >= arrPage.length) page = arrPage.length;

            return res.status(200).json({
                ok: true,
                msg:'',
                totalEntries,
                limit,
                totalPages,
                page,
                data: arrPage[page - 1]
            });

        } else return res.status(400).json({
            ok: true,
            msg: 'No hay entradas en la base de datos.'
        });

    } catch (e) {
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
            let totalEntries, totalPages;
            const arrPage = [];

            for (let i = 0; i < data.length; i += limit) {
                const pag = data.slice(i, i + limit);
                arrPage.push(pag);
            }

            totalEntries = data.length;

            totalPages = Math.ceil(totalEntries / limit);

            if (page - 1 >= arrPage.length) page = arrPage.length;

            return res.status(200).json({
                ok: true,
                msg:'',
                totalEntries,
                limit,
                totalPages,
                page,
                data: arrPage[page - 1]
            });

        } else return res.status(400).json({
            ok: true,
            msg: `No hay entradas en la base de datos con el texto: ${params.text}.`
        });

    } catch (e) {
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
            let totalEntries, totalPages;
            const arrPage = [];

            for (let i = 0; i < data.length; i += limit) {
                const pag = data.slice(i, i + limit);
                arrPage.push(pag);
            }

            totalEntries = data.length;

            totalPages = Math.ceil(totalEntries / limit);

            if (page - 1 >= arrPage.length) page = arrPage.length;

            return res.status(200).json({
                ok: true,
                msg:'',
                totalEntries,
                limit,
                totalPages,
                page,
                data: arrPage[page - 1]
            });

        } else return res.status(400).json({
            ok: true,
            msg: `No hay entradas en la base de datos con el email: ${params.email}.`
        });

    } catch (e) {
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