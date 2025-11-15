import { gql } from '@apollo/client';

export const LIST_FLAGS = gql`
  query LoadTitle($input: LoadTitleInputDto!) {
    loadTitle(input: $input)
  }
`;
