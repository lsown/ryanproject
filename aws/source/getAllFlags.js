
const Common = require("./common.js")
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


module.exports.handler = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {
    console.log("sup", event)
    let aquariumId = event.pathParameters.aquariumId
    let params = {
        TableName: process.env.AQUARIUM_TABLE, 
        Key: {'aquariumId': aquariumId}
    }
    return docClient.get(params).promise().then((response) => {
        let flagPacket = {};
        flagPacket.aquaFlag = response.Item.aquaFlag;
        flagPacket.takeupFlag = response.Item.takeupFlag;
        flagPacket.feedFlag = response.Item.feedFlag;
        flagPacket.overflowFlag = response.Item.overflowFlag;
        console.log(response.Item.aquaFlag)
        console.log(response.Item.Flag)
        console.log(response.Item.aquaFlag)
        console.log(response.Item.aquaFlag)
        console.log(flagPacket)
        return {
            flagPacket
        }
    })
})}
