import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_STATE } from "api/queries";
import env from "./env";

const httpLink = createHttpLink({
  uri: env.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers, cache }) => {
  const data = cache.readQuery({
    query: AUTH_STATE,
  });

  const token = data?.auth?.accessToken || "";
  return {
    headers: {
      ...headers,
      authorization: token,
      client_id: env.CLIENT_ID,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
