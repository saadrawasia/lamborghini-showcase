import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

function App() {
  const snapLockRef = useRef(false)
  const unlockTimeoutRef = useRef(null)
  const [loaderComplete, setLoaderComplete] = useState(false)

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    if (!loaderComplete) return

    const getSections = () =>
      Array.from(document.querySelectorAll('main > section[id]'))

    const getCurrentSectionIndex = (sections) => {
      const viewportMiddle = window.innerHeight / 2
      const containingIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= viewportMiddle && rect.bottom >= viewportMiddle
      })

      if (containingIndex !== -1) return containingIndex

      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section, index) => {
        const distance = Math.abs(section.getBoundingClientRect().top)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      return closestIndex
    }

    const shouldUseNativeScroll = (section, direction) => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const threshold = 8
      const isTallSection = rect.height > viewportHeight + threshold

      if (!isTallSection) return false

      if (direction > 0) {
        return rect.bottom > viewportHeight + threshold
      }

      return rect.top < -threshold
    }

    const unlockSnap = () => {
      snapLockRef.current = false
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current)
        unlockTimeoutRef.current = null
      }
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 8) return

      const sections = getSections()
      if (!sections.length || snapLockRef.current) {
        event.preventDefault()
        return
      }

      const currentIndex = getCurrentSectionIndex(sections)
      const direction = event.deltaY > 0 ? 1 : -1

      if (shouldUseNativeScroll(sections[currentIndex], direction)) {
        return
      }

      const nextIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction),
      )

      if (nextIndex === currentIndex) return

      event.preventDefault()
      snapLockRef.current = true

      sections[nextIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      unlockTimeoutRef.current = window.setTimeout(unlockSnap, 750)
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      unlockSnap()
    }
  }, [loaderComplete])

  return (
    <AnimationProvider>
      <>
        {!loaderComplete && (
          <Loader onComplete={() => setLoaderComplete(true)} />
        )}

        {loaderComplete && (
          <main className='flex flex-col gap-12 md:gap-16 overflow-hidden'>
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
