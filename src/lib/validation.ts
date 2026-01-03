import { z } from 'zod';

export const leadFormSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name').max(120, 'Name too long'),
    email: z.string().email('Enter a valid email').max(254, 'Email is too long'),
    phone: z.string().max(32, 'Phone number is too long').optional().default(''),
    inquiry: z.string().min(1, 'Add a brief description').max(5000, 'Maximum 5000 characters'),
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
