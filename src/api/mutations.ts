import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation AdminLogin($input: AdminLoginInput!) {
    loginAsAdmin(input: $input) {
      code
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const STUB = "";
