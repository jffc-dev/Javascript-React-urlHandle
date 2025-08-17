'use client';

import { useState } from 'react';
import {
  ScrollArea,
  Container,
  TextInput,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { useGetRandomResources } from '@/hooks/useGetRandomResources';
import { useRandomStore } from '@/stores/resource/random/random.store';
import { useShallow } from 'zustand/shallow';
import { openBlankURL } from '@/lib/utils/functions';
import { useDisclosure } from '@mantine/hooks';
import { ModalResource } from '@/components/Common/Resource/Modal';
import { RandomTable } from './Table/RandomTable';

export const Random = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    updateResources,
    incrementCurrentIndex,
    currentIndex,
    resources,
    resetCurrentIndex,
    resourceIds,
    updateResourceIds,
    size,
    updateSize,
    selectedResourceId,
  } = useRandomStore(
    useShallow(state => ({
      updateResources: state.updateResources,
      resources: state.resources,
      currentIndex: state.currentIndex,
      incrementCurrentIndex: state.incrementCurrentIndex,
      resetCurrentIndex: state.resetCurrentIndex,
      resourceIds: state.resourceIds,
      updateResourceIds: state.updateResourceIds,
      size: state.size,
      updateSize: state.updateSize,
      selectedResourceId: state.selectedResourceId,
    }))
  );

  const { fetchResources } = useGetRandomResources();
  const [inputSize, setInputSize] = useState<string>(
    size === 0 ? '' : String(size)
  );

  const handleFetch = async () => {
    let ids: number[] = resourceIds;
    if (Number(inputSize) || 0 === size) {
      ids = [];
      resetCurrentIndex();
    }
    updateSize(Number(inputSize) || 0);
    const { data } = await fetchResources({
      size: Number(inputSize) || 0,
      initialIds: ids,
    });
    const { resources: apiResources, ids: apiIds } = data;
    if (resourceIds.length === 0) {
      resetCurrentIndex();
    }
    updateResources(apiResources);
    updateResourceIds(apiIds);
  };

  const clodeModal = async () => {
    close();
    const { data } = await fetchResources({
      size: Number(inputSize) || 0,
      initialIds: resourceIds,
    });
    const { resources: apiResources, ids: apiIds } = data;
    updateResources(apiResources);
    updateResourceIds(apiIds);
  };

  const handleNextLink = () => {
    openBlankURL(resources[currentIndex]?.url || '');
    incrementCurrentIndex();
  };

  return (
    <Container size="xl">
      <Group mb="md" justify="space-between">
        <Group mb="md">
          <TextInput
            type="number"
            value={inputSize}
            onChange={e => setInputSize(e.currentTarget.value)}
            placeholder="Enter size"
          />
          <Button onClick={handleFetch}>Fetch</Button>
        </Group>
        <Group mb="md">
          <Text>{currentIndex}</Text>
          <Button
            onClick={handleNextLink}
            disabled={currentIndex >= resources.length}
          >
            Get next link
          </Button>
        </Group>
      </Group>

      <ScrollArea
        h="80vh"
        style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
      >
        <RandomTable data={resources} currentIndex={currentIndex} open={open} />
      </ScrollArea>

      <ModalResource
        close={clodeModal}
        opened={opened}
        selectedResourceId={selectedResourceId}
      />
    </Container>
  );
};
