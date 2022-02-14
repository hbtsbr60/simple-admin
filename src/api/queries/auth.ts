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
          totalCount
          items {
            id
            name
            permissions {
              id
              action
              resource
            }
          }
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation AdminLogin($input: AdminLoginInput!) {
    loginToAdmin(input: $input) {
      code
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      code
      success
      message
    }
  }
`;
