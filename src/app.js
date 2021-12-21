const parsers = require("./parsers");

const ElasticsearchService = require('./elasticsearch.service');
async function indexData(action, settings){
    const { index, id, body } = action.params;
    const elasticsearchService = ElasticsearchService.from(action.params, settings);
    return elasticsearchService.indexData({
        index: parsers.autocomplete(index),
        id: parsers.string(id),
        body: parsers.json(body)
    });
}

async function searchDataQ(action, settings){
    const { query, index } = action.params;
    const elasticsearchService = ElasticsearchService.from(action.params, settings);
    return elasticsearchService.searchDataQ({
        query: parsers.string(query),
        index: parsers.autocomplete(index)
    });
}

async function bodySearch(action, settings){
    const { body, index } = action.params;
    const elasticsearchService = ElasticsearchService.from(action.params, settings);
    return elasticsearchService.bodySearch({
        body: parsers.json(body),
        index: parsers.autocomplete(index)
    });
}

async function createSnapshot(action, settings){
    const { repository, name } = action.params;
    const elasticsearchService = ElasticsearchService.from(action.params, settings);
    return elasticsearchService.createSnapshot({
        repository: parsers.autocomplete(repository),
        name: parsers.string(name)
    });
}

async function restoreIndexBySnapshot(action, settings){
    const { repository, snapshot, index } = action.params;
    const elasticsearchService = ElasticsearchService.from(action.params, settings);
    return elasticsearchService.restoreIndexBySnapshot({
        repository: parsers.autocomplete(repository),
        snapshot: parsers.autocomplete(snapshot),
        index: parsers.autocomplete(index)
    });
} 

module.exports = {
    indexData,
	searchDataQ,
	bodySearch,
	createSnapshot,
	restoreIndexBySnapshot,
    // Autocomplete Functions
    ...require("./autocomplete")
}