'use client'

import Link from 'next/link'
import type { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, index) => (
        <motion.li
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/posts/${post.slug}`} className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}