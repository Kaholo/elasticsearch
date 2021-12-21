const parsers = require("./parsers");
const {removeUndefinedAndEmpty, sleep} = require('./helpers');
const { Client } = require('@elastic/elasticsearch')

module.exports = class ElasticsearchService{
    constructor({connectionString}){
        if (!connectionString){
            throw `Connection string was not provided!`;
        }
        this.client = new Client({node: `${connectionString}`, ssl: {rejectUnauthorized: false} });
    }

    static from(params, settings){
        return new ElasticsearchService({
            connectionString: parsers.string(params.connectionString || settings.connectionString)
        });
    }
    
    async indexData({index, id, body}){
        if (!index || !body || !Object.keys(body).length){
            throw "Index or Body were not provided";
        }
        return (await this.client.index(removeUndefinedAndEmpty({
            index, id, body
        }))).body;
    }
    
    async searchDataQ({query, index}){
        if (!query){
            throw `Must provide a query to search by!`;
        }
        return (await this.client.search(removeUndefinedAndEmpty({
            q: query,
            index
        }))).body;
    }
    
    async bodySearch({body, index}){
        if (!body){
            throw `Must provide a query body to search by!`;
        }
        return (await this.client.search(removeUndefinedAndEmpty({
            body: {
                query: body
            },
            index
        }))).body;
    }
    
    async createSnapshot({repository, name}){
        if (!repository || !name){
            throw `Didn't provide one of the required parameters!`;
        }
        return (await this.client.snapshot.create({
            repository, 
            snapshot: name
        })).body;
    }
    
    async restoreIndexBySnapshot({repository, snapshot, index}){
        if (!repository || !snapshot || !index){
            throw `Didn't provide one of the required parameters!`;
        }
        const result = {};
        try {
            result.deleteCurIndex = (await this.client.indices.delete({index})).body;
            await sleep(1000);
        }
        catch (e) {}
        try {
            result.restoreIndexBySnapshot = (await this.client.snapshot.restore({
                snapshot, repository,
                body: {
                    indices: [index]
                }
            })).body;
        }
        catch (error) {
            throw {
                previousOperationResults: result,
                method: "restoreIndexBySnapshot",
                error
            }
        }
        return result;
    }
    
    async listIndexes(){
        return (await this.client.cat.indices({
            format: "json",
            h: "index",
            s: "index"
        })).body;
    }
    
    async listSnapshotRepos(){
        return (await this.client.cat.repositories({
            format: "json",
            h: "id",
            s: "id"
        })).body;
    }
    
    async listSnapshots({repository}){
        const snapshots = (await this.client.cat.snapshots({
            format: "json",
            h: "id,repository,status",
            s: "repository,id"
        })).body;
        return snapshots.filter(snapshot => snapshot.repository === repository && snapshot.status === "SUCCESS");
    }
}