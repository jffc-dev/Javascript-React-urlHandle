import { LIST_FLAGS } from '@/lib/graphql/queries/loadTitle';
import { useLazyQuery } from '@apollo/client';

interface LoadTitleQueryResult {
  loadTitle: string;
}

interface LoadTitleInputDto {
  url: string;
}

export const useLoadTitle = () => {
  const [fetchTitle, { loading }] = useLazyQuery<
    LoadTitleQueryResult,
    { input: LoadTitleInputDto }
  >(LIST_FLAGS);

  const handleFetchTitle = async (input: LoadTitleInputDto) => {
    const { data, loading } = await fetchTitle({ variables: { input } });
    return {
      data: {
        title: data?.loadTitle || '',
      },
      loading,
    };
  };

  return {
    fetchTitle: handleFetchTitle,
    loading,
  };
};
