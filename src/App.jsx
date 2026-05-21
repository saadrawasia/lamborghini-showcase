import gsap from 'gsap'
import Back from './components/Back'
import Hero from './components/Hero'
import Loader from './components/Loader'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  return (
    <>
      <main className='my-8 md:my-16 flex flex-col gap-12 md:gap-16'>
        {/* <Loader /> */}
        <Hero />
        <Back />
      </main>
    </>
  )
}

export default App
