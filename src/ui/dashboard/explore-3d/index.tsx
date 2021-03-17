import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import type { Mesh } from 'three'

export const Box: React.FC<any> = (props) => {
  // This reference will give us direct access to the mesh
  // Set type to any, as we don't know the type..
  const mesh = useRef<Mesh>()

  // Set up state for the hovered and active state
  const [ hovered, setHover ] = useState(false)
  const [ active, setActive ] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export const Explore3D: React.FC<any> = () => {
  return (
    <div className='explore-3d'>
      <div className='explore-3d--outer'>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </div>
  )
}

export default Explore3D