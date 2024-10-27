import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default async function RecentPosts() {
  const posts = await getPosts(4)

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-8">Recent Posts</h2>
        <Posts posts={posts} />

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/posts" className="inline-flex items-center gap-2">
              <span>All posts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}