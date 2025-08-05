'use client';

import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Container, Button } from '@mantine/core';
import { IconEdit, IconWorldWww } from '@tabler/icons-react';

interface DataProps {
  id: number;
  title?: string;
  url?: string;
}

interface StringTableProps {
  data: DataProps[]
  loading: boolean;
}

export const StringTable = ({data, loading}: StringTableProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rows = data.map((element) => (
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
