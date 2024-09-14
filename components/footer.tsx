import { JSX, SVGProps } from 'react'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const navigation = [
  {
    name: 'GitHub',
    href: 'https://github.com/os-sulX1',
    icon: Github
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sultano-saleh',
    icon: Linkedin
  },
  {
    name: 'Email',
    href: 'mailto:sultanosaleh.97@gmail.com',
    icon: Mail
  },
  {
    name: 'Phone',
    href: 'tel:+966-582-664-558',
    icon: Phone
  }
]

export default function Footer() {
  return (
    <footer className='py-8'>
      <div className='container max-w-3xl'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='flex justify-center space-x-6 md:order-2'>
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group -m-1 p-1'
              >
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300' />
              </a>
            ))}
          </div>
          <div className='mt-8 md:order-1 md:mt-0'>
            <p className='text-center text-xs leading-5 text-muted-foreground'>
              &copy; {new Date().getFullYear()} Sultan Saleh. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}