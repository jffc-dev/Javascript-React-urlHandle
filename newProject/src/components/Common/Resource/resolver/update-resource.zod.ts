import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const UpdateResourceSchema = z.object({
  title: z.string().min(1).max(30),
  url: z.url(),
  tags: z.array(z.string()),
  participants: z.array(z.string()),
});

export const UpdateResourceResolver = zodResolver(UpdateResourceSchema);
