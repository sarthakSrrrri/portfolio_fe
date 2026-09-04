import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { FaPaperPlane } from 'react-icons/fa'
import './aiChatWidget.css'

function AiOrb() {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5
    ref.current.rotation.x += delta * 0.15
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={10} color="#22d3ee" />
      <pointLight position={[-2, -1, 1]} intensity={6} color="#60a5fa" />

      <mesh ref={ref}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={2}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>
    </>
  )
}

function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setInput('')
  }

  return (
    <div className={`ai-chat-widget ${open ? 'is-open' : ''}`}>
      <form className="ai-chat-bar" onSubmit={handleSend}>
        <button
          type="button"
          className="ai-chat-orb"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        >
          <Canvas className="ai-orb-canvas" camera={{ position: [0, 0, 2.4], fov: 40 }} gl={{ alpha: true }}>
            <AiOrb />
          </Canvas>
        </button>

        <input
          type="text"
          className="ai-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          tabIndex={open ? 0 : -1}
        />

        <button type="submit" className="ai-chat-send" aria-label="Send message" tabIndex={open ? 0 : -1}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  )
}

export default AiChatWidget
