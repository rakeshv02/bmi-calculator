import { useState } from "react";

export default function App() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "#3b82f6" };
    if (bmi < 25)   return { label: "Normal weight", color: "#22c55e" };
    if (bmi < 30)   return { label: "Overweight", color: "#f97316" };
    return               { label: "Obese", color: "#ef4444" };
  };

  const calculate = () => {
    let bmiValue;
    if (unit === "metric") {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      if (!w || !h || h <= 0) return;
      bmiValue = w / (h * h);
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inc;
      if (!w || !totalInches) return;
      bmiValue = (w / (totalInches * totalInches)) * 703;
    }
    const rounded = Math.round(bmiValue * 10) / 10;
    setBmi(rounded);
    setCategory(getCategory(rounded));
  };

  const reset = () => {
    setWeight(""); setHeight(""); setWeightLbs("");
    setHeightFt(""); setHeightIn(""); setBmi(null); setCategory("");
  };

  const getNeedleRotation = (bmi) => {
    const clamped = Math.min(Math.max(bmi, 10), 40);
    return ((clamped - 10) / 30) * 180 - 90;
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "15px", fontWeight: "700", color: "#6366f1", textDecoration: "none" }}>⌘ Tabutility</a>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Free Online Tools</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", margin: "0 0 8px 0" }}>BMI Calculator</h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 28px 0" }}>
          Calculate your Body Mass Index. Supports metric (kg/cm) and imperial (lbs/ft) units.
        </p>

        {/* Unit toggle */}
        <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
          {["metric", "imperial"].map((u) => (
            <button
              key={u}
              onClick={() => { setUnit(u); reset(); }}
              style={{
                padding: "8px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
                background: unit === u ? "#6366f1" : "transparent",
                color: unit === u ? "#fff" : "#6b7280",
              }}
            >
              {u === "metric" ? "Metric (kg, cm)" : "Imperial (lbs, ft)"}
            </button>
          ))}
        </div>

        {/* Input card */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
          {unit === "metric" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Weight (kg)</label>
                <input type="number" placeholder="e.g. 70" value={weight} onChange={e => setWeight(e.target.value)} style={inputStyle} min="1" />
              </div>
              <div>
                <label style={labelStyle}>Height (cm)</label>
                <input type="number" placeholder="e.g. 175" value={height} onChange={e => setHeight(e.target.value)} style={inputStyle} min="1" />
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Weight (lbs)</label>
                <input type="number" placeholder="e.g. 154" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} style={inputStyle} min="1" />
              </div>
              <div>
                <label style={labelStyle}>Height (ft)</label>
                <input type="number" placeholder="e.g. 5" value={heightFt} onChange={e => setHeightFt(e.target.value)} style={inputStyle} min="0" />
              </div>
              <div>
                <label style={labelStyle}>Height (in)</label>
                <input type="number" placeholder="e.g. 9" value={heightIn} onChange={e => setHeightIn(e.target.value)} style={inputStyle} min="0" max="11" />
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "13px",
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Calculate BMI
          </button>
        </div>

        {/* Result */}
        {bmi !== null && (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px", textAlign: "center" }}>

            {/* Gauge */}
            <div style={{ position: "relative", width: "200px", height: "110px", margin: "0 auto 20px" }}>
              <svg viewBox="0 0 200 110" width="200" height="110">
                {/* Background arc segments */}
                <path d="M 10 100 A 90 90 0 0 1 57.5 22.4" fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" />
                <path d="M 57.5 22.4 A 90 90 0 0 1 142.5 22.4" fill="none" stroke="#22c55e" strokeWidth="16" strokeLinecap="round" />
                <path d="M 142.5 22.4 A 90 90 0 0 1 175 55" fill="none" stroke="#f97316" strokeWidth="16" strokeLinecap="round" />
                <path d="M 175 55 A 90 90 0 0 1 190 100" fill="none" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" />
                {/* Needle */}
                <g transform={`rotate(${getNeedleRotation(bmi)}, 100, 100)`}>
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                </g>
                <circle cx="100" cy="100" r="6" fill="#111827" />
              </svg>
            </div>

            <div style={{ fontSize: "52px", fontWeight: "900", color: category.color, lineHeight: 1 }}>{bmi}</div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: category.color, marginTop: "6px" }}>{category.label}</div>

            {/* Ranges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "24px" }}>
              {[
                { label: "Underweight", range: "< 18.5", color: "#3b82f6" },
                { label: "Normal", range: "18.5–24.9", color: "#22c55e" },
                { label: "Overweight", range: "25–29.9", color: "#f97316" },
                { label: "Obese", range: "≥ 30", color: "#ef4444" },
              ].map((r) => (
                <div key={r.label} style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 6px", borderTop: `3px solid ${r.color}` }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: r.color }}>{r.label}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{r.range}</div>
                </div>
              ))}
            </div>

            <button onClick={reset} style={{ marginTop: "20px", padding: "9px 24px", background: "#f3f4f6", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", color: "#374151", cursor: "pointer" }}>
              Reset
            </button>
          </div>
        )}

        {/* Info */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#111827", margin: "0 0 12px 0" }}>What is BMI?</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 10px 0", lineHeight: "1.6" }}>
            Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a simple screening tool used by health professionals worldwide.
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0, lineHeight: "1.6" }}>
            Note: BMI is a general indicator and does not account for muscle mass, age, or body composition. Consult a healthcare professional for personalised advice.
          </p>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "14px", color: "#6366f1", textDecoration: "none", fontWeight: "600" }}>
            ← Back to all free tools
          </a>
        </div>
      </div>
    </div>
  );
}
