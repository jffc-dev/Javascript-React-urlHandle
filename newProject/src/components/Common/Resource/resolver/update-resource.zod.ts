import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const UpdateResourceSchema = z.object({
  title: z.string().min(1).max(30),
});

export const UpdateResourceResolver = zodResolver(UpdateResourceSchema);
