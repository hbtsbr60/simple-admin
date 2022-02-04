import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import env from "./env";

export const accessTokenVar = makeVar(null);
export const refreshTokenVar = makeVar(null);

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return !!accessTokenVar();
            },
          },
          accessToken: {
            read() {
              return accessTokenVar();
            },
          },
          refreshToken: {
            read() {
              return refreshTokenVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
