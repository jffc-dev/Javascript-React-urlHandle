import { useGetResource } from '@/hooks/useGetResource';
import { useRandomStore } from '@/stores/random/random.store';
import { Button, Group, Modal, Text, TextInput } from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';
import { UpdateResourceResolver } from '../resolver/update-resource.zod';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { UpdateResourceFormInterface } from '../types/resource';
import { PillsInputWithCombobox } from '../../Form/PillsInputWithCombobox';
import { stopPropagationOnKeyDown } from '@/lib/utils/eventHelpers';

interface ModalResourceProps {
  opened: boolean;
  close: () => void;
}

export const ModalResource = ({ opened, close }: ModalResourceProps) => {
  const availableOptions = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Next.js',
  ];
  const { selectedResourceId } = useRandomStore(
    useShallow(state => ({
      selectedResourceId: state.selectedResourceId,
    }))
  );

  const { data: resource } = useGetResource({
    id: selectedResourceId,
  });
  const resourceTags = resource?.tags?.map(tag => tag.name) || [];
  const resourceParticipants =
    resource?.participants?.map(participant => participant.name) || [];

  const handleClose = () => {
    reset();
    close();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors, isSubmitSuccessful },
  } = useForm({
    mode: 'all',
    resolver: UpdateResourceResolver,
    values: {
      title: resource?.title || '',
      url: resource?.url || '',
      tags: resourceTags || [],
      participants: resourceParticipants || [],
    },
  });

  const onSubmitUpdateResource = async (input: UpdateResourceFormInterface) => {
    console.log(input);
  };

  const debugHandleSubmit = handleSubmit(
    data => {
      console.log('✅ VALIDATION PASSED');
      console.log('📋 Data:', data);
      onSubmitUpdateResource(data);
    },
    errors => {
      console.log('❌ VALIDATION FAILED');
      console.log('🚨 Errors:', errors);
    }
  );

  console.log('Current form state:', {
    isDirty,
    isValid,
    errors,
    isSubmitSuccessful,
    resource: !!resource,
  });

  return (
    <Modal opened={opened} onClose={close} title="Update Resource">
      <form onSubmit={debugHandleSubmit}>
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
        <Controller
          control={control}
          name="url"
          render={({ field }) => (
            <TextInput
              error={errors.url?.message}
              label={
                <Text fw={600} fz="sm" mb={4}>
                  Url
                </Text>
              }
              placeholder="Url"
              {...field}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          rules={{
            required: 'At least one tag is required',
            validate: value => value.length >= 2 || 'Select at least 2 tags',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <PillsInputWithCombobox
              value={value}
              onChange={onChange}
              options={availableOptions}
              error={error?.message}
              label="Technologies"
              placeholder="Select technologies"
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
            loading={false}
            type="submit"
          >
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
