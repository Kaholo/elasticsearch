# kaholo-plugin-elasticsearch
Kaholo plugin for elasticsearch

## Method - Insert document
Stores a JSON document(object) in an index, making it searchable using elasticsearch. 

### Parameters
1. Index(required) - The index to store the document in.
2. Type - Document Type. If not provided then default is '_doc'.
3. ID - The ID in the index to store the document in. If not provided elastic search will generate one.
4. Body - The body of the document to store in the index. Has to be passed from code as an object. 

## Method - Search by Query String
Searches and returns documents matching a query. 

### Parameters
1. Index - The index to search in.
2. Type - The document Type to search for.
3. Query - The query to use to search in elasticsearch. Needs to be provided as a string.

## Method - Search by Body
Searches and returns documents matching a query. 

### Parameters
1. Index - The index to search in.
2. Type - The document Type to search for.
3. Body - The Body Query to use to search in elasticsearch. Needs to be provided as an object from code.   
    Notice: the object inside the body will be placed inside the JSON in the following format: {
        "body": {
            "query": {
                **Body Search Object**
            }
        }
    }
