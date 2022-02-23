# AUCTION SERVICE REST API

Simple REST API using the Serverless Framework

## Install

    npm install
    npm install -g serverless

## Deploy the app the app (must used commands)

$ sls deploy --verbose
$ sls deploy --verbose --aws-profile development
$ sls remove --verbose --aws-profile development
$ sls deploy --verbose --stage dev --aws-profile development

// Execute functions
$ sls deploy function -f createAuction --verbose --aws-profile development
$ sls deploy function -f getAuction --verbose --aws-profile development
$ sls deploy function -f getAuctions --verbose --aws-profile development

// Middy
repo: https://github.com/middyjs/middy
$ npm install @middy/core @middy/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser

// Commands to see the logs
$ sls logs -f processAuctions --aws-profile development
$ sls logs -f processAuctions --startTime 1m --aws-profile development
$ sls logs -f processAuctions -t --aws-profile development

// Serverless dashboard
$ serverless

// Manual execution of a function
$ sls invoke -f processAuctions -l --aws-profile development
$ sls deploy function -f processAuctions --verbose --aws-profile development
$ sls deploy function -f uploadAuctionPicture --verbose --aws-profile development
$ sls logs -f uploadAuctionPicture -t
$ sls info --aws-profile development

## API Endpoints (backend routes)

​
| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| ----------- | --------------------------- | -------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST | `/auth/signup` | {username, email, password} | 201 | 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | `/auth/login` | {email, password} | 200 | 401 | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST | `/auth/logout` | | 204 | 400 | Logs out the user |
| GET | `/profile` | Saved session | 200 | 404 | Check if user is logged in and return profile page |
| PATCH | `/profile/edit/:id` | {username, email, image, phone} | 200 | 400 | Update user profile |
| GET | `/profile/allusers` | | 200 | 400 | Get all the users |
| GET | `/profile/allusers/search` | | 200 | 400 | Get users by searching for their names |
| GET | `/groups | | 200 | 400 | Find all the groups in which a user is member | | POST | `/groups/add` | {name, members, image, users id array} | 200 | 400 | Create a group to share expenses with | | PATCH |`/groups/edit/:id` | {name, members, image, users id array} | 200 | 400 | Edit an existing group | | DELETE |`/groups/delete/:id` | {id} | 200 | 400 | Delete an existing group | | GET |`/groups/group-details/:id`| {id} | 200 | 400 | View group details page | | POST |`/costs/add/:id` | {concept, costImport, ticket, buyer, group, date} | 200 | 400 | Introduce a cost | | GET |`/all-costs/:id` | | 200 | 400 | Get all the costs within a group | | DELETE |`/costs/delete/:id` | {id} | 200 | 400 | Delete an existing cost | | POST |`/expense/add/:id` | {expenseImport, payed , group, payer, beneficiary} | 200 | 400 | Set the expense for each group member | | PATCH |`/expense/edit/:id` | {expenseImport, payed , group, payer, beneficiary} | 200 | 400 | Edit an existing expense | | GET |`/expense/all/:id` | {id} | 200 | 400 | Get all the expenses | | DELETE |`/expense/delete/:id` | {id} | 200 | 400 | Delete an existing expense |
| GET | /arrangements | | 200 | 400 | Check all your debts and all your pending incomes |
​
​

# REST API Description

The REST API to the example app is described below.

## Get list of Things

### Request

`GET /thing/`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Create a new Thing

### Request

`POST /thing/`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:7000/thing

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a specific Thing

### Request

`GET /thing/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a non-existent Thing

### Request

`GET /thing/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/9999

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Create another new Thing

### Request

`POST /thing/`

    curl -i -H 'Accept: application/json' -d 'name=Bar&junk=rubbish' http://localhost:7000/thing

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/2
    Content-Length: 35

    {"id":2,"name":"Bar","status":null}

## Get list of Things again

### Request

`GET /thing/`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 74

    [{"id":1,"name":"Foo","status":"new"},{"id":2,"name":"Bar","status":null}]

## Change a Thing's state

### Request

`PUT /thing/:id/status/changed`

    curl -i -H 'Accept: application/json' -X PUT http://localhost:7000/thing/1/status/changed

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Get changed Thing

### Request

`GET /thing/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Change a Thing

### Request

`PUT /thing/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'name=Foo&status=changed2' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed2"}

## Attempt to change a Thing using partial params

### Request

`PUT /thing/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'status=changed3' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed3"}

## Attempt to change a Thing using invalid params

### Request

`PUT /thing/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'id=99&status=changed4' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed4"}

## Change a Thing using the \_method hack

### Request

`POST /thing/:id?_method=POST`

    curl -i -H 'Accept: application/json' -X POST -d 'name=Baz&_method=PUT' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Baz","status":"changed4"}

## Change a Thing using the \_method hack in the url

### Request

`POST /thing/:id?_method=POST`

    curl -i -H 'Accept: application/json' -X POST -d 'name=Qux' http://localhost:7000/thing/1?_method=PUT

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: text/html;charset=utf-8
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Delete a Thing

### Request

`DELETE /thing/id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/thing/1/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 204 No Content
    Connection: close

## Try to delete same Thing again

### Request

`DELETE /thing/id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/thing/1/

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Get deleted Thing

### Request

`GET /thing/1`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:33 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Delete a Thing using the \_method hack

### Request

`DELETE /thing/id`

    curl -i -H 'Accept: application/json' -X POST -d'_method=DELETE' http://localhost:7000/thing/2/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:33 GMT
    Status: 204 No Content
    Connection: close

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
