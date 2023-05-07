import React, { memo, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const Model = (props) => {
  const earthRef = useRef()
  const cloudRef = useRef()
  const controlRef = useRef()

  const { nodes, materials, animations } = useGLTF('EarthTexture/planet.glb')
  const [Device, setDevice] = useState(30)

  const [position, setPosition] = useState([0, 0, 0])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat1 = position.coords.latitude
      const lon1 = position.coords.longitude
      const radius = 6371
      const lat2 = 0
      const lon2 = 0
      console.log('h', lat1, lon1)

      const dLat = toRad(lat2 - lat1)
      const dLon = toRad(lon2 - lon1)

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      const x = radius * Math.cos(toRad(lat1)) * Math.cos(toRad(lon1))
      const y = radius * Math.sin(toRad(lat1))
      const z = radius * Math.cos(toRad(lat1)) * Math.sin(toRad(lon1))

      setPosition([x, y, z])
    })
  }, [])

  const toRad = (deg) => {
    return (deg * Math.PI) / 180
  }

  useFrame(() => {
    earthRef.current.position.set(...position)
  })

  useFrame(({ clock }) => {
    // Rotate the Earth model over time
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 2.5 / 8
    cloudRef.current.rotation.y = elapsedTime / 3 / 8
  })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} ref={controlRef}>
        <group
          rotation={[Math.PI / 1.75, 0, 0]}
          scale={1 / Device}
          ref={cloudRef}
        >
          <group scale={66.72} ref={earthRef}>
            <mesh geometry={nodes.Earth.geometry} material={materials.Earth} />
          </group>
          <group ref={earthRef} scale={66.82}>
            <mesh
              geometry={nodes.Clouds.geometry}
              material={materials.Clouds}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('EarthTexture/planet.glb')

export default Model
