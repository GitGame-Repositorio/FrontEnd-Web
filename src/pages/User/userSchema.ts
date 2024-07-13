import { z } from "zod";
import { schemeEmail } from "../../common/zodScheme";

export const userSchema = z.object({
  name: z.string().default(""),
  email: schemeEmail,
  language: z.string(),
  work: z.string().default(""),
  appearance: z.string(),
  two_auth: z.boolean(),
});

export type UserSchemeType = z.infer<typeof userSchema>;
