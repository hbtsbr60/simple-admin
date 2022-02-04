import { ApolloClient, InMemoryCache } from "@apollo/client";
import env from "./env";

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
