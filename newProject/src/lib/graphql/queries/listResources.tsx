import { gql } from '@apollo/client';

export const LIST_RESOURCES = gql`
  query ListResources($input: ListResourcesInputDto!) {
    listResources(input: $input) {
      id
      title
      url
      createdAt
      updatedAt
      participants {
        id
        name
      }
    }
  }
`;