import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useAnimation } from '../context/AnimationContext'

const Footer = () => {
  const { isComplete, markComplete } = useAnimation()
  const statsComplete = isComplete('stats')
  useGSAP(() => {
    if (!statsComplete) return

    const paragraphSplit = new SplitText('#footer .paragraph', {
      type: 'lines',
    })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#footer',
        start: 'top bottom',
        once: true,
        fastScrollEnd: true,
      },
    })

    scrollTimeline
      .from('#footer h2', {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .add('contentReveal')
      .from(
        paragraphSplit.lines,
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: 'expo.out',
          stagger: 0.06,
        },
        'contentReveal',
      )
      .from(
        '#footer-logo-img',
        {
          opacity: 0,
          y: 200,
          duration: 1,
          ease: 'expo.out',
          onComplete: () => markComplete('footer'),
        },
        'contentReveal',
      )

    return () => {
      paragraphSplit.revert()
    }
  }, [statsComplete])

  return (
    <section
      id='footer'
      className={`flex items-center justify-center overflow-hidden min-h-dvh ${!statsComplete ? 'invisible' : ''}`}
    >
      <div className='w-full max-w-6xl container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <h2 className='text-3xl md:text-5xl text-center'>
          AN ERA THAT WILL{' '}
          <span className='text-orange'>NEVER RETURN</span>{' '}
        </h2>
        <div className='flex flex-col gap-5 md:gap-16 items-center text-2xl md:text-4xl w-full'>
          <p className='paragraph text-center max-w-2xl'>
            <span className='text-black/70'>
              Before hybrid systems.
              <br /> Before artificial sound.
            </span>
            <br /> There was the raw emotion of a naturally aspirated
            Lamborghini.
          </p>
          <div className='flex flex-col gap-2 items-center'>
            <img
              src='/images/footer-logo.png'
              alt='footer-logo'
              id='footer-logo-img'
              className='max-w-xl w-full'
            />
            <p className='paragraph'>2003 — 2013</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
