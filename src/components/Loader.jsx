import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'

const Loader = ({ onDone }) => {
  useEffect(() => {
    // setTimeout(() => {
    //   onDone()
    // }, 2000)
  })

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      '.color-logo',
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 2,
        delay: 0.3,
        ease: 'power3.inOut',
      },
    ).to('.logo', {
      scale: 0.8,
      ease: 'power1.inOut',
      onComplete: onDone,
    })
  }, [])
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <div class='relative inline-block w-3xs'>
        <img src='/images/logo.svg' class='w-full grayscale logo' alt='logo' />

        <img
          src='/images/logo.svg'
          class='absolute inset-0 w-full color-logo logo'
          alt='logo color'
        />
      </div>
    </div>
  )
}

export default Loader
