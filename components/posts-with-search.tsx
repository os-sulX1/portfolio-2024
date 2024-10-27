'use client'

import { useState, useEffect, useMemo } from 'react'
import type { PostMetadata } from '@/lib/posts'

import Posts from '@/components/posts'

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  )
}