import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    PRODUCTS_TABLE: 'products',
    SQS_QUEUE_URL: 'Ref:SQSQueue',
    SNS_ARN: 'Ref:CreateProductTopic'
  },
  events: [
    {
      sqs: {
        arn: {
          "Fn::GetAtt": ["productsQueue", "Arn"],
        },
        batchSize: 5,
      },
    },
  ],
};
