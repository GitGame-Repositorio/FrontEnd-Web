import { z } from "zod";
import { schemeEmail } from "../../common/zodScheme";

export const userSchema = z.object({
  name: z.string().optional().nullable(),
  email: schemeEmail,
  language: z.string().optional(),
  appearance: z.string().optional(),
  two_auth: z.boolean().optional(),
});

export type UserSchemeType = z.infer<typeof userSchema>;
