import React, { memo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
// import { useLoader } from 'react-three-fiber'
import { useAnimations, useGLTF } from '@react-three/drei'

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Selection,
} from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'
import { Cloud } from '@react-three/drei'

const Model = (props) => {
  const group = useRef()
  const earthRef = useRef()
  const cloudRef = useRef()
  const controlRef = useRef()

  // const earthGeometry = new THREE.SphereGeometry(1.9, 64, 64)
  const { nodes, materials, animations } = useGLTF('EarthTexture/planet.glb')

  const { actions } = useAnimations(animations, group)
  const [Device, setDevice] = useState(30)

  // Load the Earth texture
  // const earthTexture = useLoader(THREE.TextureLoader, 'EarthTexture/earth.jpg')

  useFrame(({ clock }) => {
    // Rotate the Earth model over time
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 2.5 / 8
    cloudRef.current.rotation.y = elapsedTime / 3 / 8
  })

  return (
    // <group ref={group}>
    //   <mesh
    //     emissive="red"
    //     emissiveIntensity={2}
    //     toneMapped={false}
    //     color={'#ff0202'}
    //     geometry={nodes.Earth.geometry}
    //     material={materials.Earth}
    //   >
    //     <meshBasicMaterial map={earthTexture} />
    //   </mesh>
    // </group>
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} ref={controlRef}>
        <group
          rotation={[Math.PI / 1.75, 0, 0]}
          scale={1 / Device}
          ref={cloudRef}
        >
          {/* Initial scale96.72 scale */}
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
