import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const UpdateResourceSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(200),
  url: z.url(),
  flagIds: z.array(z.number()),
  participantIds: z.array(z.number()),
  status: z.string(),
});

export type UpdateResourceDto = z.infer<typeof UpdateResourceSchema>;

export const UpdateResourceResolver = zodResolver(UpdateResourceSchema);
