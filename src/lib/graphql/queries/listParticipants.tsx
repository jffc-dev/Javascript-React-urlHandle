import { gql } from '@apollo/client';

export const LIST_PARTCIPANTS = gql`
  query ListParticipants($input: ListParticipantInputDto!) {
    listParticipants(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
