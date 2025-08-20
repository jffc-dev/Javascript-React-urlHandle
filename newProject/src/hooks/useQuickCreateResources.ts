import { QUICK_CREATE_RESOURCES } from '@/lib/graphql/queries/createResource';
import { useMutation } from '@apollo/client';

interface QuickCreateResourcesInputDto {
  urls: string[];
}

interface QuickCreateResourcesMutationResult {
  quickCreateResources: number;
}

export const useQuickQuickCreateResources = () => {
  const [mutate, { data, loading, error, reset }] = useMutation<
    QuickCreateResourcesMutationResult,
    { data: QuickCreateResourcesInputDto }
  >(QUICK_CREATE_RESOURCES, { errorPolicy: 'all' });

  const quickCreateResources = async (data: QuickCreateResourcesInputDto) => {
    try {
      const result = await mutate({ variables: { data } });

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }

      return result.data?.quickCreateResources || 0;
    } catch (error) {
      throw error;
    }
  };

  const clearError = () => {
    reset();
  };

  return {
    quickCreateResources,
    data: data?.quickCreateResources || null,
    loading,
    error,
    clearError,
  };
};
