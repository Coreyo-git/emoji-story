const {
    DynamoDBClient,
    ListTablesCommand,
	CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

// setup dynamo db configurations
const client = new DynamoDBClient({ region: "ap-southeast-2"});
const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = "VisitorCounter";
const counterKey = "emoji-story";

// Async function to increment and get the visitor counter
async function incrementAndGetVisitorCounter() {
    const incrementParams = {
        TableName: tableName,
        Key: { Counter: counterKey },
        UpdateExpression:
            "SET VisitorCount = if_not_exists(VisitorCount, :start) + :incr",
        ExpressionAttributeValues: {
            ":start": 0,
            ":incr": 1,
        },
        ReturnValues: "UPDATED_NEW",
    };

    // Increment the visitor count and return the new amount
    try {
        const incrementCommand = new UpdateCommand(incrementParams);
        const incrementResponse = await dynamodb.send(incrementCommand);
        // console.log("Success", incrementResponse);
        return incrementResponse.Attributes.VisitorCount;
    } catch (error) {
        console.log("Error updating visitor count: ", error);
    }
}

module.exports = { incrementAndGetVisitorCounter };
