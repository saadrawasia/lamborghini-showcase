import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const Stats = () => {
  useGSAP(() => {
    const paragraphSplit = new SplitText('#stats .paragraph', {
      type: 'lines',
    })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#stats',
        start: 'top bottom',
        snap: 0.5,
      },
    })

    scrollTimeline
      .from('#stats h2', {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .from(
        paragraphSplit.lines,
        {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: 'expo.out',
          stagger: 0.06,
        },
        '-=0.8',
      )

    return () => {
      paragraphSplit.revert()
    }
  }, [])

  return (
    <section
      id='stats'
      className={`flex items-center justify-center overflow-hidden min-h-dvh`}
    >
      <div className='w-full max-w-6xl container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <h2 className='text-3xl md:text-5xl text-center'>
          PERFORMANCE WITHOUT{' '}
          <span className='text-orange'>COMPROMISE</span>{' '}
        </h2>
        <div className='flex flex-col gap-5 md:gap-16 items-center text-2xl md:text-4xl w-full'>
          <p className='paragraph text-center max-w-2xl'>
            The Gallardo balances brutal acceleration with precise handling,
            creating a driving experience that feels alive at every speed.
          </p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-center'>
            <div>
              <p className='paragraph '>Horsepower</p>
              <p className='text-orange/70 paragraph'>560 HP</p>
            </div>
            <div>
              <p className='paragraph '>0–100 km/h</p>
              <p className='text-orange/70 paragraph'>3.7s</p>
            </div>
            <div>
              <p className='paragraph '>Top Speed</p>
              <p className='text-orange/70 paragraph'>325 km/h</p>
            </div>
            <div>
              <p className='paragraph '>Drivetrain</p>
              <p className='text-orange/70 paragraph'>All-Wheel Drive</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
