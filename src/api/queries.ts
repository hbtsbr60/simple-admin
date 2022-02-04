import { gql } from "@apollo/client";

export const AUTH = gql`
  query GetAuthState {
    auth @client {
      isLoggedIn
      accessToken
      refreshToken
    }
  }
`;

export const STUB = "";
