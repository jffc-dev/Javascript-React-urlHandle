import { gql } from '@apollo/client';

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($data: UpdateResourceInput!) {
    updateResource(data: $data) {
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
