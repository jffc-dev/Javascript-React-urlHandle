import { useGetResource } from '@/hooks/useGetResource';
import { useRandomStore } from '@/stores/random/random.store';
import { Modal, Text, TextInput } from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';
import { UpdateResourceResolver } from '../resolver/update-resource.zod';

interface ModalResourceProps {
  opened: boolean;
  close: () => void;
}

export const ModalResource = ({ opened, close }: ModalResourceProps) => {
  const { selectedResourceId } = useRandomStore(
    useShallow(state => ({
      selectedResourceId: state.selectedResourceId,
    }))
  );

  const { data: resource, loading } = useGetResource({
    id: selectedResourceId,
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'all',
    resolver: UpdateResourceResolver,
    values: {
      title: resource?.title || '',
    },
  });

  return (
    <Modal opened={opened} onClose={close} title="Update Resource">
      <form>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              error={errors.title?.message}
              label={
                <Text fw={600} fz="sm" mb={4}>
                  Title
                </Text>
              }
              placeholder="Title"
              {...field}
            />
          )}
        />
      </form>
    </Modal>
  );
};
