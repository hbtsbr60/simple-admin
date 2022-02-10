import { gql } from "@apollo/client";

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
