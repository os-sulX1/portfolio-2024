'use client'

import type { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ContactFormSchema } from '@/lib/schemas'
import { sendEmail } from '@/lib/actions'
import DOMPurify from 'dompurify'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const sanitizedData = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      message: DOMPurify.sanitize(data.message)
    }

    const result = await sendEmail(sanitizedData)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section className='py-12 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container max-w-2xl'
      >
        <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Get in touch</CardTitle>
            <CardDescription>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(processForm)} noValidate>
              <div className='grid gap-6'>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='Your name'
                    autoComplete='given-name'
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <p className='text-sm text-destructive'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type='email'
                    id='email'
                    autoComplete='email'
                    placeholder='Your email'
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <p className='text-sm text-destructive'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder='Your message'
                    {...register('message')}
                  />
                  {errors.message?.message && (
                    <p className='text-sm text-destructive'>
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='mt-6 w-full'
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className='text-xs text-muted-foreground'>
              By submitting this form, I agree to the{' '}
              <Link href='/privacy' className='font-medium underline underline-offset-4 hover:text-primary'>
                privacy&nbsp;policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}