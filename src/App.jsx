import gsap from 'gsap'
import { useLayoutEffect, useState } from 'react'
import Back from './components/Back'
import Hero from './components/Hero'
import { AnimationProvider } from './context/AnimationContext'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Side from './components/Side'
import Engine from './components/Engine'
import Stats from './components/Stats'
import Footer from './components/Footer'
import Loader from './components/Loader'

gsap.registerPlugin(ScrollTrigger, SplitText)
ScrollTrigger.defaults({ scroller: 'main' })

function App() {
  const [loaderComplete, setLoaderComplete] = useState(true)

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <AnimationProvider>
      <>
        {!loaderComplete && (
          <Loader onComplete={() => setLoaderComplete(true)} />
        )}

        {loaderComplete && (
          <main className='h-dvh overflow-y-auto overflow-x-hidden snap-y snap-mandatory flex flex-col gap-12 md:gap-16'>
            <Hero />
            <Back />
            <Side />
            <Engine />
            <Stats />
            <Footer />
          </main>
        )}
      </>
    </AnimationProvider>
  )
}

export default App
