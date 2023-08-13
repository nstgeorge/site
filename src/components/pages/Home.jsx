import { easeIn, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import tw from "twin.macro";
import computer from '../../assets/computer.png';
import filmGrain from '../../assets/filmgrain.jpg';

const GradientCover = tw.div`
  h-[100vh] w-full bg-gradient-to-t from-red-200 via-red-900 to-red-900 fixed
  sepia-[50%]
`

const Container = tw.div`
  flex flex-col gap-10 items-center justify-between pt-20 h-full
`

const FilmGrain = tw(motion.img)`
  w-full h-[100vh] absolute mix-blend-screen pointer-events-none object-cover z-40 backdrop-sepia opacity-50
`

const BigTitle = tw.div`
  text-7xl sm:text-8xl xl:text-9xl font-display text-red-200 font-bold drop-shadow-2xl px-10
`

const Computer = tw(motion.img)`
  sepia container object-contain px-10 origin-[38% 22%] z-20
`

const Filler = tw.div`
  relative lg:max-h-60 px-5 py-10 bg-red-200 w-full translate-y-40 lg:translate-y-10
`

const FillerContent = tw.div`
   lg:columns-3 gap-20 font-serif text-red-700 text-lg font-bold mx-auto
  [&>p]:mb-5 container
`

const FillerGradientOverlay = tw.div`
  bg-gradient-to-t from-red-200 to-transparent z-10 absolute inset-0
`

const Filters = tw(motion.div)`
  absolute inset-0 backdrop-blur-sm sepia-[30%] opacity-30
`

const Black = tw(motion.div)`
  absolute inset-0 bg-black z-40 pointer-events-none
`

export default function Home(props) {
  const { scrollY } = useScroll()
  const computerScale = useTransform(scrollY, 
    [0, 1000], [1, 10],
  {
    ease: easeIn
  })

  const filterOpacities = useTransform(scrollY,
    [0, 500, 1000], [0.4, 0.4, 0]
  )

  const fadeToBlack = useTransform(scrollY, 
    [0, 500, 1000], [0, 0, 1]
  )

  const [computerLoaded, setComputerLoaded] = useState(false)
  const [filmGrainLoaded, setFilmGrainLoaded] = useState(false)
  const containerRef = useRef()

  return (
    <GradientCover>
      <Black style={{opacity: fadeToBlack}} />
      <FilmGrain src={filmGrain} onLoad={() => setFilmGrainLoaded(true)} style={{ opacity: filterOpacities}} />
      <Container>
        <BigTitle ref={containerRef}>The next giant leap is here...</BigTitle>
        <Computer 
          src={computer}
          onLoad={() => setComputerLoaded(true)}
          style={{ scale: computerScale }} 
        />
        <Filler>
          <FillerContent>
            <p>Since the dawn of humanity, we have engaged in a constant struggle to outsmart our environment. From fire to the wheel to spaceflight, our drive to innovate is insatiable.</p>
            <p>In this spirit, we spent over 5 years working on the latest innovation in cyberspace. We are proud to present the Computer&trade;.</p>
            <p>With 1MB of RAM and a 5MB HDD, the new Computer&trade; features top-of-the-line specifications so you don't have to worry about whether your Computer&trade; can handle your work&mdash;it simply will.</p>
            <p>The Computer&trade; comes in a beautiful shade of beige that will complement any office or home. That's <span tw="text-black">The Computer Difference&reg;</span>.</p>
            <FillerGradientOverlay />
          </FillerContent>
        </Filler>
      </Container>
      <Filters style={{ opacity: filterOpacities}} />
    </GradientCover>
  )
}
