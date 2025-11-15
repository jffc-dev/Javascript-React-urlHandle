import { QuickAddingModal } from '@/components/Common/Resource/QuickAddingModal';
import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClipboardText, IconPlus } from '@tabler/icons-react';
import React from 'react';

interface ListActionsProps {
  openNewResource: () => void;
}

const ListActions = ({ openNewResource }: ListActionsProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group>
      <Button
        disabled={false}
        leftSection={<IconPlus size={16} />}
        onClick={openNewResource}
        type="button"
      >
        New Resource
      </Button>
      <Button
        disabled={false}
        leftSection={<IconClipboardText size={16} />}
        onClick={open}
        type="button"
        variant="outline"
      >
        Quick Add
      </Button>
      <QuickAddingModal opened={opened} close={close} />
    </Group>
  );
};

export default ListActions;
