import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [meds, setMeds] = useState([]);
  const [adherence, setAdherence] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!token || !storedUser) return navigate("/");
    setUser(storedUser);
    fetchMeds();
  }, []);

  const fetchMeds = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/medications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setMeds(data);

      const taken = data.filter((med) => med.taken).length;
      const total = data.length;
      const adherencePercent =
        total > 0 ? Math.round((taken / total) * 100) : 0;
      setAdherence(adherencePercent);
    } catch (err) {
      console.error("Failed to fetch meds", err);
    }
  };

  const handleMarkAsTaken = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/medications/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMeds();
    } catch (err) {
      alert("Failed to update med");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Topbar */}
      <div className="topbar">
        <div className="logo">🩺 MediCare Companion</div>
        <button
          className="role-switch"
          onClick={() => {
            const next = user.role === "patient" ? "/caretaker" : "/dashboard";
            navigate(next);
          }}
        >
          Switch to {user.role === "patient" ? "Caretaker" : "Patient"}
        </button>
      </div>

      {/* Hero */}
      <div className="hero-card">
        <h1>Good Evening, {user.name}!</h1>
        <p className="subtitle">Ready to stay on track with your medication?</p>
        <div className="metrics">
          <div className="metric-box">
            <h2>{meds.length}</h2>
            <p>Total Meds</p>
          </div>
          <div className="metric-box">
            <h2>{meds.filter((m) => m.taken).length}</h2>
            <p>Marked Taken</p>
          </div>
          <div className="metric-box">
            <h2>{adherence}%</h2>
            <p>Adherence</p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="main-grid">
        <div className="medication-panel">
          <h3>Today's Medication</h3>

          {meds.length === 0 ? (
            <p>No meds found.</p>
          ) : (
            meds.map((med) => (
              <div key={med.id} className="med-box">
                <p>
                  <strong>{med.name}</strong> – {med.dosage} ({med.frequency})
                </p>
                {med.taken ? (
                  <span className="taken-tag">✅ Taken</span>
                ) : (
                  <button onClick={() => handleMarkAsTaken(med.id)}>
                    ✔️ Mark as Taken
                  </button>
                )}
              </div>
            ))
          )}

          <div className="photo-upload">
            <p>Add Proof Photo (Optional)</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  alert("File selected: " + file.name);
                }
              }}
              className="file-input"
            />
          </div>
        </div>

        <div className="calendar-panel">
          <h3>Medication Calendar</h3>
          <div className="calendar-grid">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const today = new Date().getDate();

              let cellClass = "calendar-cell";
              if (day === today) {
                cellClass += " today";
              }
              if (day < today) {
                cellClass += day % 2 === 0 ? " taken" : " missed"; // mock logic
              } else {
                cellClass += " future";
              }

              return (
                <div key={day} className={cellClass}>
                  {day}
                </div>
              );
            })}
          </div>

          <div className="legend">
            <span className="dot taken"></span> Taken
            <span className="dot missed"></span> Missed
            <span className="dot today"></span> Today
          </div>
        </div>
      </div>
    </div>
  );
}
