import { z } from "zod";
import { schemeEmail } from "../../common/zodScheme";

export const userSchema = z
  .object({
    name: z.string(),
    email: schemeEmail,
    language: z.string(),
    work: z.string(),
    phone: z.string(),
    appearance: z.string(),
    two_auth: z.boolean(),
  })
  .refine((data) => data.two_auth && !data.phone, {
    path: ["phone"],
    message:
      "É necessário passar um número de telefone para fazer a dupla autenticação",
  });

export type UserSchemeType = z.infer<typeof userSchema>;
