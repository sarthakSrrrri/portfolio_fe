import { useEffect, useRef, useState } from "react";
import {
  FiUploadCloud,
  FiFile,
  FiX,
  FiCheck,
  FiPlay,
  FiDatabase,
  FiLayers,
  FiCpu,
  FiServer,
} from "react-icons/fi";
import "./ss_vector_db.css";

const EMBEDDING_MODELS = [
  { id: "bge-small", label: "BGE Small", dims: 384 },
  { id: "bge-base", label: "BGE Base", dims: 768 },
  { id: "e5-base", label: "E5 Base", dims: 768 },
  { id: "nomic", label: "Nomic", dims: 768 },
];

const CHUNKING_METHODS = [
  { id: "fixed", label: "Fixed Size" },
  { id: "llamaindex", label: "LlamaIndex" },
  { id: "structured", label: "Structured" },
];

const VECTOR_DATABASES = [
  { id: "milvus", label: "Milvus" },
  { id: "qdrant", label: "Qdrant" },
  { id: "chroma", label: "Chroma" },
];

const PIPELINE_STEPS = [
  "Parsing document",
  "Chunking text",
  "Generating embeddings",
  "Indexing vectors",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".csv", ".txt"];

const TECH_STACK = [
  {
    icon: <FiServer aria-hidden="true" />,
    label: "Backend",
    value: "FastAPI",
    description: "Handles the backend APIs and document processing.",
  },
  {
    icon: <FiCpu aria-hidden="true" />,
    label: "Embedding Models",
    value: "4 available",
    description: "BGE Small, BGE Base, E5 Base, and Nomic.",
  },
  {
    icon: <FiLayers aria-hidden="true" />,
    label: "Chunking Strategies",
    value: "3 available",
    description: "Fixed Size, LlamaIndex, and Structured.",
  },
  {
    icon: <FiDatabase aria-hidden="true" />,
    label: "Vector Store",
    value: "Milvus",
    description: "Used for vector storage and similarity search.",
  },
  {
    icon: <FiFile aria-hidden="true" />,
    label: "Supported Formats",
    value: "PDF · CSV · TXT",
    description: "Documents can be uploaded in these formats.",
  },
];

const SAMPLE_CHUNK_TEXTS = [
  "...structured chunking preserves table boundaries better than fixed-size splits, improving downstream retrieval precision...",
  "...quarterly revenue grew 18% year-over-year, driven primarily by enterprise subscription renewals...",
  "...embedding dimensionality directly impacts index size and query latency across vector stores...",
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAcceptedFile(file) {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function OptionGroup({ icon, label, options, value, onChange }) {
  return (
    <div className="config-group">
      <p className="config-label">
        {icon} {label}
      </p>

      <div className="option-pills">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option-pill${value === option.id ? " option-pill-active" : ""}`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VectorDbPlayground() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [embeddingModel, setEmbeddingModel] = useState(null);
  const [chunkingMethod, setChunkingMethod] = useState(null);
  const [vectorDb, setVectorDb] = useState(null);

  const [status, setStatus] = useState("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(null);

  const timeoutsRef = useRef([]);

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  const acceptFile = (candidate) => {
    if (!candidate) return;
    if (!isAcceptedFile(candidate)) {
      setFileError("Only .pdf, .csv, and .txt files are supported.");
      return;
    }
    setFileError("");
    setFile(candidate);
    setStatus("idle");
    setResult(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const handleInputChange = (event) => {
    acceptFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const removeFile = () => {
    setFile(null);
    setFileError("");
    setStatus("idle");
    setResult(null);
  };

  const canRun = file && embeddingModel && chunkingMethod && vectorDb && status !== "running";

  const runPipeline = () => {
    if (!canRun) return;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setStatus("running");
    setActiveStep(0);
    setResult(null);

    PIPELINE_STEPS.forEach((_, index) => {
      const id = setTimeout(() => setActiveStep(index + 1), (index + 1) * 600);
      timeoutsRef.current.push(id);
    });

    const finalId = setTimeout(() => {
      const model = EMBEDDING_MODELS.find((m) => m.id === embeddingModel);
      const chunks = Math.max(4, Math.round(file.size / 1800));

      setStatus("complete");
      setResult({
        chunks,
        dims: model.dims,
        sampleChunk: SAMPLE_CHUNK_TEXTS[Math.floor(Math.random() * SAMPLE_CHUNK_TEXTS.length)],
        score: (0.82 + Math.random() * 0.15).toFixed(3),
        page: Math.floor(Math.random() * 12) + 1,
        chunkId: `chunk_${String(Math.floor(Math.random() * chunks)).padStart(4, "0")}`,
      });
    }, PIPELINE_STEPS.length * 600 + 400);
    timeoutsRef.current.push(finalId);
  };

  return (
    <main className="vector-page">
      <div className="vector-content">
        <section className="vector-hero fade-in-up">
          <p className="vector-eyebrow">Semantic Search · Vector Embeddings</p>

          <h1 className="vector-title">Vector Similarity Search & Chunking</h1>

          <p className="vector-description">
            Upload a document, choose an embedding model, chunking strategy, and vector
            database, then run the pipeline to see how the configuration affects indexing.
            Built to compare how different embedding models and chunking strategies affect
            retrieval quality.
          </p>
        </section>

        <section className="tech-stack fade-in-up fade-in-delay-1">
          {TECH_STACK.map((item) => (
            <div key={item.label} className="tech-stack-item">
              <span className="tech-stack-icon">{item.icon}</span>
              <div>
                <p className="tech-stack-value">{item.value}</p>
                <p className="tech-stack-label">{item.label}</p>
                <p className="tech-stack-description">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        <div className={`vector-card fade-in-up fade-in-delay-2${status === "running" ? " vector-card-active" : ""}`}>
          <div className="vector-card-grid">
            <section
              className={`dropzone${dragActive ? " dropzone-active" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              {!file ? (
                <label className="dropzone-label">
                  <FiUploadCloud className="dropzone-icon" aria-hidden="true" />
                  <span className="dropzone-title">Drop a PDF, CSV, or TXT here</span>
                  <span className="dropzone-hint">or click to browse</span>
                  <input
                    type="file"
                    accept=".pdf,.csv,.txt"
                    onChange={handleInputChange}
                    hidden
                  />
                </label>
              ) : (
                <div className="file-chip">
                  <FiFile aria-hidden="true" />
                  <div className="file-chip-info">
                    <span className="file-chip-name">{file.name}</span>
                    <span className="file-chip-size">{formatBytes(file.size)}</span>
                  </div>
                  <button type="button" className="file-chip-remove" onClick={removeFile}>
                    <FiX aria-hidden="true" />
                  </button>
                </div>
              )}

              {fileError && <p className="dropzone-error">{fileError}</p>}
            </section>

            <section className="config-section">
              <OptionGroup
                icon={<FiCpu aria-hidden="true" />}
                label="Embedding Model"
                options={EMBEDDING_MODELS}
                value={embeddingModel}
                onChange={setEmbeddingModel}
              />

              <OptionGroup
                icon={<FiLayers aria-hidden="true" />}
                label="Chunking Method"
                options={CHUNKING_METHODS}
                value={chunkingMethod}
                onChange={setChunkingMethod}
              />

              <OptionGroup
                icon={<FiDatabase aria-hidden="true" />}
                label="Vector Database"
                options={VECTOR_DATABASES}
                value={vectorDb}
                onChange={setVectorDb}
              />
            </section>
          </div>

          <button className="run-button" disabled={!canRun} onClick={runPipeline}>
            <FiPlay aria-hidden="true" />
            {status === "running" ? "Running..." : "Run Pipeline"}
          </button>

          {status !== "idle" && (
            <section className="pipeline-status">
              {PIPELINE_STEPS.map((step, index) => {
                const done = index < activeStep;
                const active = index === activeStep && status === "running";

                return (
                  <div
                    key={step}
                    className={`pipeline-step${done ? " pipeline-step-done" : ""}${
                      active ? " pipeline-step-active" : ""
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <span className="pipeline-step-icon">
                      {done ? <FiCheck aria-hidden="true" /> : index + 1}
                    </span>
                    <span className="pipeline-step-label">{step}</span>
                  </div>
                );
              })}
            </section>
          )}

          {result && (
            <section className="result-summary">
              <p className="config-label">Ingestion Summary</p>

              <div className="result-grid">
                <div className="result-item">
                  <span className="result-value">{result.chunks}</span>
                  <span className="result-key">Chunks created</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{result.dims}</span>
                  <span className="result-key">Embedding dims</span>
                </div>
                <div className="result-item">
                  <span className="result-value">
                    {VECTOR_DATABASES.find((db) => db.id === vectorDb)?.label}
                  </span>
                  <span className="result-key">Vector store</span>
                </div>
              </div>

              <p className="config-label sample-result-heading">Sample Search Result</p>

              <div className="sample-result">
                <p className="sample-result-chunk">&ldquo;{result.sampleChunk}&rdquo;</p>

                <div className="sample-result-meta">
                  <span>
                    Score <strong>{result.score}</strong>
                  </span>
                  <span>
                    Source <strong>{file?.name}</strong>
                  </span>
                  <span>
                    Page <strong>{result.page}</strong>
                  </span>
                  <span>
                    Chunk ID <strong>{result.chunkId}</strong>
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
