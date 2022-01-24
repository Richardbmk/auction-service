import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function infoAuction(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  };
}

export const handler = commonMiddleware(infoAuction);
