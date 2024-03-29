import { gql } from "@apollo/client";

export const GET_PERMISSION_LIST = gql`
  query GetPermissionList {
    permissions {
      totalCount
      items {
        id
        name
        description
        action
        resource
        createdAt
      }
    }
  }
`;

export default {};
