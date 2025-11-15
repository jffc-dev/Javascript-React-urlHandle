import type { KeyboardEvent } from 'react';

export const stopPropagationOnKeyDown = (e: KeyboardEvent) => {
  e.stopPropagation();
};
