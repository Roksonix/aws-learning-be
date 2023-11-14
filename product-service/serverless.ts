import type { AWS } from '@serverless/typescript';

import fillWithMockProducts from '@functions/fillWithMockProducts';
import createProduct from '@functions/createProduct';
import getProducts from '@functions/getProducts';
import getProductById from '@functions/getProductById';
import getAvailable from '@functions/getAvailable';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["sns:Publish"],
        Resource: ["Ref:CreateProductTopic"],
      },
    ]
  },
  // import the function via paths
  functions: {
    fillWithMockProducts,
    createProduct,
    getProducts,
    getProductById,
    getAvailable,
    catalogBatchProcess
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      productsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "products-queue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "Create Product Topic",
          TopicName: "product-import-topic",
        },
      },
      CreateProductTopicSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          Endpoint: "Volodymyr_Vashchuk@epam.com",
        },
      },
    }
  }
};

module.exports = serverlessConfiguration;
