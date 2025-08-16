'use client';

import { ScrollArea, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ModalResource } from '@/components/Common/Resource/Modal';
import { ListTable } from './Table/ListTable';
import { useListResources } from '@/hooks/useListResources';

export const List = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const clodeModal = async () => {
    close();
  };

  const { data: resources, loading } = useListResources({
    limit: 10,
    page: 1,
    participantId: 1,
  });

  return (
    <Container size="xl">
      <ScrollArea
        h="80vh"
        style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
      >
        <ListTable data={resources} currentIndex={0} open={open} />
      </ScrollArea>

      <ModalResource close={clodeModal} opened={opened} />
    </Container>
  );
};
