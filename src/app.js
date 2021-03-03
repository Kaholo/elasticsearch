const elasticsearch = require('elasticsearch');

async function indexData(action, settings) {
    const obj = parseToObject(action.params.obj);
    if (!obj.hasOwnProperty('index')){
        console.log("Error: object must have index property.");
        throw "bad object format";
    }
    const client = createClient(settings);
    return client.index(obj);
}

async function searchData(action, settings) {
    const obj = parseToObject(action.params.obj);
    const client = createClient(settings);
    return client.search(obj);
}

/////////// HELPERS ///////////

function createClient(settings) {
    const connectionString = settings.connectionString;
    const client = new elasticsearch.Client({node: `${connectionString}`});
    return client;
}

function parseToObject(item){
    if (typeof item === "object"){
        return item;
    }
    else if (typeof item === "string"){
        return JSON.parse(item);
    }
    throw "bad object format";
}

module.exports = {
    INDEX_DATA: indexData,
    SEARCH_DATA: searchData
};