# Test MEDEVA Muhammad Nasrulloh

A simple API using NodeJS, TypeScript, Express and Sequelize to connect to a Postgres database.

To view the full postman api on how I got here, check my [PostMan API](https://web.postman.co/workspace/Medeva~fb07327b-0c57-48e4-b0d6-2c7e54916ece).

## Installation

Clone the repository

run
```bash
docker compose up
```
```bash
npm install
```
```bash
npm sequelize-cli db:migrate
```
```bash
npx sequelize-cli db:seed:all
```
then
```bash
npm start
```


## UML
![UML Diagram](/docs/UML.png)


### Done
* [x] Create POSTMAN API
* [x] Create Login & Register API
* [x] Create Middleware API
* [x] Create Database
* [x] Create Model
* [x] Create Controller
* [x] Create Routes
* [x] Create Repository
* [x] Create Seeder
* [x] Create Migration
* [x] Create Docker
* [x] Implemented NGINX

### To Do
* [ ] Create Test
* [ ] Create Documentation
* [ ] Create Dashboard Page
