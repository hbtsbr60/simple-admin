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

export const GET_ME = gql`
  query GetMe {
    me {
      success
      message
      code
      user {
        id
        firstName
        lastName
        picture {
          url
          thumbnail
        }
        roles {
          id
          name
        }
      }
    }
  }
`;
