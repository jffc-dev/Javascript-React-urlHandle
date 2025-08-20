import { gql } from '@apollo/client';

export const CREATE_RESOURCE = gql`
  mutation CreateResource($data: CreateResourceInput!) {
    createResource(data: $data) {
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

export const QUICK_CREATE_RESOURCES = gql`
  mutation QuickCreateResources($data: QuickCreateResourcesInput!) {
    quickCreateResources(data: $data)
  }
`;
