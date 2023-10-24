import { DynamoDB } from "aws-sdk";
import { composeResult } from "src/utils/composeResults";

export const getAll = async (tableName: string) => {
  const client = new DynamoDB.DocumentClient();
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  };
  const result = await new Promise((resolve, _) => {
    client.scan(params, (err, data) => {
      resolve(composeResult(data.Items, err));
      if (err) console.error(err);
    });
  });

  return result;
}

export const getById = async (id: string, tableName: string) => {
  const client = new DynamoDB.DocumentClient();
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      id,
    },
  };
  const result = await new Promise((resolve, _) => {
    client.get(params, (err, data) => {
      resolve(composeResult(data.Item, err));
      if (err) console.error(err);
    });
  });

  return result;
}