import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const audioRef = useRef()
  const waveCanvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const setupAnalyser = async () => {
    if (!audioRef.current) return null

    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioCtx()
    }

    if (!analyserRef.current) {
      const analyser = audioContextRef.current.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.85
      analyserRef.current = analyser
    }

    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current,
      )
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    return analyserRef.current
  }

  useEffect(() => {
    const canvas = waveCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cssWidth = 90
    const cssHeight = 24

    canvas.width = cssWidth * dpr
    canvas.height = cssHeight * dpr
    canvas.style.width = `${cssWidth}px`
    canvas.style.height = `${cssHeight}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let rafId
    const analyser = analyserRef.current
    const dataArray = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null
    const displayedArray = dataArray
      ? new Float32Array(analyser.frequencyBinCount).fill(128)
      : null
    const smoothFactor = 0.08

    const draw = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      ctx.beginPath()
      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#ffffff'

      if (!analyser || !dataArray) {
        for (let x = 0; x <= cssWidth; x += 1) {
          const y = cssHeight / 2 + Math.sin(x * 0.2) * 2

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.stroke()
        rafId = requestAnimationFrame(draw)
        return
      }

      analyser.getByteTimeDomainData(dataArray)

      for (let i = 0; i < dataArray.length; i += 1) {
        displayedArray[i] += (dataArray[i] - displayedArray[i]) * smoothFactor
        const x = (i / (dataArray.length - 1)) * cssWidth
        const y = (displayedArray[i] / 255) * cssHeight

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
      rafId = requestAnimationFrame(draw)
    }

    if (isPlaying) {
      draw()
    } else {
      ctx.clearRect(0, 0, cssWidth, cssHeight)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      ctx.clearRect(0, 0, cssWidth, cssHeight)
    }
  }, [isPlaying])

  useGSAP(() => {
    const paragraphSplit = new SplitText('.paragraph', { type: 'lines' })

    gsap.from('#header-logo', {
      opacity: 0,
      xPercent: -100,
      duration: 1.8,
      ease: 'expo.out',
    })

    gsap.fromTo(
      '#front-car',
      {
        scale: 1.5,
        duration: 2,
        ease: 'expo.out',
        delay: 0.3,
      },
      {
        scale: 1,
        duration: 1.8,
        ease: 'expo.out',
      },
    )

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    })

    gsap.from('#audio-btn', {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      delay: 1,
      ease: 'expo.out',
    })
  })

  const handleAudio = async () => {
    if (!audioRef.current) return

    if (audioRef.current.paused) {
      await setupAnalyser()
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  return (
    <section
      id='hero'
      className='py-4 md:py-8 bg-linear-to-r from-white from-50%  to-orange to-50%'
    >
      <div className='container flex flex-col justify-center items-center justify-self-center gap-5 md:gap-16'>
        <img src='/images/header-logo.png' alt='header-logo' id='header-logo' />
        <img
          src='/images/full.png'
          alt='front-car'
          className='w-full max-w-2xl'
          id='front-car'
        />
        <div className='flex flex-col items-center gap-3 md:gap-5'>
          <h1 className='text-4xl paragraph'>Naturally Aspirated Chaos</h1>
          <h2 className='text-black/70 text-2xl max-w-3xl text-center paragraph'>
            A machine built before silence took over.
            <br /> Raw V10 power, razor-sharp design, and the unmistakable soul
            of Italian engineering.
          </h2>
          <button
            id='audio-btn'
            className='bg-black text-white px-10 py-4 hover:shadow-lg rounded-2xl active:scale-95 cursor-pointer animate'
            onClick={handleAudio}
          >
            {isPlaying ? (
              <canvas
                ref={waveCanvasRef}
                className='block'
                aria-label='sine wave animation'
              />
            ) : (
              'Hear the Roar'
            )}
          </button>
        </div>
      </div>
      <audio
        src='/audio/gas-lamborghini-gallardo.mp3'
        className='hidden'
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      ></audio>
    </section>
  )
}

export default Hero
