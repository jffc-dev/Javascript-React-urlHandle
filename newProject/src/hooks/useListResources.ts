import { useQuery } from '@apollo/client';
import { LIST_RESOURCES } from '@graphql/queries/listResources';
import type { Resource } from '@graphql/generated/graphql';

interface ListResourcesQueryResult {
  listResources: Resource[];
}

interface ListResourcesInputDto {
  page?: number;
  limit?: number;
  participantIds?: number[];
  flagIds?: number[];
  statuses?: string[];
  urlTitle?: string;
}

export const useListResources = (input: ListResourcesInputDto) => {
  const { data, loading } = useQuery<
    ListResourcesQueryResult,
    { input: ListResourcesInputDto }
  >(LIST_RESOURCES, {
    variables: { input },
  });

  return {
    data: data?.listResources || [],
    loading,
  };
};
