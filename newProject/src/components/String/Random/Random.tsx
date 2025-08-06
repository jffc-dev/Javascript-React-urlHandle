'use client';

import { useState } from 'react';
import { ScrollArea, Container, TextInput, Button, Group, Text } from '@mantine/core';
import { StringTable } from '../StringTable';
import { useGetRandomResources } from '@/hooks/useGetRandomResources';
import { useRandomStore } from '@/stores/random/random.store';
import { useShallow } from 'zustand/shallow';
import { openBlankURL } from '@/lib/utils/functions';
import { useDisclosure } from '@mantine/hooks';
import { ModalResource } from '@/components/Common/Resource/Modal';

export const Random = () => {
  const [inputSize, setInputSize] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  
  const { updateResources, incrementCurrentIndex, currentIndex, resources, resetCurrentIndex, resourceIds, updateResourceIds } = useRandomStore(useShallow((state) => ({
    updateResources: state.updateResources,
    resources: state.resources,
    currentIndex: state.currentIndex,
    incrementCurrentIndex: state.incrementCurrentIndex,
    resetCurrentIndex: state.resetCurrentIndex,
    resourceIds: state.resourceIds,
    updateResourceIds: state.updateResourceIds,
  })));

  const { fetchResources } = useGetRandomResources();

  const handleFetch = async() => {
    const {data} = await fetchResources({ size: Number(inputSize) || 0, initialIds: resourceIds });
    const {resources: apiResources, ids: apiIds} = data
    resetCurrentIndex();
    updateResources(apiResources);
    updateResourceIds(apiIds);
  };

  const handleNextLink = () => {
    openBlankURL(resources[currentIndex]?.url || '');
    incrementCurrentIndex()
  };

  return (
    <Container size="xl" py="md">
      <h2 style={{ marginBottom: '1rem' }}>Mantine Table with Sticky Headers</h2>

      <Group mb="md">
        <TextInput
          type="number"
          value={inputSize}
          onChange={(e) => setInputSize(e.currentTarget.value)}
          placeholder="Enter size"
        />
        <Button onClick={handleFetch}>Fetch</Button>
        <Text>{currentIndex}</Text>
      </Group>
      <Button onClick={handleNextLink} disabled={currentIndex >= resources.length}>Get next link</Button>

      <ScrollArea h="80vh" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <StringTable data={resources} currentIndex={currentIndex} open={open} />
      </ScrollArea>

      <ModalResource close={close} opened={opened}/>
    </Container>
  );
};
