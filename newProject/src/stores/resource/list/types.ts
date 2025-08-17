import { Status } from '@/core/enums/status.enum';

export type ListResourceStoreType = {
  size: number;
  participantIds: number[];
  statuses: Status[];
  selectedId: number | null;
  urlTitle: string;
  flagIds: number[];
  updateFlagIds: (ids: number[]) => void;
  updateSelectedId: (index: number | null) => void;
  updateSize: (size: number) => void;
  updateParticipantIds: (ids: number[]) => void;
  updateStatuses: (statuses: Status[]) => void;
  updateUrlTitle: (title: string) => void;
};
