import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .min(2, { message: 'Must be at least 2 characters.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email format.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),
  message: z
    .string()
    .min(1, { message: 'Message is required.' })
    .max(500, { message: 'Message must be less than 500 characters.' })
})

export const NewsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email format.' })
    .max(100, { message: 'Email must be less than 100 characters.' })
})