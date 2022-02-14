import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
  query GetUserList {
    users {
      totalCount
      items {
        id
        firstName
        lastName
        username
        email
        createdAt
      }
    }
  }
`;

export default {};
