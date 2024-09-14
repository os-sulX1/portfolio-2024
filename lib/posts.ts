import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

// Initialize DOMPurify with JSDOM for server-side usage
const window = new JSDOM('').window
const purify = DOMPurify(window)

export type Post = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const sanitizedSlug = purify.sanitize(slug)
    const filePath = path.join(rootDirectory, `${sanitizedSlug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    const sanitizedContent = purify.sanitize(content)
    return { metadata: { ...data, slug: sanitizedSlug }, content: sanitizedContent }
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return null
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  try {
    const files = fs.readdirSync(rootDirectory)

    const posts = files
      .map(file => getPostMetadata(file))
      .sort((a, b) => {
        if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
          return 1
        }
        return -1
      })

    if (limit) {
      return posts.slice(0, limit)
    }

    return posts
  } catch (error) {
    console.error('Error in getPosts:', error)
    return []
  }
}

export function getPostMetadata(filepath: string): PostMetadata {
  try {
    const sanitizedFilepath = purify.sanitize(filepath)
    const slug = sanitizedFilepath.replace(/\.mdx$/, '')
    const filePath = path.join(rootDirectory, sanitizedFilepath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data } = matter(fileContent)
    return { ...data, slug }
  } catch (error) {
    console.error('Error in getPostMetadata:', error)
    return { slug: '' }
  }
}