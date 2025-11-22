import { z } from 'zod';

const phoneValidation = z
  .string()
  .min(8, 'Enter a valid phone number')
  .max(20, 'Phone number is too long')
  .regex(/^(\+503\s?\d{4}-\d{4}|\d{8,15}|\+503\d{8})$/, 'Invalid format');

export const leadFormSchema = z
  .object({
    firstName: z.string().min(2, 'Enter a first name').max(80, 'Name too long'),
    lastName: z.string().min(2, 'Enter a last name').max(80, 'Name too long'),
    email: z.string().email('Enter a valid email'),
    phone: phoneValidation,
    companyName: z.string().min(2, 'Enter a company name').max(120, 'Company name is too long'),
    companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+'], {
      required_error: 'Select a company size',
    }),
    message: z.string().max(800, 'Maximum 800 characters').optional().default(''),
    projectType: z.enum(['residential', 'commercial', 'industrial']).default('commercial'),
    service: z
      .enum(['remodel', 'new_build', 'roofing', 'electrical', 'plumbing', 'finishes', 'other'])
      .default('other'),
    optIn: z.boolean().default(false),
    company: z.string().max(0).optional().default(''),
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
