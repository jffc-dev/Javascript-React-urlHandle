'use client';

import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Container, Button } from '@mantine/core';
import { useListResources } from '@/hooks/useListResources';
import { IconEdit, IconWorldWww } from '@tabler/icons-react';


export const String = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { data, loading, error } = useListResources({limit: 100});

  const rows = data?.listResources.map((element) => (
    <Table.Tr
      key={element.id}
      bg={selectedRows.includes(element.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((position) => position !== element.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.title || element.url}</Table.Td>
      <Table.Td>
        <Button size="xs" onClick={() => alert(`Clicked ${element.id}`)} p={0} mr={2}>
          <IconWorldWww/>
        </Button>
        <Button size="xs" onClick={() => alert(`Clicked ${element.id}`)} p={0}>
          <IconEdit/>
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    
    <Container size="xl" py="md">
      <h2 style={{ marginBottom: '1rem' }}>Mantine Table with Sticky Headers</h2>
      
      <ScrollArea h={'80vh'} style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
      </ScrollArea>
    </Container>
  );
}
