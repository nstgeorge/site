import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Github, Orbit } from "lucide-react";
import { Fragment, useRef } from "react";
import tw from "twin.macro";
import { modal } from "../../common/transitions";
import { Content, Title1 } from "../common/Typography";

const Body = tw.div`
  mx-auto bg-none md:bg-gradient-to-tr from-gray-800 to-gray-700 my-20 max-w-2xl flex flex-col gap-2
  px-7 md:px-14 py-5
  rounded md:shadow-md
`

const Rule = tw.hr`
  border-gray-600 mt-5
`

const Header = tw.div`
  flex items-center justify-center
  w-full h-40
`

const IconContainer = tw(motion.div)`

`

const HeaderIcon = tw(Orbit)`
  w-20 h-20 p-2 animate-spin [animation-duration: 8s] stroke-gray-400 bg-gray-700 rounded-full overflow-visible
`

const GithubIcon = tw(Github)`
  w-10 h-10 p-2  stroke-gray-400 rounded-full
  hover:bg-gray-700 cursor-pointer transition-colors
`

const GithubLink = tw.a`
  w-min my-5 mx-auto
`

const SelfPromo = tw.span`
  text-gray-500 text-xs text-center
`

const PromoLink = tw.a`
  underline text-gray-500 hover:text-gray-400 transition-colors
`

export default function Home(props) {
  const dragContainerRef = useRef()

  return (
    <Transition
      show={true}
      appear={true}
      {...modal}
      as={Fragment}
    >
      <Body>
        <Header ref={dragContainerRef}>
          <IconContainer drag dragConstraints={dragContainerRef} dragSnapToOrigin={true}>
            <HeaderIcon />
          </IconContainer>
        </Header>
        <Title1 tw='text-center'>Make something cool.</Title1>
        <Rule />
        <Content>Everything looks good on my end...</Content>
        <Content>Check the GitHub below for a list of important libraries and frameworks.</Content>
        <GithubLink href='https://github.com/nstgeorge/react-template' target="_blank">
          <GithubIcon />
        </GithubLink>
        <SelfPromo>Glued together by <PromoLink href="https://natestgeorge.com" target="_blank">Nate St George</PromoLink></SelfPromo>
      </Body>
    </Transition>
  )
}
