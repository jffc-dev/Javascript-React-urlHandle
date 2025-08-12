import { LIST_FLAGS } from '@/lib/graphql/queries/listFlags';
import { useQuery } from '@apollo/client';
import type { Flag } from '@graphql/generated/graphql';

interface ListFlagsQueryResult {
  listFlags: Flag[];
}

export const useGetFlags = () => {
  const { data, loading } = useQuery<ListFlagsQueryResult>(LIST_FLAGS);

  return {
    data: data?.listFlags || [],
    loading,
  };
};
