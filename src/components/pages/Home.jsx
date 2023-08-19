import { easeIn, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import tw from "twin.macro";
import computer from '../../assets/computer.png';
import filmGrain from '../../assets/filmgrain.jpg';
import Page2 from "./Page2";

const GradientCover = tw.div`
  h-[100vh] w-full bg-gradient-to-t from-red-200 via-red-900 to-red-900 fixed
`

const Container = tw.div`
  flex flex-col gap-10 items-center justify-start pt-10 md:pt-20 2xl:pt-32 h-full backdrop-sepia-[50%] sepia-[50%]
`

const FilmGrain = tw(motion.img)`
  w-full h-[100vh] absolute mix-blend-screen pointer-events-none object-cover z-40 backdrop-sepia opacity-50
`

const BigTitle = tw.div`
  text-5xl md:text-7xl 2xl:text-8xl font-display text-red-200 font-bold drop-shadow-2xl px-10
`

const Computer = tw(motion.img)`
  sepia container object-contain px-10 origin-[40% 20%] z-20 pointer-events-none max-h-[50vh]
`

const Filler = tw.div`
  absolute -bottom-72 lg:-bottom-10 lg:max-h-60 px-5 py-10 bg-red-200 w-full
`

const FillerContent = tw.div`
   lg:columns-3 gap-20 font-serif text-red-700 text-lg font-bold mx-auto
  [&>p]:mb-5 container
`

const FillerGradientOverlay = tw.div`
  bg-gradient-to-t from-red-200 to-transparent z-10 absolute inset-0
`

const Black = tw(motion.div)`
  absolute inset-0 bg-black z-40
`

export const PAGE_BREAK = 1000

export default function Home(props) {
  const { scrollY } = useScroll()
  const computerScale = useTransform(scrollY, 
    [0, PAGE_BREAK], [1, 10],
  {
    ease: easeIn
  })

  const filterOpacities = useTransform(scrollY,
    [0, PAGE_BREAK / 2, PAGE_BREAK], [0.4, 0.4, 0]
  )

  const fadeToBlack = useTransform(scrollY, 
    [0, PAGE_BREAK / 2, PAGE_BREAK], [0, 0, 1]
  )

  const [computerLoaded, setComputerLoaded] = useState(false)
  const [filmGrainLoaded, setFilmGrainLoaded] = useState(false)
  const containerRef = useRef()

  return (
    <GradientCover>
      <FilmGrain src={filmGrain} onLoad={() => setFilmGrainLoaded(true)} style={{ opacity: filterOpacities}} />
      <Container>
        <BigTitle ref={containerRef}>The only constant is change.</BigTitle>
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
      <Black style={{opacity: fadeToBlack}}>
        <Page2 scrollY={scrollY} />
      </Black>
    </GradientCover>
  )
}
