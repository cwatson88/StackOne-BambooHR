import { z } from 'zod';
import { getEmployees } from '../../utils/BambooHR';

const paramsSchema = z.object({
  id: z.string()
});

export { getEmployees, paramsSchema };
