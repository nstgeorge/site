import { motion, useTransform } from "framer-motion"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import tw from "twin.macro"
import { TypeIn } from "../common/Animation"
import Cubes from "../common/Cubes"
import { PAGE_BREAK } from "./Home"

const Container = tw(motion.div)`
  h-[100vh] w-[100vw] bg-black flex flex-col items-center py-5 md:py-10 px-10 relative
`

const Title = tw.h1`
  font-citizen font-bold text-4xl lg:text-6xl xl:text-7xl text-white
`

const Subtitle = tw(motion.span)`
  font-citizen font-bold lg:text-xl text-neutral-400
`

const Content = tw(motion.div)`
  font-citizen text-lg lg:text-3xl px-8 md:px-20 lg:px-48 py-5 container
`

const FlexSpacer = tw.div`grow`

const CubeContainer = tw.div`
  absolute inset-0
`

const containerVariants = {
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 1
    }
  }
}

export default function Page2({ scrollY }) {
  const [animationTrigger, triggerAnimations] = useState(scrollY.get() > PAGE_BREAK)

  const scale = useTransform(scrollY,
    [0, PAGE_BREAK], [0.4, 1]
  )

  useEffect(() => scrollY.onChange((latest) => {
    triggerAnimations(latest > PAGE_BREAK)
  }), [scrollY])

  return (
    <>
      
      <Container style={{ scale }} variants={containerVariants}>
        <CubeContainer>
          <Cubes />
        </CubeContainer>
        <Title><TypeIn trigger={animationTrigger}>Change is why I do what I do.</TypeIn></Title>
        <Subtitle variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }} initial="hide" animate="show">Nice to meet you! I'm <span tw="text-green-400">Nate.</span></Subtitle>
        <FlexSpacer />
        <Content variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }} initial="hide" animate="show">
          I'm a full stack web developer based in Boise with love for UI design, music, and all the ways we tell stories.
        </Content>
      </Container>
    </>
  )
}

Page2.propTypes = {
  scrollY: PropTypes.object
}
