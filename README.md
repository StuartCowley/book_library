# Book Library API :books:

## About

The Book Library API project as part of the Manchester Codes curriculum (back-end module).

Built using Node, Express, MySQL, Sequelize.

Mocha, Chai, Supertest and Faker(for mocking) were used for testing which was used throughout the project.

## Installation

- Pull a MySQL image and run the container
- Clone this repo
- Change in to repo directory
- Run `npm install`
- Create a .env file and add local variables:
  - DB_PASSWORD
  - DB_NAME
  - DB_USER
  - DB_HOST
  - DB_PORT
  - PORT
- If you wan to run the tests create a .env.test file with the same environmental variables changing the DB_NAME variable.
- Run `npm start` to start the project
- Run `npm test` to run the tests

## Routes

### Readers

A reader requires a name, email and password.

- Create: POST to /readers
- Read all: GET to /readers
- Read single: GET to /readers/:id
- Update: PATCH to /readers/:id
- Delete: DELETE to /readers/:id

### Books

A book requires a title, ISBN, GenreId, AuthorId and a ReaderId.

- Create: POST to /books
- Read all: GET to /books
- Read single: GET to /books/:id
- Update: PATCH to /books/:id
- Delete: DELETE to /books/:id

### Genres

A genre requires a genre name.

- Create: POST to /genres
- Read all: GET to /genres
- Read single: GET to /genres/:id
- Update: PATCH to /genres/:id
- Delete: DELETE to /genres/:id

### Authors

An author requires an author name.

- Create: POST to /authors
- Read all: GET to /authors
- Read single: GET to /authors/:id
- Update: PATCH to /authors/:id
- Delete: DELETE to /authors/:id
