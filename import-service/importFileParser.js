const AWS = require('aws-sdk');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const csv = require("csv-parser");
const client = new S3Client({ region: "eu-north-1" });

const sqs = new AWS.SQS();

export const handler = async (event) => {
  const record = event.Records[0];
  const bucket = record.s3.bucket.name;
  const key = record.s3.object.key;
  const queueUrl = 'https://sqs.eu-west-1.amazonaws.com/854321213400/products-queue';

  if (!key.startsWith("uploaded/")) {
    console.log("Skipped. Object not in the \"uploaded\" folder.");
    return;
  }

  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await client.send(command);
    const stream = response.Body;

    stream
      .pipe(csv())
      .on('data', async (record) => {
        const params = {
          MessageBody: JSON.stringify(record),
          QueueUrl: queueUrl,
        };
    
        try {
          const result = await sqs.sendMessage(params).promise();
          console.log(`Sent message to SQS: ${result.MessageId}`);
        } catch (error) {
          console.log(`Error sending message to SQS: ${error.message}`);
          throw error;
        }
      })
      .on("end", () => console.log("End of stream"));
  } catch (error) {
    console.log(error);
    const message = `Error getting object ${key} from bucket ${bucket}`;
    console.log(message);
    throw new Error(message);
  }
};