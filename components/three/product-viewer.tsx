'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { GadgetModel } from './gadget-model'
import type { GadgetType } from '@/lib/products'

type Props = {
  type: GadgetType
  color?: string
  accent?: string
  interactive?: boolean
  autoRotate?: boolean
  className?: string
  zoom?: boolean
}

export function ProductViewer({
  type,
  color,
  accent,
  interactive = true,
  autoRotate = true,
  zoom = false,
  className = 'h-full w-full',
}: Props) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[6, 8, 6]} angle={0.3} penumbra={1} intensity={2.4} color="#8ab4ff" />
          <pointLight position={[-6, -3, -4]} intensity={1.6} color="#b98bff" />
          <pointLight position={[0, 2, 6]} intensity={1.2} color="#4ee3ff" />

          <Float speed={interactive ? 1.2 : 1.6} rotationIntensity={0.35} floatIntensity={0.6}>
            <GadgetModel type={type} color={color} accent={accent} spin={!interactive} />
          </Float>

          <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={10} blur={2.6} far={4} color="#0a0c18" />
          <Environment preset="city" />

          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={zoom}
              autoRotate={autoRotate}
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={(Math.PI * 3) / 4}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
