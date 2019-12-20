# Todo List

A glorified TODO list

## What is the structure

This is an overly complex TODO list with a client communicating with a server via REST, which in turn sets/reads data from a MongoDB database.

It was written with the purpose of learning to set up a MERE application, and teaching testing, redux-saga and redux optimisation.

## How to run it

You need to have Docker and Docker Compose installed on your machine.

Once you do, just run `npm start` from the root of the project.

It will spin up 4 containers:

1. A React client
2. A Node/Express server
3. A MongoDB database
4. A Swagger documentation 

The client can be accessed at `http://localhost:3001/`, and the server endpoints are available at `http://localhost:7000/`
