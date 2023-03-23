import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useLoader } from 'react-three-fiber'

const Model = (props) => {
  const group = useRef()

  const earthGeometry = new THREE.SphereGeometry(1.9, 64, 64)

  // Load the Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, 'EarthTexture/earth.jpg')

  useFrame(({ clock }) => {
    // Rotate the Earth model over time
    const elapsedTime = clock.getElapsedTime()
    const time = props.time + elapsedTime
    if (clock.running) {
      group.current.rotation.y = time / 2.5 / 8
    }

    if (!clock.running && props.isPlaying) {
      clock.start()
    }

    if (clock.running && !props.isPlaying) {
      props.setTime(time)
      clock.stop()
    }
  })

  return (
    <group ref={group}>
      <mesh
        emissive="red"
        emissiveIntensity={2}
        toneMapped={false}
        color={'#ff0202'}
        geometry={earthGeometry}
      >
        <meshBasicMaterial map={earthTexture} />
      </mesh>
    </group>
  )
}

export default Model
