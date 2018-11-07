const GraphQLError = require("graphql").GraphQLError;

class ValidationError extends GraphQLError {
  constructor(error) {
    super("The request is invalid.");
    this.message = error.message;
  }
}

module.exports = ValidationError;
