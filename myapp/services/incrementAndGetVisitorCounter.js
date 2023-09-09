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
const client = new DynamoDBClient({ region: "ap-southeast-2" });
const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = "AT1-VisitCount-n11270209";
const counterKey = "emoji-story";

// Flag to prevent multiple table creation attempts
let isCreatingTable = false; 

// Async function to create the table if it doesn't exist
async function createTableIfNotExists() {
	if (isCreatingTable) {
        // Another instance is already creating the table, so wait
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 second
        return;
    }

	isCreatingTable = true;
    const listTablesCommand = new ListTablesCommand({});
    const existingTables = await client.send(listTablesCommand);

    if (!existingTables.TableNames.includes(tableName)) {
        const createTableParams = {
            TableName: tableName,
            KeySchema: [
                { AttributeName: "Counter", KeyType: "HASH" }, // Partition key
            ],
            AttributeDefinitions: [
                { AttributeName: "Counter", AttributeType: "S" }, // String attribute for the partition key
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5,
            },
        };

        const createTableCommand = new CreateTableCommand(createTableParams);
        await client.send(createTableCommand);
    }
}

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

        // Check if the error is due to the table not existing
        if (error.name === "ResourceNotFoundException") {
            console.log("Table does not exist, creating...");
			
			// Create the table
			await createTableIfNotExists();
            
			// Retry the increment operation
            return await incrementAndGetVisitorCounter();           
        }

        // Handle other errors as needed
        throw error; // Re-throw the error for higher-level handling
    }
}

module.exports = { incrementAndGetVisitorCounter };
