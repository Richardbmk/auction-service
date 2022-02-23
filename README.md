# AUCTION SERVICE REST API

Simple REST API using the Serverless Framework

## Install

    npm install
    npm install -g serverless

## Must used commands during development process

### AWS Credential configuration

    https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-set-up-credentials.html

### Deploy the app

    sls deploy --verbose
    sls deploy --verbose --aws-profile development
    sls remove --verbose --aws-profile development
    sls deploy --verbose --stage dev --aws-profile development

### Execute functions

    sls deploy function -f createAuction --verbose --aws-profile development
    sls deploy function -f getAuction --verbose --aws-profile development
    sls deploy function -f getAuctions --verbose --aws-profile development

### Middy

    repo: https://github.com/middyjs/middy
    npm install @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser

### Commands to see the logs

    sls logs -f processAuctions --aws-profile development
    sls logs -f processAuctions --startTime 1m --aws-profile development
    sls logs -f processAuctions -t --aws-profile development

### Serverless dashboard

    serverless

### Manual execution of a function

    sls invoke -f processAuctions -l --aws-profile development
    sls deploy function -f processAuctions --verbose --aws-profile development
    sls deploy function -f uploadAuctionPicture --verbose --aws-profile development
    sls logs -f uploadAuctionPicture -t
    sls info --aws-profile development

## API Endpoints (backend routes)

​
| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| ----------- | --------------------------- | -------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET | `/profile` | Saved session | 200 | 404 | Check if user is logged in and return profile page |
| GET | `/profile` | Saved session | 200 | 404 | Check if user is logged in and return profile page |
| GET | `/profile` | Saved session | 200 | 404 | Check if user is logged in and return profile page |
| PATCH | `/profile/edit/:id` | {username, email, image, phone} | 200 | 400 | Update user profile |
| GET | `/profile/allusers` | | 200 | 400 | Get all the users |
| GET | `/profile/allusers/search` | {id} | 200 | 400 | Get all the expenses | | DELETE |`/expense/delete/:id` | {id} | 200 | 400 | Delete an existing expense |
| GET | /arrangements | | 200 | 400 | Check all your debts and all your pending incomes |
​
​

# REST API Description

The REST API to the example app is described below.

## Get list of Things

### Request

`GET /thing/`

```json
POST /login HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "username": "foo",
    "password": "1234567"
}
```

### Response

```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
   "apitoken": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
   "expirationDate": "2018-02-13T15:31:55.559Z"
}
```

​

## Architecture Diagram

​
<img src="./src/pages/images/wireframes-project3.png"/>

## Microservices related with this Project

​
​

## Links

​

### Notion

​
https://trello.com/b/fmtoOs4Z/organitzaci%C3%B3-projecte-3
​

### Documentation

​
https://docs.google.com/presentation/d/1HTo5i0nOMyy3eusWxx-fVmbrW6Rfadvh/edit#slide=id.gad0d515f45_0_529
