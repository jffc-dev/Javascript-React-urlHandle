'use client';

import { useEffect, useState } from 'react';
import { Table, Checkbox, Button } from '@mantine/core';
import { IconEdit, IconWorldWww } from '@tabler/icons-react';

interface DataProps {
  id: number;
  title?: string;
  url?: string;
}

interface StringTableProps {
  data: DataProps[]
  currentIndex: number;
}

export const StringTable = ({data, currentIndex}: StringTableProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  useEffect(() => {
    const currentResource = data[currentIndex - 1];
    setSelectedRows(currentResource ? [currentResource.id] : [])
  }, [currentIndex, data])
  

  const rows = data.map((element) => (
    <Table.Tr
      key={element.id}
      bg={selectedRows.includes(element.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          disabled
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
  );
}
