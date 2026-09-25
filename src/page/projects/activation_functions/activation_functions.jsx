import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import "./activation_functions.css";

const sigmoid = (z) => 1 / (1 + Math.exp(-z));
const relu = (z) => Math.max(0, z);
const tanhFn = (z) => Math.tanh(z);
const softmax = (logits) => {
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
};

const mapRange = (value, [inMin, inMax], [outMin, outMax]) =>
  outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

const X_DOMAIN = [-6, 6];
const SCENE_X = [-3.4, 3.4];
const SCENE_Y = [-1.8, 1.8];
const SOFTMAX_COLORS = ["#22d3ee", "#a78bfa", "#f472b6"];
const SOFTMAX_X = [-1.7, 0, 1.7];

const ACTIVATIONS = [
  {
    key: "sigmoid",
    label: "Sigmoid",
    accent: "#22d3ee",
    formula: "σ(z) = 1 / (1 + e^(−z))",
    range: "(0, 1)",
    note: "This makes Sigmoid useful for binary classification, where the output can represent the probability of belonging to Class 1. A value close to 0 means low probability, while a value close to 1 means high probability. However, for very large positive or negative values, Sigmoid becomes almost flat, causing very small gradients and making learning slower.",
    fn: sigmoid,
    yDomain: [-0.15, 1.15],
  },
  {
    key: "relu",
    label: "ReLU",
    accent: "#34d399",
    formula: "ReLU(z) = max(0, z)",
    range: "[0, ∞)",
    note: 'ReLU keeps positive values and turns negative values into 0. It is widely used in hidden layers because it is simple and helps neural networks learn complex patterns efficiently. Its downside is that neurons can sometimes get stuck outputting 0 for negative inputs, known as the dying ReLU problem.',
    fn: relu,
    yDomain: [-0.6, 6],
  },
  {
    key: "tanh",
    label: "Tanh",
    accent: "#a78bfa",
    formula: "tanh(z) = (e^z − e^−z) / (e^z + e^−z)",
    range: "(−1, 1)",
    note: "Tanh converts the raw value into a range from -1 to +1. Unlike Sigmoid, it is centered around 0, which can make it useful when negative and positive outputs are meaningful. However, for very large positive or negative values, Tanh becomes almost flat and can suffer from vanishing gradients.",
    fn: tanhFn,
    yDomain: [-1.15, 1.15],
  },
  {
    key: "softmax",
    label: "Softmax",
    accent: "#f472b6",
    formula: "softmax(z)ᵢ = e^zᵢ / Σⱼ e^zⱼ",
    range: "(0, 1), Σ = 1",
    note: "Softmax converts multiple raw scores into a probability distribution across classes. It is commonly used for multi-class classification, where the model needs to choose between several possible classes.",
    isVector: true,
  },
];

function CurveScene({ activation, z }) {
  const markerRef = useRef(null);

  const tubeGeometry = useMemo(() => {
    const samples = 90;
    const points = [];
    for (let i = 0; i <= samples; i++) {
      const x = X_DOMAIN[0] + (i / samples) * (X_DOMAIN[1] - X_DOMAIN[0]);
      const y = activation.fn(x);
      points.push(
        new THREE.Vector3(mapRange(x, X_DOMAIN, SCENE_X), mapRange(y, activation.yDomain, SCENE_Y), 0)
      );
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 120, 0.035, 8, false);
  }, [activation]);

  const markerPos = useMemo(() => {
    const y = activation.fn(z);
    return [mapRange(z, X_DOMAIN, SCENE_X), mapRange(y, activation.yDomain, SCENE_Y), 0];
  }, [activation, z]);

  useFrame(({ clock }) => {
    if (!markerRef.current) return;
    const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
    markerRef.current.scale.setScalar(s);
  });

  return (
    <group>
      <Line points={[[-3.6, 0, 0], [3.6, 0, 0]]} color="#334155" lineWidth={1} />
      <Line points={[[0, -2, 0], [0, 2, 0]]} color="#334155" lineWidth={1} />

      <Line
        points={[[markerPos[0], -2, 0], markerPos]}
        color={activation.accent}
        lineWidth={1}
        dashed
        dashSize={0.08}
        gapSize={0.06}
        transparent
        opacity={0.5}
      />
      <Line
        points={[[-3.6, markerPos[1], 0], markerPos]}
        color={activation.accent}
        lineWidth={1}
        dashed
        dashSize={0.08}
        gapSize={0.06}
        transparent
        opacity={0.5}
      />

      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={activation.accent}
          emissive={activation.accent}
          emissiveIntensity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={markerRef} position={markerPos}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive={activation.accent} emissiveIntensity={2.2} toneMapped={false} />
      </mesh>

      <pointLight position={markerPos} intensity={3} color={activation.accent} distance={2.4} />
    </group>
  );
}

function SoftmaxScene({ logits }) {
  const probs = useMemo(() => softmax(logits), [logits]);
  const inputYs = logits.map((l) => mapRange(l, X_DOMAIN, [-1.4, 2.4]));

  return (
    <group>
      <Line points={SOFTMAX_X.map((x, i) => [x, inputYs[i], 0])} color="#475569" lineWidth={1} transparent opacity={0.5} />
      <Line points={[[-3.6, -2, 0], [3.6, -2, 0]]} color="#334155" lineWidth={1} />

      {SOFTMAX_X.map((x, i) => {
        const barHeight = Math.max(probs[i] * 3.4, 0.05);
        return (
          <group key={i}>
            <mesh position={[x, inputYs[i], 0]}>
              <sphereGeometry args={[0.16, 20, 20]} />
              <meshStandardMaterial color={SOFTMAX_COLORS[i]} emissive={SOFTMAX_COLORS[i]} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>

            <Line
              points={[[x, inputYs[i], 0], [x, -2 + barHeight, 0]]}
              color={SOFTMAX_COLORS[i]}
              lineWidth={1}
              dashed
              dashSize={0.07}
              gapSize={0.05}
              transparent
              opacity={0.45}
            />

            <mesh position={[x, -2 + barHeight / 2, 0]}>
              <boxGeometry args={[0.5, barHeight, 0.5]} />
              <meshStandardMaterial color={SOFTMAX_COLORS[i]} emissive={SOFTMAX_COLORS[i]} emissiveIntensity={0.9} roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ActivationScene({ activation, z, logits }) {
  const glow = activation.accent;
  return (
    <Canvas camera={{ position: [0, 0.8, 6.4], fov: 45 }} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 7, 15]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <pointLight position={[0, 1, 4]} intensity={12} color={glow} />
      <Sparkles count={90} scale={[9, 5, 5]} size={1.6} speed={0.25} color={glow} />

      {activation.isVector ? <SoftmaxScene logits={logits} /> : <CurveScene activation={activation} z={z} />}

      <OrbitControls enableDamping dampingFactor={0.08} enablePan={false} minDistance={3.5} maxDistance={10} target={[0, 0, 0]} />
    </Canvas>
  );
}

function MiniCurve({ activation }) {
  if (activation.isVector) {
    return (
      <svg className="af-mini-chart" viewBox="0 0 90 50" aria-hidden="true">
        {[0.55, 0.3, 0.15].map((h, i) => (
          <rect key={i} x={14 + i * 24} y={50 - h * 40} width="14" height={h * 40} rx="2" fill={SOFTMAX_COLORS[i]} opacity="0.9" />
        ))}
      </svg>
    );
  }

  const path = Array.from({ length: 41 }, (_, i) => {
    const x = -6 + (i / 40) * 12;
    const y = activation.fn(x);
    const px = mapRange(x, X_DOMAIN, [6, 84]);
    const py = mapRange(y, activation.yDomain, [44, 6]);
    return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ");

  return (
    <svg className="af-mini-chart" viewBox="0 0 90 50" aria-hidden="true">
      <line x1="6" y1="44" x2="84" y2="44" className="af-mini-axis" />
      <line x1="45" y1="6" x2="45" y2="44" className="af-mini-axis" />
      <path d={path} fill="none" stroke={activation.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function XorDiagram({ linear = false }) {
  return (
    <div className="af-xor-card">
      <svg viewBox="0 0 120 120" className="af-xor-svg" aria-hidden="true">
        {linear ? (
          <line x1="10" y1="60" x2="110" y2="60" className="af-xor-boundary is-linear" />
        ) : (
          <ellipse cx="60" cy="60" rx="58" ry="32" transform="rotate(45 60 60)" className="af-xor-boundary is-curved" />
        )}
        <circle cx="24" cy="24" r="9" className="af-xor-dot dot-a" />
        <circle cx="96" cy="96" r="9" className="af-xor-dot dot-a" />
        <circle cx="24" cy="96" r="9" className="af-xor-dot dot-b" />
        <circle cx="96" cy="24" r="9" className="af-xor-dot dot-b" />
      </svg>
      <p className="af-xor-caption">
        {linear
          ? "Linear-only network: no matter how you angle a straight line, one of each class always ends up on the same side."
          : "Add a non-linear activation: the boundary can bend, loop around one diagonal, and separate both classes cleanly."}
      </p>
    </div>
  );
}

export default function ActivationFunctionsPage() {
  const [activeKey, setActiveKey] = useState("sigmoid");
  const [z, setZ] = useState(0.5);
  const [logits, setLogits] = useState([1.5, 0.2, -1.1]);

  const active = ACTIVATIONS.find((a) => a.key === activeKey);
  const probs = useMemo(() => softmax(logits), [logits]);

  const updateLogit = (index, value) => {
    setLogits((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  return (
    <main className="af-page">
      <section className="af-hero">
        <p className="af-eyebrow">NEURAL NETWORKS · ACTIVATION FUNCTIONS</p>
        <h1 className="af-title">
          Why do neural networks need
          <br />
          activation functions?
        </h1>
        <p className="af-intro">
          The important part is that activation functions add non linearity. Without them, even if we stack many layers together, the entire network still behaves like one big linear calculation. That means it can only learn simple relationships. With activation functions, the network can learn curves, boundaries, and complex patterns found in real world data.
        </p>
      </section>

      <section className="af-lab">
        <div className="af-tabs">
          {ACTIVATIONS.map((a) => (
            <button
              key={a.key}
              className={`af-tab${a.key === activeKey ? " is-active" : ""}`}
              style={{ "--tab-accent": a.accent }}
              onClick={() => setActiveKey(a.key)}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="af-lab-grid">
          <div className="af-canvas-wrap">
            <ActivationScene activation={active} z={z} logits={logits} />
            <div className="af-hud af-hud-top-left">
              <span className="af-hud-dot" style={{ background: active.accent }} />
              LIVE
            </div>
            <div className="af-hud af-hud-top-right">DRAG TO ORBIT · SCROLL TO ZOOM</div>
          </div>

          <div className="af-panel">
            <p className="af-panel-label" style={{ color: active.accent }}>
              {active.label}
            </p>
            <p className="af-formula">{active.formula}</p>
            <p className="af-range">Range: {active.range}</p>

            {active.isVector ? (
              <div className="af-controls">
                {logits.map((val, i) => (
                  <div className="af-slider-row" key={i}>
                    <label>
                      Logit z<sub>{i + 1}</sub>
                    </label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="0.1"
                      value={val}
                      style={{ "--slider-accent": SOFTMAX_COLORS[i] }}
                      onChange={(e) => updateLogit(i, parseFloat(e.target.value))}
                    />
                    <span className="af-value">{val.toFixed(1)}</span>
                  </div>
                ))}

                <div className="af-softmax-output">
                  {probs.map((p, i) => (
                    <div key={i} className="af-prob-row">
                      <span style={{ color: SOFTMAX_COLORS[i] }}>Class {String.fromCharCode(65 + i)}</span>
                      <span>{(p * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="af-controls">
                <div className="af-slider-row">
                  <label>Raw input z</label>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.05"
                    value={z}
                    style={{ "--slider-accent": active.accent }}
                    onChange={(e) => setZ(parseFloat(e.target.value))}
                  />
                  <span className="af-value">{z.toFixed(2)}</span>
                </div>

                <div className="af-output-readout">
                  <span>f(z) =</span>
                  <span className="af-output-value" style={{ color: active.accent }}>
                    {active.fn(z).toFixed(3)}
                  </span>
                </div>
              </div>
            )}

            <p className="af-note">{active.note}</p>
          </div>
        </div>
      </section>

      <section className="af-cheatsheet">
        <h2 className="af-section-title">Four functions, four personalities</h2>

        <div className="af-cheat-grid">
          {ACTIVATIONS.map((a) => (
            <div key={a.key} className="af-cheat-card" style={{ "--card-accent": a.accent }}>
              <MiniCurve activation={a} />
              <h3>{a.label}</h3>
              <p className="af-cheat-formula">{a.formula}</p>
              <p className="af-cheat-note">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="af-why">
        <h2 className="af-section-title">The real reason it works: non-linearity</h2>
        <p className="af-why-text">
          A neural network without activation functions can only learn simple, straight line relationships. Adding more linear layers doesn't change this , they can still be combined into one linear calculation.

Activation functions add non-linearity. They transform each neuron's output, allowing multiple layers to learn curves, complex patterns, and flexible decision boundaries.

A simple example is XOR: a single linear layer cannot separate its classes, but a neural network with a non-linear activation function can.
        </p>

        <div className="af-xor">
          <XorDiagram linear />
          <XorDiagram />
        </div>
      </section>
    </main>
  );
}
