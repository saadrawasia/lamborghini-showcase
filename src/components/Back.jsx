import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'
import { useAnimation } from '../context/AnimationContext'

const Back = () => {
  const { isComplete, markComplete } = useAnimation()
  const heroComplete = isComplete('hero')
  const isMobile = useMediaQuery({ maxWidth: 767 })
  useGSAP(() => {
    if (!heroComplete) return

    const paragraphSplit = new SplitText('#back .paragraph', { type: 'lines' })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#back',
        start: 'top bottom',
        once: true,
        fastScrollEnd: true,
      },
    })

    scrollTimeline
      .from('#back h2', {
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
        '#back-car-img',
        {
          opacity: 0,
          y: 200,
          x: isMobile ? 0 : 200,
          duration: 1,
          ease: 'expo.out',
          onComplete: () => markComplete('back'),
        },
        'contentReveal',
      )

    return () => {
      paragraphSplit.revert()
    }
  }, [heroComplete])

  return (
    <section
      id='back'
      className={`flex items-center justify-center overflow-hidden min-h-dvh ${!heroComplete ? 'invisible' : ''}`}
    >
      <div className='w-full max-w-6xl container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <h2 className='text-3xl md:text-5xl text-center'>
          LEAVES AN <span className='text-orange'>IMPRESSION</span>{' '}
        </h2>
        <div className='flex flex-col-reverse md:flex-row gap-5 md:gap-16 items-center'>
          <div className='text-2xl md:text-4xl flex flex-col gap-5 text-center md:text-left'>
            <p className='paragraph'>
              Every line is sculpted for speed.
              <br /> Every exhaust note announces its presence long before it
              disappears into the night.
            </p>
            <p className='text-orange/70 paragraph'>
              Designed to be remembered.
            </p>
          </div>
          <img src='images/back.png' alt='back-car' id='back-car-img' />
        </div>
      </div>
    </section>
  )
}

export default Back
