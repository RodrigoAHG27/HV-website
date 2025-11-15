import { z } from 'zod';

export const leadStep1Schema = z.object({
  name: z.string().min(2, 'Ingrese un nombre válido').max(80, 'Nombre demasiado largo'),
  email: z.string().email('Ingrese un correo válido'),
  phone: z
    .string()
    .min(8, 'Ingrese un teléfono válido')
    .max(20, 'Teléfono demasiado largo')
    .regex(/^(\+503\s?\d{4}-\d{4}|\d{8,15}|\+503\d{8})$/, 'Formato no válido'),
  projectType: z.enum(['residential', 'commercial', 'industrial'], {
    required_error: 'Seleccione un tipo de proyecto',
  }),
  company: z.string().max(0).optional().default(''),
});

export const leadStep2Schema = z.object({
  service: z.enum(
    ['remodel', 'new_build', 'roofing', 'electrical', 'plumbing', 'finishes', 'other'],
    {
      required_error: 'Seleccione un servicio',
    },
  ),
  description: z.string().max(800, 'Máximo 800 caracteres').optional().default(''),
  optIn: z.boolean().default(false),
});

export const leadFormSchema = leadStep1Schema.merge(leadStep2Schema).superRefine((data, ctx) => {
  if (data.company && data.company.trim().length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['company'],
      message: 'Campo inválido',
    });
  }
});

export type LeadStep1 = z.infer<typeof leadStep1Schema>;
export type LeadStep2 = z.infer<typeof leadStep2Schema>;
export type LeadFormValues = z.infer<typeof leadFormSchema>;
