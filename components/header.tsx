'use client'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-primary/10 via-background to-primary/10 py-6 backdrop-blur-sm">
      <nav className="container flex max-w-3xl items-center justify-between">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold text-primary md:hidden">
            SS
          </Link>
          <Link href="/" className="hidden font-serif text-2xl font-bold text-primary md:block">
            Sultan|DEV
          </Link>
        </div>

        <ul className="flex items-center gap-6 text-sm font-medium sm:gap-8">
          <li>
            <Link href="/posts" className="transition-colors hover:text-primary">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/projects" className="transition-colors hover:text-primary">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}