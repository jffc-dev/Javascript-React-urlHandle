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

export const GET_RANDOM_RESOURCES = gql`
  query GetRandomResources($input: GetRandomResourceInputDto!) {
    getRandomResources(input: $input) {
        id
        title
        url
        status
        createdAt
        updatedAt
    }
}
`;