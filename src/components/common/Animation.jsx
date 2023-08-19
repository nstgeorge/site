import { motion, stagger, useAnimate } from "framer-motion"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import tw from "twin.macro"

const Container = tw.div``

export const TypeIn = ({ children, trigger }) => {
  const [words, setWords] = useState(children?.trim().split(''))
  const [scope, animate] = useAnimate()
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    setWords(children?.trim().split(''))
  }, [children])

  useEffect(() => {
    if (trigger && !played) {
      console.log(trigger)
      animate("span", {
        opacity: [0, 1]
      }, {
        delay: stagger(0.03),
        onComplete: () => setPlayed(true)
      })
    }
  }, [trigger])

  return (
    <Container ref={scope}>
      {
        words?.map((word, index) => (
          <motion.span initial={{ opacity: 0 }} key={index}>{word}</motion.span>
        ))
      }
    </Container>
  )
}

TypeIn.propTypes = {
  children: PropTypes.string,
  trigger: PropTypes.bool
}