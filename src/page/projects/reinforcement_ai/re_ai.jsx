import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { FiCpu, FiTarget } from "react-icons/fi";
import "./re_ai.css";

const ACCENT = "#60a5fa";
const ACCENT_SOFT = "#a78bfa";

const STEPS = ["Navigate", "Reach", "Grasp", "Place"];

// Dummy waypoints the robot walks through, one per step in STEPS.
const PATH = [
  [0, 0, 0],
  [1.4, 0, 0.6],
  [1.4, 0, -1.2],
  [-1.2, 0, -1.2],
];

const BOT = {
  body: "#fbbf24",
  head: "#38bdf8",
  ear: "#f472b6",
  face: "#111827",
  eye: "#4ade80",
  mouth: "#fb7185",
  antennaStick: "#e2e8f0",
  antennaBall: "#facc15",
  armLeft: "#34d399",
  armRight: "#fb923c",
  hand: "#f8fafc",
  feet: "#a78bfa",
  chestLight: "#4ade80",
};

const STATUS = {
  idle: { label: "IDLE", color: "#94a3b8" },
  planning: { label: "PLANNING", color: ACCENT_SOFT },
  ready: { label: "READY", color: ACCENT },
};

function RobotBuddy({ target = PATH[0] }) {
  const group = useRef(null);
  const rightArm = useRef(null);
  const antennaBall = useRef(null);
  const leftEye = useRef(null);
  const rightEye = useRef(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      const pos = group.current.position;
      pos.x += (target[0] - pos.x) * Math.min(delta * 2, 1);
      pos.z += (target[2] - pos.z) * Math.min(delta * 2, 1);
      pos.y = Math.abs(Math.sin(t * 2)) * 0.07;

      const dx = target[0] - pos.x;
      const dz = target[2] - pos.z;
      if (Math.hypot(dx, dz) > 0.05) {
        group.current.rotation.y = Math.atan2(dx, dz);
      }
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.6 + Math.sin(t * 3) * 0.5;
    }
    if (antennaBall.current) {
      antennaBall.current.position.y = 1.64 + Math.sin(t * 5) * 0.03;
    }

    const blink = Math.sin(t * 1.3) > 0.97 ? 0.1 : 1;
    if (leftEye.current) leftEye.current.scale.y = blink;
    if (rightEye.current) rightEye.current.scale.y = blink;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.62, 0.62, 0.5]} />
        <meshStandardMaterial color={BOT.body} metalness={0.05} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.55, 0.26]}>
        <boxGeometry args={[0.16, 0.16, 0.02]} />
        <meshStandardMaterial
          color={BOT.chestLight}
          emissive={BOT.chestLight}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.11, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={BOT.head} metalness={0.05} roughness={0.5} />
      </mesh>

      {/* Ear pods */}
      {[-1, 1].map((side) => (
        <mesh key={`ear-${side}`} position={[0.29 * side, 1.11, 0]}>
          <boxGeometry args={[0.08, 0.16, 0.16]} />
          <meshStandardMaterial color={BOT.ear} metalness={0.05} roughness={0.5} />
        </mesh>
      ))}

      {/* Face plate */}
      <mesh position={[0, 1.14, 0.26]}>
        <boxGeometry args={[0.4, 0.26, 0.04]} />
        <meshStandardMaterial color={BOT.face} roughness={0.6} />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEye} position={[-0.1, 1.16, 0.29]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshStandardMaterial color={BOT.eye} emissive={BOT.eye} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh ref={rightEye} position={[0.1, 1.16, 0.29]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshStandardMaterial color={BOT.eye} emissive={BOT.eye} emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.03, 0.29]}>
        <boxGeometry args={[0.22, 0.05, 0.03]} />
        <meshStandardMaterial
          color={BOT.mouth}
          emissive={BOT.mouth}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[0.05, 0.24, 0.05]} />
        <meshStandardMaterial color={BOT.antennaStick} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh ref={antennaBall} position={[0, 1.64, 0]}>
        <boxGeometry args={[0.11, 0.11, 0.11]} />
        <meshStandardMaterial
          color={BOT.antennaBall}
          emissive={BOT.antennaBall}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Left arm, resting */}
      <group position={[-0.4, 0.72, 0]} rotation={[0, 0, 0.5]}>
        <mesh position={[0, -0.17, 0]} castShadow>
          <boxGeometry args={[0.15, 0.34, 0.15]} />
          <meshStandardMaterial color={BOT.armLeft} metalness={0.05} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.17, 0.17, 0.17]} />
          <meshStandardMaterial color={BOT.hand} metalness={0.05} roughness={0.5} />
        </mesh>
      </group>

      {/* Right arm, waving */}
      <group ref={rightArm} position={[0.4, 0.72, 0]}>
        <mesh position={[0, -0.17, 0]} castShadow>
          <boxGeometry args={[0.15, 0.34, 0.15]} />
          <meshStandardMaterial color={BOT.armRight} metalness={0.05} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.17, 0.17, 0.17]} />
          <meshStandardMaterial color={BOT.hand} metalness={0.05} roughness={0.5} />
        </mesh>
      </group>

      {/* Feet */}
      {[-1, 1].map((side) => (
        <mesh key={`foot-${side}`} position={[0.17 * side, 0.09, 0.02]} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.28]} />
          <meshStandardMaterial color={BOT.feet} metalness={0.05} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function SimulationCanvas({ target }) {
  return (
    <Canvas shadows camera={{ position: [4.2, 2.8, 5.6], fov: 48 }} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#160f2e"]} />
      <fog attach="fog" args={["#160f2e", 8, 22]} />

      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 2, -2]} intensity={8} color="#f472b6" />
      <pointLight position={[3, 1.5, 2]} intensity={6} color="#22d3ee" />
      <pointLight position={[0, 3, -3]} intensity={5} color="#fbbf24" />

      <Sparkles count={120} scale={[12, 6, 12]} size={2.5} speed={0.3} color="#a78bfa" />
      <Sparkles count={80} scale={[12, 4, 12]} size={2} speed={0.2} color="#22d3ee" />

      <Grid
        args={[30, 30]}
        cellSize={0.5}
        cellColor="#3730a3"
        sectionSize={2.5}
        sectionColor="#f472b6"
        sectionThickness={1}
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />

      <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={6} blur={2} far={2} />

      <RobotBuddy target={target} />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}

export default function HumanoidRobotPage() {
  const [status, setStatus] = useState("idle");
  const [planned, setPlanned] = useState(false);
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);
  const stepTimerRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearInterval(stepTimerRef.current);
  }, []);

  const handlePlan = () => {
    setStatus("planning");
    setPlanned(true);
    setStep(0);

    clearTimeout(timerRef.current);
    clearInterval(stepTimerRef.current);

    let current = 0;
    stepTimerRef.current = setInterval(() => {
      current += 1;
      if (current >= PATH.length) {
        clearInterval(stepTimerRef.current);
        return;
      }
      setStep(current);
    }, 900);

    timerRef.current = setTimeout(() => setStatus("ready"), PATH.length * 900 + 500);
  };

  return (
    <main className="humanoid-page">
      <div className="humanoid-scene-bg">
        <SimulationCanvas target={PATH[step]} />
        <div className="scene-overlay" />
      </div>

      <div className="hud hud-top-left">
        <span className="hud-dot" />
        LIVE SIMULATION
      </div>

      <div className="hud hud-top-right">DRAG TO ORBIT · SCROLL TO ZOOM</div>

      <div className="hud hud-bottom-left">ENV: WAREHOUSE_01</div>

      <div className="hud hud-bottom-right" style={{ color: STATUS[status].color }}>
        AGENT: {STATUS[status].label}
      </div>

      <div className="humanoid-content">
        <section className="humanoid-hero">
          <p className="humanoid-eyebrow">Agentic AI · Robotics · Reinforcement Learning</p>

          <h1 className="humanoid-title">
           Humanoid Robot Simulation
            <br />
            With <br/>
           Agentic AI & Reinforcement Learning
          </h1>

          <p className="humanoid-description">
            An intelligent humanoid robot simulator where an AI agent understands natural-language
            goals, plans tasks, and orchestrates learned robotic skills through an interactive 3D
            environment.
          </p>
        </section>

        <aside className="agent-panel">
          <div className="panel-header">
            <FiCpu aria-hidden="true" />
            <div>
              <p className="panel-label">Robot Agent</p>
              <h2 className="panel-title">Task Controller</h2>
            </div>
          </div>

          <div className="status-pill">
            <span className="hud-dot" style={{ background: STATUS[status].color }} />
            <span style={{ color: STATUS[status].color }}>{STATUS[status].label}</span>
          </div>

          <label className="task-label">
            <FiTarget aria-hidden="true" /> Give the robot a task
          </label>

          <textarea
            placeholder="Pick up the red box and place it on the table..."
            className="task-input"
          />

          <button className="plan-button" onClick={handlePlan}>
            {status === "planning" ? "Planning..." : "Plan Task"}
          </button>

          <div className="execution-plan">
            <p className="panel-label">Execution Plan</p>

            <div className="skill-list">
              {STEPS.map((skill, index) => (
                <div
                  key={skill}
                  className={`skill${planned ? " skill-active" : ""}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <span className="skill-number">0{index + 1}</span>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
