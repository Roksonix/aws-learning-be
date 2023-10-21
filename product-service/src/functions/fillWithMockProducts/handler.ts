import { productList } from "@functions/__mockData__";

const AWS = require("aws-sdk");

const fillWithMockProducts = () => {
    AWS.config.update({ region: "eu-west-1" });
    const client = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "products",
        Select: "COUNT",
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.error("Error scanning the table:", err);
            return;
        }

        if (data.Count > 0) {
            console.log(`Table has ${data.Count} item(s).`);
            return;
        }

        const params = {
            RequestItems: {
                [process.env.PRODUCTS_TABLE_NAME]: productList.map(({ id, title, description, price }) => ({
                    PutRequest: {
                        Item: { id, title, description, price },
                    },
                })),
                [process.env.STOCKS_TABLE_NAME]: productList.map(({ id, count }) => ({
                    PutRequest: {
                        Item: { id, count },
                    },
                })),
            },
        };

        client.batchWrite(params, (err, _) => {
            if (err) {
                console.error("Error performing bulk write:", err);
            } else {
                console.log("Bulk write successful");
            }
        });
    });
};

export const main = fillWithMockProducts;