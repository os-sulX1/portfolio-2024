'use server'

import type { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import DOMPurify from 'dompurify'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>

const resend = new Resend(process.env.RESEND_API_KEY)

// Use Resend's default sending domain for testing
const FROM_EMAIL = 'onboarding@resend.dev'

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Helmet to set various HTTP headers for security
helmet()

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    // Sanitize inputs to prevent XSS attacks
    const sanitizedEmail = DOMPurify.sanitize(email)
    const sanitizedMessage = DOMPurify.sanitize(message)
    const sanitizedName = DOMPurify.sanitize(name)

    const { data: resendData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ['sultanosaleh.97@gmail.com'], // Your verified email address
      replyTo: sanitizedEmail, // The email address of the person who submitted the form
      subject: 'Contact form submission',
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      react: ContactFormEmail({ name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage })
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { error: error.message || 'Failed to send email' }
    }

    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in sendEmail:', error)
      return { error: 'An unexpected error occurred', details: error.message }
    } 
      console.error('Error in sendEmail:', error)
      return { error: 'An unexpected error occurred' }
    
  }
}

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsletterFormSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.format() }
  }

  try {
    const { email } = result.data
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!audienceId) {
      throw new Error('RESEND_AUDIENCE_ID is not set')
    }

    // Sanitize email to prevent XSS attacks
    const sanitizedEmail = DOMPurify.sanitize(email)

    const { data: resendData, error } = await resend.contacts.create({
      email: sanitizedEmail,
      audienceId
    })

    if (error) {
      console.error('Failed to subscribe:', error)
      return { error: error.message || 'Failed to subscribe' }
    }

    const { error: welcomeEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [sanitizedEmail],
      subject: 'Welcome to our Newsletter!',
      text: `Hello,

Thank you for subscribing to our newsletter! We're excited to have you on board.

Best regards,
The Team`
    })

    if (welcomeEmailError) {
      console.error('Failed to send welcome email:', welcomeEmailError)
      return { error: welcomeEmailError.message || 'Failed to send welcome email' }
    }

    return { success: true, message: 'Subscribed successfully' }
  } catch (error) {
    console.error('Error in subscribe:', error)
    return { error: 'An unexpected error occurred' }
  }
}