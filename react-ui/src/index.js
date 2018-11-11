import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
