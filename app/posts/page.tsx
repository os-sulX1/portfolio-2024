import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Posts',
  description: 'All blog posts',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-4xl'>
      <h1 className="text-4xl font-bold tracking-tight text-primary mb-12">Posts</h1>

        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}