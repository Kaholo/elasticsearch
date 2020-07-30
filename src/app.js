const elasticsearch = require('elasticsearch');

async function indexData(action, settings) {
    const client = createClient(settings);
    return client.index(action.params.obj);
}

async function searchData(action, settings) {
    const client = createClient(settings);
    return client.search(action.params.obj);
}

/////////// HELPERS ///////////

function createClient(settings) {
    const connectionString = settings.connectionString;
    const client = new elasticsearch.Client({node: `${connectionString}`});
    return client;
}

module.exports = {
    INDEX_DATA: indexData,
    SEARCH_DATA: searchData
  };