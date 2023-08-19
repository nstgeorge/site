/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber'
import { mix, progress, useSpring } from 'framer-motion'
import { degreesToRadians } from 'popmotion'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { theme } from 'twin.macro'
import useWindowDimensions from '../../hooks/utils/useWindowDimensions'

const MOBILE_DISTANCE = 3
const MOBILE_SIZE = 0.5

const DESKTOP_DISTANCE = 7
const DESKTOP_SIZE = 0.8

function Cube({ color=theme`colors.green[400]`, progress, ready }) {
  const ref = useRef()
  const distance = useSpring(0)
  const { width } = useWindowDimensions()
  const [realColor, setColor] = useState("#000")
  
  const yAngle = 90
  const xAngle = degreesToRadians(360) * progress

  const rotator = Math.random()

  useFrame(() => {
    ref.current.rotateY(mix(-0.01, 0.01, rotator))
    ref.current.rotateX(mix(-0.01, 0.01, 1 - rotator))
    ref.current.rotateZ(0.005)
    ref.current.position.setFromSphericalCoords(distance.get(), yAngle, xAngle)
  })

  useEffect(() => {
    if (ready) {
        setColor(color)
        distance.set(width > 768 ? DESKTOP_DISTANCE : MOBILE_DISTANCE)
      } else {
        setColor("#000")
        distance.set(2)
      }
  }, [ready, color, distance, width])

  return (
    <mesh ref={ref}>
      <boxGeometry args={width > 768 ? [DESKTOP_SIZE, DESKTOP_SIZE, DESKTOP_SIZE] : [MOBILE_SIZE, MOBILE_SIZE, MOBILE_SIZE]} />
      <meshBasicMaterial wireframe color={realColor} />
    </mesh>
  )
}

Cube.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  progress: PropTypes.number,
  ready: PropTypes.bool
}

function Scene({ cubes, ready }) {
  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      10,
      0.001,
      0
    )
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  })

  return (
    <>
      {
        [...Array(cubes).keys()].map((index) => (
          <Cube key={index} progress={progress(0, cubes, index)} ready={ready} />
        ))
      }
    </>
  )
}

export default function Cubes({ cubes = 5 }) {
  const canvasRef = useRef()
  const { width } = useWindowDimensions()
  const [ready, setReady] = useState(false)

  // Check when the scale animation is complete, then start the cube animation
  useEffect(() => {
    const observer = new ResizeObserver(mutations => {
      for (const entry of mutations) {
        if (entry.contentBoxSize) {
          if (entry.contentBoxSize[0].inlineSize === width) {
            setReady(true)
          } else {
            setReady(false)
          }
        }
      }
    })
    observer.observe(canvasRef.current)
    return () => {
      observer.disconnect()
    }
  }, [canvasRef, width])
  
  return (
    <Canvas ref={canvasRef}>
      <Scene cubes={cubes} ready={ready} />
    </Canvas>
  )
}

Scene.propTypes = Cubes.propTypes = {
  cubes: PropTypes.number
}

