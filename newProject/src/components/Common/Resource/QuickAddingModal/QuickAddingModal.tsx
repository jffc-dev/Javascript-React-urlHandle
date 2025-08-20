import { Button, Group, Modal, Textarea } from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  QuickAddResourceDto,
  QuickAddResourceResolver,
} from '../resolver/quick-add-resources.zod';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { stopPropagationOnKeyDown } from '@/lib/utils/eventHelpers';
import { useQuickQuickCreateResources } from '@/hooks/useQuickCreateResources';
import { notifications } from '@mantine/notifications';

interface QuickAddingModalProps {
  opened: boolean;
  close: () => void;
}

export const QuickAddingModal = ({ opened, close }: QuickAddingModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'all',
    resolver: QuickAddResourceResolver,
    values: {
      urls: [],
    },
  });
  const {
    quickCreateResources,
    loading: createLoading,
    clearError,
  } = useQuickQuickCreateResources();

  const handleClose = async () => {
    reset();
    close();
  };

  const onSubmitQuickAddResource = async (input: QuickAddResourceDto) => {
    try {
      clearError();
      const response = await quickCreateResources(input);
      console.log(`Successfully created ${response} resources`);

      reset();
      close();
    } catch (err) {
      const { message } = err as Error;
      notifications.show({
        color: 'red',
        title: 'Error',
        message: `Failed to create resources. Please try again. ${message}`,
        icon: <IconX />,
        position: 'top-right',
      });
      console.error('Error creating resources:', err);
    }
  };

  const buildUrlsMessage = (urls: { message: string }[]) => {
    return urls
      .map((url, index) => `${index + 1}° ${url.message}`)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={'Quick Add Resources'}
      size={'xl'}
    >
      <form onSubmit={handleSubmit(onSubmitQuickAddResource)}>
        <Controller
          name="urls"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Enter URLs"
              placeholder="One URL per line"
              rows={10}
              value={field.value.join('\n')}
              error={
                Array.isArray(errors.urls)
                  ? buildUrlsMessage(errors.urls)
                  : errors.urls?.message
              }
              onChange={e => {
                field.onChange(e.currentTarget.value.split('\n'));
              }}
              onPaste={event => {
                const currentValue = field.value.join('\n');
                const pastedData = event.clipboardData?.getData('text') || '';
                const newValue = currentValue + pastedData + '\n';
                field.onChange(newValue.split('\n'));
                event.preventDefault();
              }}
            />
          )}
        />

        <Group justify="end" mt={16}>
          <Button
            onClick={handleClose}
            variant="default"
            onKeyDown={stopPropagationOnKeyDown}
          >
            Cancel
          </Button>
          <Button
            onKeyDown={stopPropagationOnKeyDown}
            disabled={!isDirty || !isValid}
            leftSection={<IconDeviceFloppy size={16} />}
            loading={createLoading}
            type="submit"
          >
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
