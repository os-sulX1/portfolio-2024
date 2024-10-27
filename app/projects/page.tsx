import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-4xl'>
      <h1 className="text-4xl font-bold tracking-tight text-primary mb-12">Projects</h1>

        <Projects projects={projects} />
      </div>
    </section>
  )
}