import { GET_RANDOM_RESOURCES } from '@/lib/graphql/queries/listResources';
import { useLazyQuery } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface ListResourcesQueryResult {
  getRandomResources: {
    resources: Resource[];
    ids: number[];
  };
}

interface ListResourcesInputDto {
  size: number;
  initialIds?: number[];
}

export const useGetRandomResources = () => {
  const [fetchResources] = useLazyQuery<
    ListResourcesQueryResult,
    { input: ListResourcesInputDto }
  >(GET_RANDOM_RESOURCES);

  const handleFetchResources = async (input: ListResourcesInputDto) => {
    const { data, loading } = await fetchResources({ variables: { input } });
    return {
      data: {
        resources: data?.getRandomResources.resources || [],
        ids: data?.getRandomResources.ids || [],
      },
      loading,
    };
  };

  return {
    fetchResources: handleFetchResources,
  };
};
