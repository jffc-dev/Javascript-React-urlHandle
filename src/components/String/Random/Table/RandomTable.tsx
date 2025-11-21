'use client';

import { useEffect, useState } from 'react';
import { Table, Checkbox, Button, Badge } from '@mantine/core';
import { IconEdit, IconSearch, IconWorldWww } from '@tabler/icons-react';
import { useRandomStore } from '@/stores/resource/random/random.store';
import { useShallow } from 'zustand/shallow';
import { statusColors, statusMapping } from '@/helpers/status-mapping';
import { Resource } from '@/lib/graphql/generated/graphql';
import { openAdvancedGoogleSearch, openBlankURL } from '@/lib/utils/functions';

interface RandomTableProps {
  data: Resource[];
  currentIndex: number;
  open: () => void;
  filterUrlTitle: string;
}

export const RandomTable = ({
  data,
  currentIndex,
  open,
  filterUrlTitle,
}: RandomTableProps) => {
  const { setSelectedResourceId } = useRandomStore(
    useShallow(state => ({
      setSelectedResourceId: state.setSelectedResourceId,
    }))
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  useEffect(() => {
    const currentResource = data[currentIndex - 1];
    setSelectedRows(currentResource ? [currentResource.id] : []);
  }, [currentIndex, data]);

  const rows = data
    .filter(
      item =>
        !filterUrlTitle ||
        item.url.toLowerCase().includes(filterUrlTitle.toLowerCase()) ||
        item.title.toLowerCase().includes(filterUrlTitle.toLowerCase())
    )
    .map(element => (
      <Table.Tr
        key={element.id}
        bg={
          selectedRows.includes(element.id)
            ? 'var(--mantine-color-blue-light)'
            : undefined
        }
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
          <Badge color={statusColors[element.status]}>
            {statusMapping[element.status]}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Button
            size="xs"
            onClick={() => openBlankURL(element.url)}
            p={0}
            mr={2}
          >
            <IconWorldWww />
          </Button>
          <Button
            size="xs"
            onClick={() => openAdvancedGoogleSearch(element.title, element.url)}
            p={0}
            mr={2}
          >
            <IconSearch />
          </Button>
          <Button
            size="xs"
            onClick={() => {
              setSelectedResourceId(element.id);
              open();
            }}
            p={0}
          >
            <IconEdit />
          </Button>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Title / URL</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
