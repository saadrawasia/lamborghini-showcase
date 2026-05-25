import gsap from 'gsap'
import Back from './components/Back'
import Hero from './components/Hero'
import Loader from './components/Loader'
import { AnimationProvider } from './context/AnimationContext'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Side from './components/Side'
import Engine from './components/Engine'
import Stats from './components/Stats'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  return (
    <AnimationProvider>
      <main className='my-8 md:my-16 flex flex-col gap-12 md:gap-16 overflow-hidden'>
        {/* <Loader /> */}
        <Hero />
        <Back />
        <Side />
        <Engine />
        <Stats />
        <Footer />
      </main>
    </AnimationProvider>
  )
}

export default App
