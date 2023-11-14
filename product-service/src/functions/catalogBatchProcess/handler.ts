import { Context, SQSEvent } from 'aws-lambda';
import { createProduct } from 'src/services/product.service';
import { SNS } from 'aws-sdk';

const sns = new SNS();

export const catalogBatchProcess = async (event: SQSEvent, _: Context) => {
  const message = {
    Message: "Items are created.",
    TopicArn: "arn:aws:sqs:eu-west-1:854321213400:products-queue",
  };

  let createdProducts = [];

  try {
    for (const record of event.Records) {
      let messageBody;
      try {
        messageBody = JSON.parse(record.body);
      } catch (err) {
        console.log("Error while parsing message", err);
      }

      if (typeof messageBody == "object") {
        const product = await createProduct({
          ...messageBody,
          stock: {
            count: messageBody.stock,
          },
        });

        createdProducts.push(product.data);
      }
    }

    if (createdProducts.length) {
      try {
        await sns.publish(message).promise();
        console.log("Published event to SNS topic");
      } catch (error) {
        console.error("Error publishing event to SNS:", error);
      }
      createdProducts = [];
    }
    console.log("SQS processing complete.");
  } catch (error) {
    console.error("Error processing SQS messages", error);
    throw error;
  }
};

export const main = catalogBatchProcess;
