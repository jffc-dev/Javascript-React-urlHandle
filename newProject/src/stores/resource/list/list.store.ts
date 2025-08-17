import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ListResourceStoreType } from './types';

export const useListResourcesStore = create<ListResourceStoreType>()(
  persist(
    set => ({
      participantIds: [],
      size: 0,
      statuses: [],
      selectedId: null,
      urlTitle: '',
      flagIds: [],
      updateUrlTitle: (title: string) => {
        set({ urlTitle: title });
      },
      updateSelectedId: (index: number | null) => {
        set({ selectedId: index });
      },
      updateStatuses: statuses => {
        set(() => ({ statuses }));
      },
      updateSize: (size: number) => {
        set({ size });
      },
      updateParticipantIds: (ids: number[]) => {
        set(() => ({ participantIds: ids }));
      },
      updateFlagIds: (ids: number[]) => {
        set(() => ({ flagIds: ids }));
      },
    }),
    {
      name: 'list-resource-store',
    }
  )
);
