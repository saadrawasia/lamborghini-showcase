import { createContext, useCallback, useContext, useState } from 'react'

const AnimationContext = createContext(null)

export const AnimationProvider = ({ children }) => {
  const [completed, setCompleted] = useState(new Set())

  const markComplete = useCallback((name) => {
    setCompleted((prev) => new Set([...prev, name]))
  }, [])

  const isComplete = useCallback((name) => completed.has(name), [completed])

  return (
    <AnimationContext.Provider value={{ markComplete, isComplete }}>
      {children}
    </AnimationContext.Provider>
  )
}

export const useAnimation = () => useContext(AnimationContext)
