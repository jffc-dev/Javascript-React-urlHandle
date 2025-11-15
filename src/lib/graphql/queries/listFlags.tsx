import { gql } from '@apollo/client';

export const LIST_FLAGS = gql`
  query ListFlags {
    listFlags {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
