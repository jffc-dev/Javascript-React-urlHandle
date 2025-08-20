import { useGetResource } from '@/hooks/useGetResource';
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  UpdateResourceDto,
  UpdateResourceResolver,
} from '../resolver/update-resource.zod';
import { IconDeviceFloppy, IconReload, IconSearch } from '@tabler/icons-react';
import { PillsInputWithCombobox } from '../../Form/PillsInputWithCombobox';
import { stopPropagationOnKeyDown } from '@/lib/utils/eventHelpers';
import { useUpdateResource } from '@/hooks/useUpdateResource';
import { useGetParticipants } from '@/hooks/useGetParticipants';
import { statusValues } from '@/helpers/status-mapping';
import { openBlankURL } from '@/lib/utils/functions';
import { useGetFlags } from '@/hooks/useGetFlags';
import { useLoadTitle } from '@/hooks/useLoadTitle';
import { useCreateResource } from '@/hooks/useCreateResource';

interface ModalResourceProps {
  opened: boolean;
  close: () => Promise<void>;
  selectedResourceId: number | null;
}

export const ModalResource = ({
  opened,
  close,
  selectedResourceId,
}: ModalResourceProps) => {
  const { data: resource, loading: getLoading } = useGetResource({
    id: selectedResourceId,
  });

  const { updateResource, loading: updateLoading } = useUpdateResource();
  const { createResource, loading: createLoading } = useCreateResource();
  const { data: participantsData, loading: participantsLoading } =
    useGetParticipants();
  const { data: flagsData, loading: flagsLoading } = useGetFlags();
  const { fetchTitle, loading: loadingTitle } = useLoadTitle();

  const resourceTags = resource?.flags?.map(tag => tag.id) || [];
  const resourceParticipants =
    resource?.participants?.map(participant => participant.id) || [];

  const handleClose = async () => {
    reset();
    await close();
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'all',
    resolver: UpdateResourceResolver,
    values: {
      id: selectedResourceId || 0,
      title: resource?.title || '',
      url: resource?.url || '',
      flagIds: resourceTags || [],
      participantIds: resourceParticipants || [],
      status: resource?.status || '',
    },
  });

  const urlValue = watch('url');

  const onSubmitUpdateResource = async (input: UpdateResourceDto) => {
    try {
      if (input.id === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...createInput } = input;
        await createResource(createInput);
      } else {
        await updateResource(input);
      }
      reset();
      close();
    } catch (err) {
      console.error('Error creating resource:', err);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`${selectedResourceId ? 'Update' : 'Create'} Resource`}
    >
      <LoadingOverlay
        visible={participantsLoading || flagsLoading || loadingTitle}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <form onSubmit={handleSubmit(onSubmitUpdateResource)}>
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
              rightSection={
                <ActionIcon
                  size={32}
                  variant="filled"
                  disabled={!urlValue}
                  onClick={async () => {
                    const { data } = await fetchTitle({ url: urlValue });
                    console.log(data);
                    field.onChange(data.title);
                  }}
                >
                  <IconReload size={18} stroke={1.5} />
                </ActionIcon>
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
              rightSection={
                <ActionIcon
                  size={32}
                  variant="filled"
                  disabled={!urlValue}
                  onClick={() => openBlankURL(field.value)}
                >
                  <IconSearch size={18} stroke={1.5} />
                </ActionIcon>
              }
              placeholder="Url"
              {...field}
            />
          )}
        />
        <Controller
          name="participantIds"
          control={control}
          rules={{
            required: 'At least one participant is required',
            validate: value =>
              value.length >= 2 || 'Select at least 2 participants',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <PillsInputWithCombobox
              value={value}
              onChange={onChange}
              options={participantsData}
              error={error?.message}
              label="Participants"
              placeholder="Select participants"
            />
          )}
        />
        <Controller
          name="flagIds"
          control={control}
          rules={{
            required: 'At least one flag is required',
            validate: value => value.length >= 2 || 'Select at least 2 flags',
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <PillsInputWithCombobox
              value={value}
              onChange={onChange}
              options={flagsData}
              error={error?.message}
              label="Flags"
              placeholder="Select flags"
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Please select a status' }}
          render={({ field }) => (
            <Select
              {...field}
              label="Status"
              placeholder="Select the status"
              data={statusValues}
              error={errors.status?.message}
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
            loading={getLoading || updateLoading || createLoading}
            type="submit"
          >
            {selectedResourceId ? 'Update' : 'Create'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
