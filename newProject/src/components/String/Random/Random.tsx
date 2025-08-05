'use client';

import { useState } from 'react';
import { ScrollArea, Container, TextInput, Button, Group, Text } from '@mantine/core';
import { StringTable } from '../StringTable';
import { useGetRandomResources } from '@/hooks/useGetRandomResources';
import { useRandomStore } from '@/stores/random/random.store';
import { useShallow } from 'zustand/shallow';
import { openBlankURL } from '@/lib/utils/functions';

export const Random = () => {
  const [inputSize, setInputSize] = useState(100);
  const [size, setSize] = useState(100);

  const { data, loading } = useGetRandomResources({ size });
  const { updateResources, incrementCurrentIndex, currentIndex, resources, resetCurrentIndex } = useRandomStore(useShallow((state) => ({
    updateResources: state.updateResources,
    resources: state.resources,
    currentIndex: state.currentIndex,
    incrementCurrentIndex: state.incrementCurrentIndex,
    resetCurrentIndex: state.resetCurrentIndex,
  })));

  const handleFetch = () => {
    setSize(inputSize);
    resetCurrentIndex();
  };

  const handleNextLink = () => {
    openBlankURL(data[currentIndex]?.url || '');
    incrementCurrentIndex()
  };

  if(!loading && data) {
    updateResources(data);
  }

  return (
    <Container size="xl" py="md">
      <h2 style={{ marginBottom: '1rem' }}>Mantine Table with Sticky Headers</h2>

      <Group mb="md">
        <TextInput
          type="number"
          value={inputSize}
          onChange={(e) => setInputSize(Number(e.currentTarget.value))}
          placeholder="Enter size"
        />
        <Button onClick={handleFetch}>Fetch</Button>
        <Text>{currentIndex}</Text>
      </Group>
      <Button onClick={handleNextLink} disabled={currentIndex >= resources.length}>Get next link</Button>

      <ScrollArea h="80vh" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <StringTable data={data} loading={loading} />
      </ScrollArea>
    </Container>
  );
};
