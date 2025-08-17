import { PillsInputWithCombobox } from '@/components/Common/Form/PillsInputWithCombobox';
import { Status } from '@/core/enums/status.enum';
import { useGetFlags } from '@/hooks/useGetFlags';
import { useGetParticipants } from '@/hooks/useGetParticipants';
import { useListResourcesStore } from '@/stores/resource/list/list.store';
import {
  Checkbox,
  CloseButton,
  Fieldset,
  Group,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { useShallow } from 'zustand/shallow';

export const ListFilter = () => {
  const {
    updateParticipantIds,
    participantIds,
    flagIds,
    updateFlagIds,
    statuses,
    updateStatuses,
    urlTitle,
    updateUrlTitle,
  } = useListResourcesStore(
    useShallow(state => ({
      updateParticipantIds: state.updateParticipantIds,
      updateFlagIds: state.updateFlagIds,
      updateStatuses: state.updateStatuses,
      statuses: state.statuses,
      participantIds: state.participantIds,
      flagIds: state.flagIds,
      urlTitle: state.urlTitle,
      updateUrlTitle: state.updateUrlTitle,
    }))
  );

  const { data: participantsData } = useGetParticipants();
  const { data: flagsData } = useGetFlags();
  const allStatuses = [
    Status.APPROVED,
    Status.PENDING,
    Status.NOT_FOUND,
    Status.DELETED,
    Status.OBSERVED,
  ];

  const selectAllStatuses = () => {
    if (statuses.length === allStatuses.length) {
      updateStatuses([]);
    } else {
      updateStatuses([...allStatuses]);
    }
  };

  return (
    <Fieldset legend="Personal information" mb={6}>
      <PillsInputWithCombobox
        value={participantIds}
        onChange={updateParticipantIds}
        options={participantsData}
        error={undefined}
        label={
          <Text fw={600} fz="sm">
            Participants
          </Text>
        }
        placeholder="Select participants"
      />
      <Group mt={16} justify="space-between">
        <div style={{ flex: 1 }}>
          <PillsInputWithCombobox
            value={statuses.map(s => s.toString())}
            onChange={values => updateStatuses(values.map(v => v as Status))}
            options={[...allStatuses]}
            error={undefined}
            label={
              <Group
                style={{ alignItems: 'center' }}
                w={'100%'}
                justify="space-between"
              >
                <Text fw={600} fz="sm">
                  Statuses
                </Text>
                <Checkbox
                  checked={statuses.length === 5}
                  onChange={() => {
                    selectAllStatuses();
                  }}
                  label="Select all statuses"
                />
              </Group>
            }
            placeholder="Select statuses"
          />
        </div>
        <div style={{ flex: 1 }}>
          <PillsInputWithCombobox
            value={flagIds}
            onChange={updateFlagIds}
            options={flagsData}
            error={undefined}
            label={
              <Text fw={600} fz="sm">
                Flags
              </Text>
            }
            placeholder="Select flags"
          />
        </div>
      </Group>
      <TextInput
        error={undefined}
        label={
          <Text fw={600} fz="sm">
            Title
          </Text>
        }
        placeholder="Title"
        value={urlTitle}
        mt={16}
        onChange={e => updateUrlTitle(e.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => updateUrlTitle('')}
            style={{ display: urlTitle ? undefined : 'none' }}
          />
        }
      />
    </Fieldset>
  );
};
