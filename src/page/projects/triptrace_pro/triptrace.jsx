import { useEffect, useState } from "react";
import { FiMapPin, FiActivity, FiDollarSign, FiClock } from "react-icons/fi";
import "./triptrace.css";

function TripTrace() {
  const [cases, setCases] = useState([]);
  const [currentCase, setCurrentCase] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({
    correct: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [distanceDist, setDistanceDist] = useState([]);

  useEffect(() => {
    async function loadCases() {
      try {
        const [casesResponse, distanceResponse] = await Promise.all([
          fetch("/data/investigation_cases.json"),
          fetch("/data/distance_distribution.csv"),
        ]);

        const data = await casesResponse.json();
        const distanceCsv = await distanceResponse.text();

        setCases(data);
        setDistanceDist(parseDistanceCsv(distanceCsv));

        setCurrentCase(
          data[Math.floor(Math.random() * data.length)]
        );
      } catch (error) {
        console.error("Failed to load investigation cases:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    setScore((prev) => ({
      correct:
        prev.correct +
        (answer === currentCase.case_type ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextCase = () => {
    const next =
      cases[Math.floor(Math.random() * cases.length)];

    setCurrentCase(next);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div className="triptrace-page">
        Loading TripTrace...
      </div>
    );
  }

  if (!currentCase) {
    return (
      <div className="triptrace-page">
        Failed to load cases.
      </div>
    );
  }

  const answered = selectedAnswer !== null;

  return (
    <div className="triptrace-page">

      <header className="triptrace-header">
        <div>
          <p className="triptrace-label">
            ML ANOMALY INVESTIGATION
          </p>

          <h1>
            Statistical Pattern Analysis &amp; Anomaly
            Detection on 10.9M NYC Taxi Trips
          </h1>

          <p>
            An end-to-end analysis of 10.9M NYC taxi trips,
            combining data cleaning, feature engineering,
            statistical analysis, and Isolation Forest for
            anomaly detection. It explores unusual trip
            patterns, data errors, and suspicious records
            through interactive visualizations and trip
            investigation.
          </p>
        </div>

        <div className="score-card">
          <span>INVESTIGATION SCORE</span>

            <strong>
            {score.correct} correct / {score.total} attempts
            </strong>
        </div>
      </header>

      <RoadScene
        distance={currentCase.trip_distance}
        speed={currentCase.speed_mph}
      />

      <main className="investigation-container">

        <section className="model-panel techy-panel">
          <h2>Behind the Model</h2>

          <div className="model-stats-grid compact-grid">
            <Metric label="Algorithm" value="Isolation Forest" />
            <Metric label="Training Samples" value="500K" />
            <Metric label="Input Features" value="7" />
            <Metric label="Detected Anomaly Rate" value="~2%" />
            <Metric label="Full Data Pipeline" value="10.9M trips" />
          </div>
        </section>

        <section className="anomaly-panel techy-panel">
          <h2>Data Anomaly Breakdown</h2>

          <p className="distribution-subtitle">
            Before training, every trip was screened for structural
            errors — here's exactly what got flagged and filtered out.
          </p>

          <div className="anomaly-stats-grid compact-grid">
            <Metric
              Icon={FiMapPin}
              label="Invalid Pickup Coordinates"
              value="170,212"
            />
            <Metric
              Icon={FiMapPin}
              label="Invalid Dropoff Coordinates"
              value="160,251"
            />
            <Metric
              Icon={FiActivity}
              label="Zero Distance"
              value="64,065"
            />
            <Metric
              Icon={FiDollarSign}
              label="Negative Fare"
              value="4,216"
            />
            <Metric
              Icon={FiClock}
              label="Zero Duration"
              value="11,398"
            />
            <Metric
              Icon={FiClock}
              label="Negative Duration"
              value="31"
            />
          </div>

          <div className="integrity-bars">
            <div className="integrity-row">
              <span className="integrity-label">Raw Data</span>
              <div className="integrity-track">
                <div className="integrity-fill fill-raw" style={{ width: "100%" }} />
              </div>
              <span className="integrity-value">10.9M</span>
            </div>

            <div className="integrity-row">
              <span className="integrity-label">Clean Data</span>
              <div className="integrity-track">
                <div className="integrity-fill fill-clean" style={{ width: "98.03%" }} />
              </div>
              <span className="integrity-value">10.69M</span>
            </div>

            <div className="integrity-row">
              <span className="integrity-label">Errors</span>
              <div className="integrity-track">
                <div className="integrity-fill fill-errors" style={{ width: "1.97%" }} />
              </div>
              <span className="integrity-value">214K</span>
            </div>
          </div>

          <div className="model-stats-grid compact-grid summary-grid">
            <Metric label="Raw Trips" value="10.9M" />
            <Metric label="Clean Trips" value="10.69M" />
            <Metric label="Data Errors" value="214,623" />
            <Metric label="Data Removed" value="~1.97%" />
          </div>
        </section>

        <section className="distribution-panel">
          <h2>Trip Distance Distribution</h2>

          <p className="distribution-subtitle">
            Most trips are short, and the distribution is heavily
            right-skewed — a long tail of rare, extreme distances is
            exactly where anomalies tend to hide.
          </p>

          <DistanceHistogram data={distanceDist} />
        </section>

        <div className="case-header">
          <span>
            CASE #{currentCase.case_id}
          </span>

          <span className="case-severity">
            Severity: {currentCase.severity}
          </span>
        </div>

        <section className="trip-card">

          <h2>Investigate this trip</h2>

          <div className="trip-grid">

            <Metric
              label="Distance"
              value={`${currentCase.trip_distance} miles`}
            />

            <Metric
              label="Duration"
              value={`${currentCase.duration_minutes} min`}
            />

            <Metric
              label="Speed"
              value={`${currentCase.speed_mph} mph`}
            />

            <Metric
              label="Fare"
              value={`$${currentCase.fare_amount}`}
            />

            <Metric
              label="Tip"
              value={`$${currentCase.tip_amount}`}
            />

            <Metric
              label="Total"
              value={`$${currentCase.total_amount}`}
            />

            <Metric
            label="Pickup Hour"
            value={
                currentCase.pickup_hour !== null &&
                currentCase.pickup_hour !== undefined
                ? `${currentCase.pickup_hour}:00`
                : "N/A"
            }
            />

            <Metric
              label="Passengers"
              value={currentCase.passenger_count}
            />

          </div>

        </section>

        <section className="decision-section">

          <h2>
            What do you think happened with this trip?
          </h2>

          <div className="answer-buttons">

            <button
              onClick={() =>
                handleAnswer("normal")
              }
              disabled={answered}
            >
              Normal
            </button>

            <button
              onClick={() =>
                handleAnswer("suspicious")
              }
              disabled={answered}
            >
              Suspicious
            </button>

            <button
              onClick={() =>
                handleAnswer("data_error")
              }
              disabled={answered}
            >
              Data Error
            </button>

          </div>

        </section>

        {answered && (

          <section className="result-panel">

            <h2>
              {selectedAnswer === currentCase.case_type
                ? "Correct"
                : "Not quite"}
            </h2>

            <div className="result-row">
              <span>Your answer</span>
              <strong>{selectedAnswer}</strong>
            </div>

            <div className="result-row">
              <span>Actual classification</span>
              <strong>
                {currentCase.case_type}
              </strong>
            </div>

            <div className="result-row">
              <span>Severity</span>
              <strong>
                {currentCase.severity}
              </strong>
            </div>

            {currentCase.anomaly_score !== null &&
              currentCase.anomaly_score !== undefined && (
                <div className="result-row">
                  <span>Anomaly Score</span>
                  <strong>
                    {Number(
                      currentCase.anomaly_score
                    ).toFixed(3)}
                  </strong>
                </div>
              )}

            <div className="explanation">
              <h3>Why?</h3>

              <p>
                {currentCase.explanation}
              </p>
            </div>

            <button
              className="next-case-button"
              onClick={nextCase}
            >
              Investigate Next Trip →
            </button>

          </section>

        )}

      </main>

    </div>
  );
}

const ROAD_PATH = "M40,150 C260,40 420,170 640,80 S 960,160 1060,50";

function RoadScene({ distance, speed }) {
  const animationDuration = Math.max(
    3,
    Math.min(9, 9 - speed / 12)
  );
  return (
    <div className="taxi-road" aria-hidden="true">
      <svg className="road-svg" viewBox="0 0 1100 200">
        <defs>
          <linearGradient id="taxiBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe066" />
            <stop offset="100%" stopColor="#f2a900" />
          </linearGradient>
          <linearGradient id="taxiWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0f4c66" />
          </linearGradient>
        </defs>

        <path id="roadPath" className="road-glow" d={ROAD_PATH} />
        <path className="road-base" d={ROAD_PATH} />
        <path className="road-line" d={ROAD_PATH} />

        <g className="route-marker">
          <circle cx="40" cy="150" r="7" />
          <text x="40" y="176">PICKUP</text>
        </g>

        <g className="route-marker">
          <circle cx="1060" cy="50" r="7" />
          <text x="1060" y="30" textAnchor="end">DROPOFF</text>
        </g>

        <g className="route-info" transform="translate(550, 26)">
          <rect x="-70" y="-20" width="140" height="30" rx="15" />
          <text y="1">{distance} mi · {speed} mph</text>
        </g>

        <g className="taxi-mover">
          <ellipse className="taxi-shadow" cx="0" cy="36" rx="30" ry="6" />

          <g className="taxi-body">
            <rect x="-78" y="-4" width="160" height="30" rx="9" fill="url(#taxiBody)" />
            <path d="M-43,-4 L-23,-29 L42,-29 L57,-4 Z" fill="url(#taxiBody)" />
            <path d="M-35,-7 L-20,-23 L35,-23 L50,-7 Z" fill="url(#taxiWindow)" />
            <line x1="7" y1="-23" x2="7" y2="-7" stroke="#0b1620" strokeWidth="2" />
            <rect x="-4" y="-36" width="20" height="7" rx="2" fill="#111827" />
            <rect x="-78" y="9" width="16" height="6" fill="#111827" />
            <rect x="-46" y="9" width="16" height="6" fill="#111827" />
            <rect x="-14" y="9" width="16" height="6" fill="#111827" />
            <rect x="18" y="9" width="16" height="6" fill="#111827" />
            <rect x="50" y="9" width="16" height="6" fill="#111827" />
            <rect x="-82" y="14" width="12" height="8" rx="2" fill="#2b2f36" />
            <rect x="54" y="14" width="12" height="8" rx="2" fill="#2b2f36" />
            <circle cx="64" cy="4" r="4" fill="#fff9c4" />
            <circle cx="-74" cy="4" r="4" fill="#ef4444" />

            <g className="taxi-wheel" style={{ transformOrigin: '-43px 28px' }}>
              <circle cx="-43" cy="28" r="13" fill="#111827" />
              <circle cx="-43" cy="28" r="5" fill="#6b7280" />
            </g>
            <g className="taxi-wheel" style={{ transformOrigin: '47px 28px' }}>
              <circle cx="47" cy="28" r="13" fill="#111827" />
              <circle cx="47" cy="28" r="5" fill="#6b7280" />
            </g>
          </g>

                <animateMotion
                    dur={`${animationDuration}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                >
                    <mpath href="#roadPath" />
                </animateMotion>
        </g>
      </svg>
    </div>
  );
}

function parseDistanceCsv(csvText) {
  return csvText
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [range, count] = line.split(",");
      return { range, count: Number(count) };
    });
}

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function DistanceHistogram({ data }) {
  if (!data.length) return null;

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const maxCount = Math.max(...data.map((d) => d.count));

  const chartWidth = 800;
  const chartHeight = 260;
  const barGap = 18;
  const barWidth =
    (chartWidth - barGap * (data.length - 1)) / data.length;
  const maxBarHeight = 190;
  const baseline = 220;

  const within2mi =
    ((data[0]?.count ?? 0) + (data[1]?.count ?? 0)) / total * 100;

  const beyond20mi = data
    .filter((d) => d.range === "20-50" || d.range === "50-100")
    .reduce((sum, d) => sum + d.count, 0);
  const beyond20miPct = (beyond20mi / total) * 100;

  return (
    <div className="histogram-wrap">
      <svg
        className="histogram-svg"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <defs>
          <linearGradient id="histBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {data.map((d, i) => {
          const height = Math.max(
            4,
            (d.count / maxCount) * maxBarHeight
          );
          const x = i * (barWidth + barGap);
          const y = baseline - height;

          return (
            <g key={d.range}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                rx="4"
                fill="url(#histBar)"
              />
              <text
                className="hist-value"
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
              >
                {formatCount(d.count)}
              </text>
              <text
                className="hist-label"
                x={x + barWidth / 2}
                y={baseline + 22}
                textAnchor="middle"
              >
                {d.range} mi
              </text>
            </g>
          );
        })}
      </svg>

      <div className="insight-chips">
        <span className="insight-chip">
          ≈{within2mi.toFixed(1)}% of trips are under 2 miles
        </span>
        <span className="insight-chip">
          only {beyond20miPct.toFixed(3)}% exceed 20 miles — extreme outliers
        </span>
      </div>
    </div>
  );
}

function Metric({ label, value, Icon }) {
  return (
    <div className="metric">
      <span>
        {Icon && <Icon className="metric-icon" aria-hidden="true" />}
        {label}
      </span>
      <strong>{value ?? "N/A"}</strong>
    </div>
  );
}

export default TripTrace;