import { useState } from 'react'
import Hero from './components/Hero'
import Loader from './components/Loader'

function App() {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return <Loader onDone={() => setLoaded(true)} />
  }
  return (
    <>
      <main>
        <Hero />
      </main>
    </>
  )
}

export default App
