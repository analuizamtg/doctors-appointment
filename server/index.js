const express = require("express");
const mongoose = require("./models/appointment");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = require("mongoose");
const app = express();

app.use("*", cors());

const appointmentSchema = require("./graphql/schema").appointmentSchema;
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: appointmentSchema,
    graphiql: true
  })
);

db.connect(process.env.MONGODB_URI);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`A GraphQL API running at port ${port}`);
});
