import { gql } from "@apollo/client";

export const GET_ROLE_LIST = gql`
  query GetRoleList {
    roles {
      totalCount
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
