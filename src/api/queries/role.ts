import { gql } from "@apollo/client";

export const GET_ROLE_LIST = gql`
  query GetRoleList {
    roles {
      items {
        id
        name
        description
        createdAt
      }
    }
  }
`;

export default {};
