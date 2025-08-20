import { CREATE_RESOURCE } from '@/lib/graphql/queries/createResource';
import { useMutation } from '@apollo/client';
import type { Resource } from '@graphql/generated/graphql';

interface CreateResourceInputDto {
  title: string;
  url: string;
}

interface CreateResourceMutationResult {
  createResource: Resource;
}

export const useCreateResource = () => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateResourceMutationResult,
    { data: CreateResourceInputDto }
  >(CREATE_RESOURCE);

  const createResource = async (data: CreateResourceInputDto) => {
    const result = await mutate({ variables: { data } });
    return result.data?.createResource || null;
  };

  return {
    createResource,
    data: data?.createResource || null,
    loading,
    error,
  };
};
