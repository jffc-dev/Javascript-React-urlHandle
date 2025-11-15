import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const QuickAddResourceSchema = z.object({
  urls: z
    .array(z.url('Invalid URL'))
    .min(1, 'At least one URL is required')
    .refine(urls => new Set(urls).size === urls.length, {
      message: 'URLs must be unique',
    }),
});

export type QuickAddResourceDto = z.infer<typeof QuickAddResourceSchema>;

export const QuickAddResourceResolver = zodResolver(QuickAddResourceSchema);
