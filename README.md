# User Auth with JWT

A simple project for JWT authentication.

## Prerequisites

* Mongo DB server
* Node.js

## How to start webserver



create .env file with a TOKEN_KEY, which can be a random string. For example

```
MONGO_URI= mongodb://localhost:27017/userDB
TOKEN_KEY= "abcdefg"
```

Then start the node.

```
npm install
node app.js
```


## APIs

APIs for registration, login and JWT verification.
### Register

URL : http://localhost:3000/register

Method : POST

**Post Body**

```
{
  "user_name": "ABC",
  "password": "strongpassword",
  "email": "abc@examplecom"
}
```

### Login

URL : http://localhost:3000/login

Method : POST

**Post Body**

```
{
  "email": "abc@examplecom",
  "password": "strongpassword"
}
```

### Validate

URL : http://localhost:3000/validate

Method : GET

Request Headers

Get the header from login response

```
x-access-token: "Value from login response"
```

## Postman collection

Import [UserAPI.postman_collection.json](https://github.com/tamilnet/userAPI/blob/master/UserAPI.postman_collection.json) and try. 

