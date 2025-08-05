import { GET_RANDOM_RESOURCES } from '@/lib/graphql/queries/listResources';
import { useQuery } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface ListResourcesQueryResult {
  getRandomResources: Resource[];
};

interface ListResourcesInputDto {
  size: number
}

export const useGetRandomResources = (input: ListResourcesInputDto) => {
  const {data, loading} = useQuery<ListResourcesQueryResult, { input: ListResourcesInputDto }>(
    GET_RANDOM_RESOURCES,
    {
      variables: { input },
    }
  );
  return {data: data?.getRandomResources || [], loading};
}
