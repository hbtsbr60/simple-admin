import { gql } from "@apollo/client";

export const AUTH_STATE = gql`
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
        fullName
        picture {
          url
          thumbnail
        }
        roles {
          id
          name
          permissions
        }
      }
    }
  }
`;
