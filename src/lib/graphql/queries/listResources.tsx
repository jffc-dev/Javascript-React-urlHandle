import { gql } from '@apollo/client';

export const LIST_RESOURCES = gql`
  query ListResources($input: ListResourcesInputDto!) {
    listResources(input: $input) {
      id
      title
      url
      status
      createdAt
      updatedAt
      participants {
        id
        name
      }
      flags {
        name
      }
    }
  }
`;

export const GET_RANDOM_RESOURCES = gql`
  query GetRandomResources($input: GetRandomResourceInputDto!) {
    getRandomResources(input: $input) {
      resources {
        id
        title
        url
        status
        createdAt
        updatedAt
      }
      ids
    }
  }
`;

export const GET_RESOURCE = gql`
  query GetRandomResources($input: GetResourceInputDto!) {
    getResource(input: $input) {
      id
      title
      url
      status
      createdAt
      updatedAt
      participants {
        id
        name
        createdAt
        updatedAt
      }
      flags {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
