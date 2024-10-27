'use client'

import Image from 'next/image'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import authorImage from '@/public/images/authors/profile.jpg'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Intro() {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-8 py-16 md:flex-row md:items-center">
      <motion.div 
        className="flex-1 md:mt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Hey, I&apos;m Sultan Saleh.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          I&apos;m a web developer with a background in Information Technology. I specialize in React.js, Next.js, API programming, and database management. My passion for technology and cybersecurity, combined with hands-on experience in web and mobile development, allows me to tackle challenging problems and drive innovation.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <a
              href="https://github.com/os-sulX1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <a
              href="https://www.linkedin.com/in/sultano-saleh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <a
              href="mailto:sultanosaleh.97@gmail.com"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <a
              href="tel:+966-582-664-558"
              aria-label="Phone"
            >
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden rounded-full border-4 border-primary">
          <Image
            className="h-64 w-64 object-cover transition-all duration-300 hover:scale-110 md:h-80 md:w-80"
            src={authorImage}
            alt="Sultan Saleh"
            width={320}
            height={320}
            priority
          />
        </div>
      </motion.div>
    </section>
  )
}