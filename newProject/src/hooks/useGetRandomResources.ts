import { GET_RANDOM_RESOURCES } from '@/lib/graphql/queries/listResources';
import { useLazyQuery } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface ListResourcesQueryResult {
  getRandomResources: Resource[];
};

interface ListResourcesInputDto {
  size: number
}

export const useGetRandomResources = (input: ListResourcesInputDto) => {
  const [fetchResources, { data, loading }] = useLazyQuery<ListResourcesQueryResult, { input: ListResourcesInputDto }>(
    GET_RANDOM_RESOURCES
  );
  
  const handleFetchResources = () => {
    return fetchResources({ variables: { input } });
  };
  
  return {
    data: data?.getRandomResources || [], 
    loading,
    fetchResources: handleFetchResources
  };
}