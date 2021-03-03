# kaholo-plugin-elasticsearch
Kaholo plugin for elasticsearch

## Method - Insert document
Stores a JSON document(object) in an index, making it searchable using elasticsearch. 

### Parameters
1) Document Object(required) - An object that contains a JSON document to store. Object properties needs to be written according to the 
    parameters described [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-index.html).
    Can be passed either as an object from code, or as the string of the json object.

## Method - Search
Searches and returns documents matching a query. 

### Parameters
1) Search Object(required) - An object that contains a query to search in documents. Object properties needs to be written according to
    the parameters described [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-search.html).
    Can be passed either as an object from code, or as the string of the json object.