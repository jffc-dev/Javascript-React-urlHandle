'use client';

import { ScrollArea, Container, Pagination } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ModalResource } from '@/components/Common/Resource/Modal';
import { ListTable } from './Table/ListTable';
import { useListResources } from '@/hooks/useListResources';
import { ListFilter } from './Filter';
import { useListResourcesStore } from '@/stores/resource/list/list.store';
import { useShallow } from 'zustand/shallow';
import { useState } from 'react';

export const List = () => {
  const [page, setPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const { participantIds, statuses, urlTitle, selectedId } =
    useListResourcesStore(
      useShallow(state => ({
        participantIds: state.participantIds,
        statuses: state.statuses,
        urlTitle: state.urlTitle,
        selectedId: state.selectedId,
      }))
    );

  const clodeModal = async () => {
    close();
  };

  const { data: resources } = useListResources({
    limit: 50,
    page: 1,
    participantIds,
    statuses,
    urlTitle,
  });

  return (
    <Container size="xl">
      <ListFilter />
      <ScrollArea
        h="80vh"
        style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
      >
        <ListTable data={resources} open={open} />
      </ScrollArea>

      <ModalResource
        close={clodeModal}
        opened={opened}
        selectedResourceId={selectedId}
      />
      <Pagination total={8} value={page} onChange={setPage} mt="sm" />
    </Container>
  );
};
