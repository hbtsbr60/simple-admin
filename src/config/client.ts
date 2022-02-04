import { ApolloClient, InMemoryCache } from "@apollo/client";
import env from "./env";

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          auth: {
            read(value = null) {
              return value;
            },
          },
        },
      },
    },
  }),
});

export default client;
