import { Status } from '@/core/enums/status.enum';

export const statusValues = [
  { value: Status.APPROVED, label: 'Approved' },
  { value: Status.PENDING, label: 'Pending' },
  { value: Status.NOT_FOUND, label: 'Not Found' },
  { value: Status.DELETED, label: 'Deleted' },
];

export const statusMapping: Record<Status, string> = {
  [Status.APPROVED]: 'Approved',
  [Status.PENDING]: 'Pending',
  [Status.NOT_FOUND]: 'Not Found',
  [Status.DELETED]: 'Deleted',
};

export const statusColors: Record<Status, string> = {
  [Status.APPROVED]: 'green',
  [Status.PENDING]: 'yellow',
  [Status.NOT_FOUND]: 'red',
  [Status.DELETED]: 'gray',
};
