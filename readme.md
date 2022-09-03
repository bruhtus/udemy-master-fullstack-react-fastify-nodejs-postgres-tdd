# Udemy Master Fullstack - React, Fastify, Node.js, Postgresql, and TDD

> For this repo, we're going to use `pnpm` instead of `npm` as package manager.

## Setup Jest

After installing jest, we can setup jest by using this command:
```sh
pnpm exec jest --init
```

`pnpm exec` executes a shell command in scope of current project.

> When we run those command, just follow the question until it generate a jest
> config.

## Migration with db-migrate packages

First, we need to install `db-migrate` and related package using this command:
```sh
pnpm add db-migrate db-migrate-pg pg-promise
```

After that, run `db-migrate` using this command:
```sh
pnpm exec db-migrate create test-db
```

> The command above will generate a db migration script, and `test-db` is the
> name of the script.

## JSON Schema

Fastify provide a way to validate input (request) and output (reply).

Let's say we have a request like this:
```json
{
  "id": 1,
  "name": "nganu",
  "price": 69.42
}
```

The JSON schema validation for those request would be something like this:
```javascript
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
};
```

Now, let's say that `name` need to have minimal 10 character and required. The
JSON schema would be like this:
```javascript
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
      minLength: 10,
    },
    price: {
      type: 'number',
    },
  },
  required: ['name'],
};
```

Another example is an array type request like this:
```json
[
  {
    "id": 1,
    "name": "nganu",
    "price": 69.42
  }
]
```

The JSON schema validation for those request would be something like this:
```javascript
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
        minLength: 10,
      },
      price: {
        type: 'number',
      },
    },
    required: ['name'],
  }
```

## Test Driven Development (TDD)

Test Driven Development or TDD is a development technique where we need to
make a test first and make sure that the test failed first before we make an
implementation.

There's three common step process for TDD:
1. Write failing test cases.
2. Write implementation that sufficient enough to pass the failing test cases
   before.
3. Refactor the implementation if necessary.

> Basically our implementation should be based on our test rather than our
> test based on our implementation.
>
> With that kind of setup, we don't need to change the test every time we
> refactor the implementation and we also have a guarantee that the
> functionality of the implementation is the same when we do a refactor.

> A tips from the course:<br>
> If we want to make a unit test, start with the code that does not have
> dependency, in other word, completely independent code.

## Create React App

We can create new react app with this command:
```sh
npx create-react-app app-name
```

The `create-react-app` package will create and setup a react app with
`app-name` that we provided.

After it is created, we can change directory to the app directory:
```sh
cd app-name
```

> Please keep in mind that the directory is relative to the path we give when
> using `create-react-app` package.

## CORS (Cross Origin Resource Sharing)

Before the browser send an actual request to web server, browser will ensure
that our web server accept the request from current domain or not.

If the web server is not accepting any request from current domain, then the
browser will reject the request before sending the actual request.

For more info, we can check the [mdn documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## JWT (JSON Web Token)

### Cookies-based Authentication

Let's say we have a client, and client send a login request with username and
password to the server.

Server verify the username and password, is it exist in our database or not?
If it is exist in our database, server will create a login session for the
user and then send the cookies back to the client.

For getting any resource from the server, the client will use those cookies
and whenever the client send a request, those cookies will automatically added
to the http request header and send back to the server.

Now, let's say the client send the request to the server along with the
cookies in http header. After the server receive the request, server will
extract those cookies from the http request header and verify if the user
exist in our server session or not.

> Let's assume that server session is some kind of in-memory on server side.

Whenever request come to the server, server look for the cookies and verify
those cookies with the session.

Now, if we have lots of connection with the server, the session data will
going to increase. And that is the problem with cookies-based authentication.

### JWT-based Authentication

Let's say we have a client, and client send a login request with username and
password to the server.

Server verify the username and password, is it exist in our database or not?
If it is exist in our database, server will create some kind of hash which
usually called JWT token. Server will also encrypt those JWT token with some
kind of secret key, this secret key will be maintained on the server side.

> Maybe we can think of those secret key have similar role as session in
> cookies-base authentication?

Finally, server will send those JWT token back to the client. So, if the
client send a request, the request header will have the JWT token instead of
cookies. The server will extract those JWT token from the request and validate
those JWT token with the secret key on the server side. Is it the same JWT
token created by the secret key? If yes, then send the resources back to
client.

With this method, we're not maintaining any kind of data, no state of the
current login user. And that's why this method usually called the "stateless
authentication".

## Extra Notes

### Fastify

In a fastify environment, everything is a plugin, even a route is a plugin. So
if we want to extend the functionality of out application, we can make a
plugin for fastify.

Fastify plugin is a function with three parameters, which is:
- Fastify instance
- Options
- Next/Done

Fastify also has `preHandler` properties like this:
```javascript
fastify.post(
  '/',
  {
    schema: { ... },
    preHandler: (request, reply, done) => {},
  },
  async (request, reply) => {}
);
```

Before running the handler at the end of fastify argument, which in the
example above is this:
```javascript
async (request, reply) => {}
```

Fastify will run the `preHandler` function as another form of validation.

### Jest

We can't use promise inside of `describe()`, so we need to use `beforeAll()`,
`afterAll()`, `beforeEach()`, and `afterEach()`.

`.mockImplementation()` is to change the implementation of jest mock function,
so it's not only change the return value like `.mockReturnValueOnce()`.

> Still not sure what is the difference between `.mockImplementation()` and
> `.mockReturnValueOnce()` if we use `.mockImplementation()` like this:<br>
> `function.mockImplementation(() => false)`<br>
> and this:<br>
> `function.mockReturnValueOnce(false)`.

We can restore the original implementation with `.mockRestore()` like this:
```javascript
function.mockRestore()
```

**But, `function.mockRestore()` only works when the mock created with
`jest.spyOn()`. If we use `jest.fn()` we need to take care of restoration
manually**.

## References

- [Udemy Course](https://www.udemy.com/course/fullstack-project-react-fastify-nodejs-postgresql-tdd/).
- [Course backend github repo](https://github.com/Vikas-Kumar56/fastify-node-project).
- [Change docker compose individual container](https://forums.docker.com/t/custom-container-name-for-docker-compose/48089/3).
- [Change docker compose project name container](https://stackoverflow.com/a/72412046).
- [JSON schema validation](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-a-vocabulary-for-structural).
- [Fastify validation and serialization](https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/).
- [Fastify swagger](https://github.com/fastify/fastify-swagger).
- [Jest .reject() documentation](https://jestjs.io/docs/tutorial-async#rejects).
- [Jest .toThrow() documentation](https://jestjs.io/docs/expect#tothrowerror).
- [Close connection to pg-promise](https://github.com/vitaly-t/pg-promise#library-de-initialization).
- [Pg-promise connection syntax](https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax).
- [UUID format](https://www.uuidtools.com/what-is-uuid).
- [Jest setup and teardown](https://jestjs.io/docs/setup-teardown).
- [Javascript Date()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).
- [Javascript to get yesterdate date without library](https://stackoverflow.com/a/3674559).
- [Luxon examples](https://moment.github.io/luxon/demo/global.html).
- [Jest object documentation](https://jestjs.io/docs/jest-object).
- [Jest mock explanation](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c).
- [Jest module mocking blog post](https://www.emgoto.com/mocking-with-jest/).
- [CORS mdn documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
- [Jest object array partial match example repo](https://github.com/HugoDF/jest-object-array-partial-match).
- [Jest array containing documentation](https://jestjs.io/docs/expect#expectarraycontainingarray).
