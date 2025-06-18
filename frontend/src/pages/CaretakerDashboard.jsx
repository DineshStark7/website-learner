import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CaretakerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const adherence = 85;
  const currentStreak = 5;
  const missed = 3;
  const takenThisWeek = 4;

  return (
    <div className="dashboard-wrapper">
      {/* Topbar */}
      <div className="topbar">
        <div className="logo">🩺 MediCare Companion</div>
        <button className="role-switch" onClick={() => navigate("/dashboard")}>
          Switch to Patient
        </button>
      </div>

      {/* Hero */}
      <div className="hero-card green">
        <h1>Caretaker Dashboard</h1>
        <p className="subtitle">
          Monitoring Eleanor Thompson’s medication adherence
        </p>
        <div className="metrics">
          <div className="metric-box">
            <h2>{adherence}%</h2>
            <p>Adherence Rate</p>
          </div>
          <div className="metric-box">
            <h2>{currentStreak}</h2>
            <p>Current Streak</p>
          </div>
          <div className="metric-box">
            <h2>{missed}</h2>
            <p>Missed This Month</p>
          </div>
          <div className="metric-box">
            <h2>{takenThisWeek}</h2>
            <p>Taken This Week</p>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="tab-bar-horizontal">
        {["overview", "activity", "calendar", "notifications"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="main-grid">
          <div className="medication-panel">
            <h3>Today's Status</h3>
            <div className="med-box">
              <p>
                <strong>Daily Medication Set</strong>
              </p>
              <span className="time-label">🕒 8:00 AM</span>
              <span className="status-tag">Pending</span>
            </div>
          </div>

          <div className="calendar-panel">
            <h3>Quick Actions</h3>
            <div className="calendar-box">
              <button className="quick-btn">📧 Send Reminder Email</button>
              <button className="quick-btn">🔔 Configure Notifications</button>
              <button className="quick-btn">🗓️ View Full Calendar</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="activity-list">
          <h3>Recent Medication Activity</h3>
          {[
            {
              day: "June 17",
              status: "completed",
              time: "8:30 AM",
              photo: true,
            },
            {
              day: "June 16",
              status: "completed",
              time: "8:15 AM",
              photo: false,
            },
            { day: "June 15", status: "missed" },
          ].map((item, idx) => (
            <div key={idx} className="activity-card">
              <div>
                <strong>{item.day}</strong>
                <p>
                  {item.status === "missed"
                    ? "Missed dose"
                    : `Taken at ${item.time}`}
                </p>
              </div>
              <div className="right-side">
                {item.photo && <span className="badge">📸 Photo</span>}
                <span className={`badge ${item.status}`}>
                  {item.status === "missed" ? "Missed" : "Completed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="calendar-overview">
          <h3>Medication Calendar Overview</h3>
          <div className="calendar-grid">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const today = new Date().getDate();
              const isToday = day === today;
              const cellClass =
                "calendar-cell" +
                (isToday ? " today" : "") +
                (day < today
                  ? day % 2 === 0
                    ? " taken"
                    : " missed"
                  : " future");

              return (
                <div key={day} className={cellClass}>
                  {day}
                </div>
              );
            })}
          </div>
          <p className="calendar-details">
            Details for June {new Date().getDate()}, 2025
          </p>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="notifications-panel">
          <h3>Notification Preferences</h3>
          <label>
            Email: <input type="email" defaultValue="caretaker@example.com" />
          </label>
          <label>
            Missed Alert Time:
            <select>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </label>
          <label>
            Daily Reminder:
            <input type="time" defaultValue="20:00" />
          </label>
          <button className="mark-btn">Save Notification Settings</button>
        </div>
      )}
    </div>
  );
}
