const elasticsearch = require('elasticsearch');

async function indexData(action, settings) {
    const index = (action.params.index || "").trim();
    if (!index){
        throw "Index was not provided";
    }
    const docType = (action.params.type || "_doc").trim();
    const id = (action.params.id || "").trim();
    const body = action.params.body;
    if (typeof body !== "object"){
        throw "Body must be provided as an object from code";
    }

    let docObj = {
        index: index,
        type: docType,
        body: body
    }
    if (id) docObj.id = id;

    const client = createClient(settings);
    return client.index(docObj);
}

async function searchDataQ(action, settings) {
    const query = (action.params.query || "").trim(); // throws error if query is not a string
    
    let searchObj = {
        q: query
    }
    
    return searchByObject(action, settings, searchObj);
}

async function bodySearch(action, settings) {
    let body = action.params.body;
    if (typeof body !== "object"){
        throw "Body must be provided as an object from code";
    }
    
    let searchObj = {
        body: {
            query: body
        }
    }
    
    return searchByObject(action, settings, searchObj);
}

/////////// HELPERS ///////////

function createClient(settings) {
    const connectionString = settings.connectionString;
    const client = new elasticsearch.Client({node: `${connectionString}`});
    return client;
}

function searchByObject(action, settings, searchObj){
    const index = (action.params.index || "").trim();
    const docType = (action.params.type || "").trim();

    if (index) searchObj.index = index;
    if (docType) searchObj.type = docType;

    const client = createClient(settings);
    return client.search(searchObj);
}

module.exports = {
    indexData,
    searchDataQ,
    bodySearch
};