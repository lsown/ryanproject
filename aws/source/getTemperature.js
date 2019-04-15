

const Common = require("./common.js")
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


module.exports.handler = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {
    console.log("sup", event)
    let aquariumId = event.path.aquariumId
    let params = {
        TableName: process.env.AQUARIUM_TABLE, 
        Key: {'aquariumId': aquariumId}
    }
    return docClient.get(params).promise().then((response) => {
        response.Item.temperature
        console.log(response.Item.temperature)
        return {
            temperature: response.Item.temperature
        }
    })
})}
