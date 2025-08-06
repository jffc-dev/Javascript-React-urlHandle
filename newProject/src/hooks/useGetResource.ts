import { GET_RESOURCE } from '@/lib/graphql/queries/listResources';
import { useQuery } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface ListResourcesQueryResult {
  getResource: Resource;
};

interface ResourceInputDto {
  id: number | null;
}

export const useGetResource = (input: ResourceInputDto) => {
  const {data, loading} = useQuery<ListResourcesQueryResult, { input: ResourceInputDto }>(
    GET_RESOURCE,
    {
      variables: { input },
      skip: !input.id,
    }
  );

  return {
    data: data?.getResource || null,
    loading,
  }
}
