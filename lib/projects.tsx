import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

// Initialize DOMPurify with JSDOM for server-side usage
const window = new JSDOM('').window
const purify = DOMPurify(window)

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const sanitizedSlug = purify.sanitize(slug)
    const filePath = path.join(rootDirectory, `${sanitizedSlug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const sanitizedContent = purify.sanitize(content)
    return { metadata: { ...data, slug: sanitizedSlug }, content: sanitizedContent }
  } catch (error) {
    console.error('Error in getProjectBySlug:', error)
    return null
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  try {
    const files = fs.readdirSync(rootDirectory)

    const projects = files
      .map(file => getProjectMetadata(file))
      .sort((a, b) => {
        if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
          return 1
        }
        return -1
      })

    if (limit) {
      return projects.slice(0, limit)
    }

    return projects
  } catch (error) {
    console.error('Error in getProjects:', error)
    return []
  }
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  try {
    const sanitizedFilepath = purify.sanitize(filepath)
    const slug = sanitizedFilepath.replace(/\.mdx$/, '')
    const filePath = path.join(rootDirectory, sanitizedFilepath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data } = matter(fileContent)
    return { ...data, slug }
  } catch (error) {
    console.error('Error in getProjectMetadata:', error)
    return { slug: '' }
  }
}