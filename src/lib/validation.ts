import { z } from 'zod';

export const leadFormSchema = z
  .object({
    name: z.string().min(2, 'Ingresa tu nombre completo').max(120, 'Nombre demasiado largo'),
    email: z.string().email('Ingresa un correo válido').max(254, 'Correo demasiado largo'),
    phone: z.string().max(32, 'Número de teléfono demasiado largo').optional().default(''),
    inquiry: z
      .string()
      .min(1, 'Agrega una breve descripción')
      .max(5000, 'Máximo 5000 caracteres'),
    company: z.string().max(120).optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.company && data.company.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company'],
        message: 'Campo inválido',
      });
    }
  });

export type LeadFormValues = z.infer<typeof leadFormSchema>;
