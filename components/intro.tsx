import Image from 'next/image'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import authorImage from '@/public/images/authors/profile.jpg'


export default function Intro() {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Hey, I&apos;m Sultan Saleh.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 text-justify">
          I&apos;m a web developer with a background in Information Technology. I specialize in React.js, Next.js, API programming, and database management. My passion for technology and cybersecurity, combined with hands-on experience in web and mobile development, allows me to tackle challenging problems and drive innovation.
        </p>
        <div className="mt-6 flex gap-6">
          <a
            className="group -m-1 p-1"
            href="https://github.com/os-sulX1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
          </a>
          <a
            className="group -m-1 p-1"
            href="https://www.linkedin.com/in/sultano-saleh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
          </a>
          <a
            className="group -m-1 p-1"
            href="mailto:sultanosaleh.97@gmail.com"
          >
            <Mail className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-600 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
          </a>
          <a
            className="group -m-1 p-1"
            href="tel:+966-582-664-558"
          >
            <Phone className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-600 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
          </a>
        </div>
      </div>
      <div className="relative">
        <Image
          className="rounded-full object-cover md:h-72 w-80 md:w-40 grayscale"
          src={authorImage}
          alt="Sultan Saleh"
          width={200}
          height={200}
          priority
        />
      </div>
    </section>
  )
}