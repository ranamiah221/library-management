# Library Management System
We are develop a Library Management System using Express, TypeScript, and MongoDB (via Mongoose).

## Project setup
At the beginning, our project which we installed on Express and Mongoose.
```
npm init -y
npm i express mongoose
```
We used the Nice command to make our project a TapeScript concept.
```
tsc --init
```
This is the main file of our project.
- **app.ts:** initialize and configure the express app.
- **server.ts:** Start the server.ts.

We have connected the MongoDB database to our **server.ts**

```
mongoose.connect('mongodb+srv://library:library@cluster0.ungcn7e.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0')
```
Running the project **package.json** has a script:

```
"scripts": {
    "dev": "ts-node-dev --respawn --transpile-only server.ts",
}
```
Then run:
```
npm run dev
```
## Our Project Featured.

- Schema validation
- Implement bussiness logic
- Use aggregation pipeline
- Mongoose instance method
- filtering features

Handle error with generic error response.

```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```
## API Endpoints Overview

- GET: ***/api/books*** return list of all books.
- GET: ***/api/borrow*** return all borro.
- GET: ***/api/books/:id*** return a single book by its _id.
- POST: ***/api/books*** create a new book.
- POST: ***/api/borrow*** create a new borrow.
- PUT: ***/api/books?:id*** updates an existing book by _id.
- DELETE: ***/api/books?:id*** deletes an existing book by _id.







