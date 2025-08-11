import { UPDATE_RESOURCE } from '@/lib/graphql/queries/updateResource';
import { useMutation } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface UpdateResourceInputDto {
  title: string;
  url: string;
}

interface UpdateResourceMutationResult {
  updateResource: Resource;
}

export const useUpdateResource = () => {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateResourceMutationResult,
    { data: UpdateResourceInputDto }
  >(UPDATE_RESOURCE);

  const updateResource = async (data: UpdateResourceInputDto) => {
    const result = await mutate({ variables: { data } });
    return result.data?.updateResource || null;
  };

  return {
    updateResource,
    data: data?.updateResource || null,
    loading,
    error,
  };
};
