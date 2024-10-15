import z, { object } from "zod";

export const subjectScheme = z.object({
  description: z.string(),
  title: z.string(),
  text: z.string(),
});

export type SubjectScheme = z.infer<typeof subjectScheme>;

export const activityScheme = z.object({
  title: z.string(),
  tasks: z.any(),
});

export type ActivityScheme = z.infer<typeof activityScheme>;
