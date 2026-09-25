import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <Contact />
      </main>
    </>
  )
}
