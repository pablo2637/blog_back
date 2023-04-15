
const pages = (data, page, limit) => {

    let totalEntries, totalPages;
    const arrPage = [];

    // console.log('limit', limit, 'data', data.length)
    for (let i = 0; i < data.length; i += limit) {

        const pag = data.slice(i, i + limit);
        // console.log('for i', i, pag.length)
        arrPage.push(pag);
    };

    totalEntries = data.length;

    totalPages = Math.ceil(totalEntries / limit);
    // console.log('page', page, 'page-1', page - 1, 'arrayPage', arrPage.length, 'totalPages', totalPages)
    page--;
    if (page >= arrPage.length)
        page = arrPage.length - 1;
    // console.log('pageFix', page);

    return {
        totalEntries,
        totalPages,
        arrPage,
        pageFix: page
    };
};


module.exports = { pages }