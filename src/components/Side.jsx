import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const Side = () => {
  useGSAP(() => {
    const paragraphSplit = new SplitText('#side .paragraph', { type: 'lines' })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#side',
        start: 'top bottom',
        snap: 0.5,
      },
    })

    scrollTimeline
      .from('#side h2', {
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
      .from(
        '#side-car-img',
        {
          opacity: 0,
          x: -200,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8',
      )

    return () => {
      paragraphSplit.revert()
    }
  }, [])

  return (
    <section
      id='side'
      className={`flex items-center justify-center overflow-hidden min-h-dvh`}
    >
      <div className='w-full max-w-6xl container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <h2 className='text-3xl md:text-5xl text-center'>
          Precision In <span className='text-orange'>Motion</span>{' '}
        </h2>
        <div className='flex flex-col md:flex-row gap-5 md:gap-16 items-center'>
          <img
            src='images/side.png'
            alt='side-car'
            id='side-car-img'
            className='max-w-xl w-full'
          />
          <div className='text-2xl md:text-4xl flex flex-col gap-5 text-center md:text-left'>
            <p className='paragraph'>
              Forged wheels. Carbon ceramic braking.
              <br /> Grip engineered to translate power into absolute control.
            </p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p className='text-2xl paragraph'>0–100 km/h</p>
                <p className='text-orange/70 paragraph'>3.7 seconds</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-2xl paragraph'>Top Speed</p>
                <p className='text-orange/70 paragraph'>325 KM/H</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Side
