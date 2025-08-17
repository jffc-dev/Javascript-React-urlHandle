'use client';

import { Table, Checkbox, Button, Badge } from '@mantine/core';
import { IconEdit, IconWorldWww } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { statusColors, statusMapping } from '@/helpers/status-mapping';
import { Resource } from '@/lib/graphql/generated/graphql';
import { openBlankURL } from '@/lib/utils/functions';
import { useListResourcesStore } from '@/stores/resource/list/list.store';

interface ListTableProps {
  data: Resource[];
  open: () => void;
}

export const ListTable = ({ data, open }: ListTableProps) => {
  const { selectedId, updateSelectedId } = useListResourcesStore(
    useShallow(state => ({
      selectedId: state.selectedId,
      updateSelectedId: state.updateSelectedId,
    }))
  );

  const rows = data.map(element => (
    <Table.Tr
      key={element.id}
      bg={
        selectedId === element.id
          ? 'var(--mantine-color-blue-light)'
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedId === element.id}
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
        {element.flags?.map(flag => (
          <Badge key={flag.name} color="gray" variant="light">
            {flag.name}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td>
        <Button
          size="xs"
          onClick={() => {
            openBlankURL(element.url);
            updateSelectedId(element.id);
          }}
          p={0}
          mr={2}
        >
          <IconWorldWww />
        </Button>
        <Button
          size="xs"
          onClick={() => {
            updateSelectedId(element.id);
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
          <Table.Th>Flags</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
