# Doctor's appointment app

This is an app for managing medical appointments.

### Prerequisites

To get the project up and running you need to have `node` and `npm` installed on your machine.

## Run locally

### Run the API Server

Set environment variable `MONGODB_URI` before starting in order to connect to a local instance of MongoDB.

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server.

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

## Built With

- [Create-react-app](https://github.com/facebookincubator/create-react-app) to start a React project.
- [NodeJS](https://nodejs.org/en/) to build the server API.
- [GraphQL](https://graphql.org/) as query language for the API.
- [MongoDB](https://www.mongodb.com/) to store appointments' data.
- [Styled Components](https://www.styled-components.com/) to style React components.

## Author

- **Ana Luiza Motta Gomes** - [analuizamtg](https://github.com/analuizamtg)
