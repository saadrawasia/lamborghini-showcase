import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useAnimation } from '../context/AnimationContext'

const Loader = ({ onComplete }) => {
  const { markComplete } = useAnimation()
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
    )
      .to('#logo-container', {
        scale: 0.8,
        ease: 'power1.inOut',
      })
      .to('#logo-container', {
        scale: 1.3,
        maskPosition: 'center',
        maskSize: '400%',
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(
        '#loader',
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          onComplete: () => {
            markComplete('loader')
            onComplete?.()
          },
        },
        '-=0.5',
      )
  }, [])
  return (
    <div
      className='w-full h-screen bg-black flex items-center justify-center absolute'
      id='loader'
    >
      <div class='relative inline-block w-3xs' id='logo-container'>
        <img src='images/logo.svg' class='w-full grayscale' alt='logo' />

        <img
          src='images/logo.svg'
          class='absolute inset-0 w-full color-logo'
          alt='logo color'
        />
      </div>
    </div>
  )
}

export default Loader
