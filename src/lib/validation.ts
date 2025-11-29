import { z } from 'zod';

export const leadFormSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name').max(120, 'Name too long'),
    email: z.string().email('Enter a valid email').max(254, 'Email is too long'),
    phone: z.string().max(32, 'Phone number is too long').optional().default(''),
    projectType: z.string().min(1, 'Select a project type').max(40, 'Too long'),
    service: z.string().min(1, 'Select a service').max(40, 'Too long'),
    description: z
      .string()
      .min(10, 'Add a brief description')
      .max(5000, 'Maximum 5000 characters'),
    optIn: z.boolean().default(false),
    company: z.string().max(120).optional().default(''),
    source: z.string().max(60).default('mofu-page'),
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
