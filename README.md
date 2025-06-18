# 🩺 MediCare Companion

A modern, full-stack medication management web app built for patients and caretakers. Users can log daily medications, track adherence, and caregivers can monitor status in real-time.

---

## ✨ Features

### 🔹 Patient Panel
- Sign up / Log in
- Add daily medications
- Mark medication as taken
- Upload optional proof photo
- View calendar with adherence history
- Visual progress tracker (adherence %)

### 🔹 Caretaker Panel
- Switch to caretaker dashboard
- View patient medication status
- See recent activity and missed doses
- Calendar overview
- Notification preference settings

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Axios for API calls
- Plain CSS (dark theme with glassmorphism)
- React Router for routing

**Backend:**
- Node.js + Express
- SQLite (lightweight local DB)
- bcryptjs (for password hashing)
- jsonwebtoken (JWT-based auth)

---

## 📁 Folder Structure

```
MediCare/
├── medicare-backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   └── index.js
├── medicare-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── CaretakerDashboard.jsx
│   │   ├── App.jsx
│   │   └── styles.css / Dashboard.css
└── README.md
```

---

## 🚀 Getting Started

### 📦 Backend

```bash
cd medicare-backend
npm install
node db/init.js   # Creates SQLite tables
npm run dev       # Starts backend on port 3000
```

### 💻 Frontend

```bash
cd medicare-frontend
npm install
npm run dev       # Starts React frontend on port 5173
```

---

## 🔐 User Roles

- **Patient**: Can log and mark meds
- **Caretaker**: Can switch dashboards and monitor assigned patients (static for now)

---

## ✅ To-Do / Phase 2

- [ ] Link multiple patients to a caretaker
- [ ] Cloud file upload for proof photos
- [ ] Email reminders + push notifications
- [ ] Role-based auth restrictions
- [ ] Full calendar integration with real dates

---

## 📸 UI Screenshots

_(Add image previews here if submitting or pushing to GitHub)_

---

## 👨‍💻 Author

**Dinesh Stark**  
MERN Stack Dev | Ethical Hacker | Learning ML  
LinkedIn: [linkedin.com/in/dinesh-stark](https://linkedin.com/in/dinesh-stark)

---

## 📄 License

MIT — Feel free to use, remix, or improve!
