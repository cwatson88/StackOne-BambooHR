import { z } from 'zod';

export const bambooEmployeeSchema = z.object({
  id: z.number(),
  displayName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  workPhone: z.string(),
  mobilePhone: z.string(),
  workEmail: z.string(),
  department: z.string(),
  location: z.string(),
  division: z.string(),
  linkedIn: z.string(),
  instagram: z.string(),
  pronouns: z.null(),
  supervisor: z.string(),
  photoUploaded: z.boolean(),
  photoUrl: z.string(),
  canUploadPhoto: z.number()
});

export const bambooEmployeeDirectorySchema = z.object({
  fields: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string()
    })
  ),
  employees: z.array(bambooEmployeeSchema)
});

export const bambooEmployeeEmploymentSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  date: z.date(),
  employmentStatus: z.string(),
  comment: z.string(),
  terminationReasonId: z.string(),
  terminationTypeId: z.string(),
  terminationRehireId: z.string(),
  terminationRegrettableId: z.string(),
  benetracStatus: z.null(),
  gusto: z.null()
});
