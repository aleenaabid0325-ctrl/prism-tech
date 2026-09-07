'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import type { GadgetType } from '@/lib/products'

type Props = {
  type: GadgetType
  color?: string
  accent?: string
  spin?: boolean
}

export function GadgetModel({ type, color = '#3b6fe0', accent = '#8b5cf6', spin = true }: Props) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (spin && group.current) {
      group.current.rotation.y += delta * 0.35
    }
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
    }
  })

  return (
    <group ref={group} dispose={null}>
      {type === 'headphones' && <Headphones color={color} accent={accent} />}
      {type === 'earbuds' && <Earbuds color={color} accent={accent} />}
      {type === 'watch' && <Watch color={color} accent={accent} />}
      {type === 'phone' && <Phone color={color} accent={accent} />}
      {type === 'speaker' && <Speaker color={color} accent={accent} />}
      {type === 'console' && <Console color={color} accent={accent} />}
    </group>
  )
}

const metal = (color: string) => ({
  color,
  metalness: 0.85,
  roughness: 0.25,
})

const gloss = (color: string) => ({
  color,
  metalness: 0.4,
  roughness: 0.15,
})

function Headphones({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={1.15}>
      {/* Headband */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.35, 0.12, 24, 60, Math.PI]} />
        <meshStandardMaterial {...metal(color)} />
      </mesh>
      {/* Earcups */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.35, -0.35, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.62, 0.5, 48]} />
            <meshStandardMaterial {...metal(color)} />
          </mesh>
          <mesh position={[side * 0.27, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.08, 48]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} roughness={0.3} />
          </mesh>
          {/* cushion */}
          <mesh position={[-side * 0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.58, 0.5, 0.22, 48]} />
            <meshStandardMaterial color="#12151f" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Earbuds({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={1.4}>
      {[-0.55, 0.55].map((x, i) => (
        <group key={i} position={[x, i === 0 ? 0.2 : -0.2, 0]} rotation={[0, 0, i === 0 ? 0.3 : -0.3]}>
          {/* body */}
          <mesh>
            <sphereGeometry args={[0.4, 40, 40]} />
            <meshStandardMaterial {...gloss(color)} />
          </mesh>
          {/* stem */}
          <mesh position={[0, -0.55, 0]}>
            <capsuleGeometry args={[0.13, 0.7, 8, 24]} />
            <meshStandardMaterial {...gloss(color)} />
          </mesh>
          {/* tip */}
          <mesh position={[0.28, 0.12, 0.1]}>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshStandardMaterial color="#0d0f16" roughness={0.8} />
          </mesh>
          {/* glow ring */}
          <mesh position={[0, -0.85, 0]}>
            <torusGeometry args={[0.13, 0.03, 16, 32]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Watch({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={1.05} rotation={[0.2, 0, 0]}>
      {/* case */}
      <RoundedBox args={[1.5, 1.8, 0.42]} radius={0.32} smoothness={6}>
        <meshStandardMaterial {...metal(color)} />
      </RoundedBox>
      {/* screen */}
      <RoundedBox args={[1.28, 1.58, 0.05]} radius={0.26} smoothness={6} position={[0, 0, 0.22]}>
        <meshStandardMaterial color="#05060f" roughness={0.1} metalness={0.2} />
      </RoundedBox>
      {/* screen glow face */}
      <mesh position={[0, 0.25, 0.25]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} transparent opacity={0.85} />
      </mesh>
      {/* crown */}
      <mesh position={[0.82, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.18, 24]} />
        <meshStandardMaterial {...metal(accent)} />
      </mesh>
      {/* bands */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[0, s * 1.4, -0.05]}>
          <RoundedBox args={[1.15, 1.1, 0.18]} radius={0.12} smoothness={4}>
            <meshStandardMaterial color="#171b28" roughness={0.85} />
          </RoundedBox>
        </mesh>
      ))}
    </group>
  )
}

function Phone({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={0.95} rotation={[0, 0, 0]}>
      {/* body */}
      <RoundedBox args={[1.6, 3.2, 0.28]} radius={0.22} smoothness={8}>
        <meshStandardMaterial {...metal(color)} />
      </RoundedBox>
      {/* screen */}
      <RoundedBox args={[1.44, 3.02, 0.05]} radius={0.18} smoothness={8} position={[0, 0, 0.15]}>
        <meshStandardMaterial color="#05060f" roughness={0.08} metalness={0.3} />
      </RoundedBox>
      {/* wallpaper glow */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[1.36, 2.94]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} transparent opacity={0.5} />
      </mesh>
      {/* camera bump */}
      <group position={[-0.45, 1.05, -0.18]}>
        <RoundedBox args={[0.7, 0.7, 0.12]} radius={0.14} smoothness={6}>
          <meshStandardMaterial color="#0d0f16" roughness={0.4} metalness={0.6} />
        </RoundedBox>
        {[
          [-0.13, 0.13],
          [0.13, 0.13],
          [-0.13, -0.13],
        ].map(([lx, ly], i) => (
          <mesh key={i} position={[lx, ly, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 24]} />
            <meshStandardMaterial color="#02030a" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Speaker({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={1.1}>
      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial {...gloss(color)} />
      </mesh>
      {/* mesh grille band */}
      <mesh>
        <sphereGeometry args={[1.17, 48, 48, 0, Math.PI * 2, Math.PI * 0.28, Math.PI * 0.44]} />
        <meshStandardMaterial color="#0d0f16" roughness={0.95} />
      </mesh>
      {/* glow ring base */}
      <mesh position={[0, -1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.06, 20, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
      </mesh>
      {/* top touch */}
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.05, 40]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Console({ color, accent }: { color: string; accent: string }) {
  return (
    <group scale={0.95} rotation={[0.1, 0, 0]}>
      {/* body */}
      <RoundedBox args={[3.4, 1.7, 0.3]} radius={0.24} smoothness={6}>
        <meshStandardMaterial {...metal(color)} />
      </RoundedBox>
      {/* screen */}
      <RoundedBox args={[1.9, 1.4, 0.05]} radius={0.1} smoothness={6} position={[0, 0, 0.17]}>
        <meshStandardMaterial color="#05060f" roughness={0.08} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.19]}>
        <planeGeometry args={[1.82, 1.32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
      {/* sticks */}
      {[-1.35, 1.35].map((x) => (
        <mesh key={x} position={[x, -0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.26, 0.14, 32]} />
          <meshStandardMaterial color="#0d0f16" roughness={0.6} metalness={0.5} />
        </mesh>
      ))}
      {/* buttons */}
      {[
        [1.35, 0.45],
        [1.6, 0.2],
        [1.1, 0.2],
        [1.35, -0.05],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 20]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}
