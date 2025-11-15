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
import ListActions from './Actions/ListActions';

export const List = () => {
  const [page, setPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    participantIds,
    statuses,
    urlTitle,
    selectedId,
    updateSelectedId,
    flagIds,
  } = useListResourcesStore(
    useShallow(state => ({
      participantIds: state.participantIds,
      statuses: state.statuses,
      urlTitle: state.urlTitle,
      selectedId: state.selectedId,
      updateSelectedId: state.updateSelectedId,
      flagIds: state.flagIds,
    }))
  );

  const clodeModal = async () => {
    close();
  };

  const { data: resources } = useListResources({
    limit: 50,
    page: 1,
    participantIds,
    flagIds,
    statuses,
    urlTitle,
  });

  const openNewResourceModal = () => {
    updateSelectedId(null);
    open();
  };

  return (
    <Container size="xl">
      <ListFilter />
      <ListActions openNewResource={openNewResourceModal} />
      <ScrollArea
        h="50vh"
        style={{
          border: '1px solid var(--mantine-color-dark-4)',
          borderRadius: '8px',
        }}
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
