import { LIST_PARTCIPANTS } from '@/lib/graphql/queries/listParticipants';
import { useQuery } from '@apollo/client';
import type { Participant } from '@graphql/generated/graphql';

interface ListParticipantsQueryResult {
  listParticipants: Participant[];
}

export const useGetParticipants = () => {
  const { data, loading } = useQuery<ListParticipantsQueryResult>(
    LIST_PARTCIPANTS,
    { variables: { input: { page: 1, limit: 200 } } }
  );

  return {
    data: data?.listParticipants || [],
    loading,
  };
};
