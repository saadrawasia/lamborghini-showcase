import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useAnimation } from '../context/AnimationContext'

const Engine = () => {
  const { isComplete, markComplete } = useAnimation()
  const sideComplete = isComplete('side')
  useGSAP(() => {
    if (!sideComplete) return

    const paragraphSplit = new SplitText('#engine .paragraph', {
      type: 'lines',
    })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#engine',
        start: 'top bottom',
        once: true,
        fastScrollEnd: true,
      },
    })

    scrollTimeline
      .from('#engine h2', {
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
        '#engine-car-img',
        {
          opacity: 0,
          y: 200,
          duration: 1,
          ease: 'expo.out',
          onComplete: () => markComplete('engine'),
        },
        'contentReveal',
      )

    return () => {
      paragraphSplit.revert()
    }
  }, [sideComplete])

  return (
    <section
      id='engine'
      className={`flex items-center justify-center overflow-hidden min-h-dvh ${!sideComplete ? 'invisible' : ''}`}
    >
      <div className='w-full max-w-6xl container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <h2 className='text-3xl md:text-5xl text-center'>
          THE HEART OF <span className='text-orange'>THE BULL</span>{' '}
        </h2>
        <div className='flex flex-col md:flex-row gap-5 md:gap-4 items-center text-2xl md:text-4xl'>
          <div className='flex flex-col gap-2 w-full text-center md:text-left'>
            <p className='paragraph'>
              A naturally aspirated V10 delivering pure mechanical emotion.
            </p>
            <p className='text-orange/70 paragraph'>5.2L V10</p>
          </div>
          <img
            src='/images/engine.png'
            alt='engine-car'
            id='engine-car-img'
            className='max-w-xl w-full'
          />
          <div className='flex flex-col gap-2 w-full text-center md:text-left'>
            <p className='paragraph'>
              No filters. No artificial sound. Just engineering at full volume.
            </p>
            <p className='text-orange/70 paragraph'>560 Horsepower</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Engine
