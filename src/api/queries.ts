import { gql } from "@apollo/client";

export const AUTH = gql`
  query GetAuthTokens @client {
    isLoggedIn
    accessToken
    refreshToken
  }
`;

export const STUB = "";
