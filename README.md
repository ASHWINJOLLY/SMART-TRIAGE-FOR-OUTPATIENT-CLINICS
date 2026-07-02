<div align="center">

# 🏥 SYMPTORA

### *AI-Powered Smart OPD Triage & Queue Management System*

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-005571?style=for-the-badge&logo=fastapi&logoColor=white)]()
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![Gemini](https://img.shields.io/badge/Gemini_1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)]()
[![WebSocket](https://img.shields.io/badge/WebSocket_Real--time-010101?style=for-the-badge&logo=socketdotio&logoColor=white)]()
[![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)]()
[![AAYAM 2026](https://img.shields.io/badge/AAYAM_2026-TEAM_FELIX-blue?style=for-the-badge)]()

<br />

> *"Every day, 5,000 patients walk into a hospital — SYMPTORA ensures the most critical ones are never lost in the queue."*

<br />

[🌟 Features](#-features) •
[🚀 Quick Start](#-quick-start) •
[📸 Screenshots](#-screenshots) •
[🏗 Architecture](#-architecture) •
[🎯 Use Cases](#-use-cases) •
[📚 API Reference](#-api-reference) •
[🛠 Tech Stack](#-tech-stack) •
[📈 Roadmap](#-roadmap) •
[👥 Team](#-team)

</div>

---

## 🌟 Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Triage
- **Gemini 1.5 Flash** classifies severity in seconds
- Symptom analysis → Critical / Moderate / Mild
- 400+ medical keywords across 12 departments
- English-first with Hindi fallback support
- Local fallback engine when API is unreachable

</td>
<td width="50%">

### 💬 WhatsApp-Style Chat
- Step-by-step guided symptom collection
- One-click demo scenarios (Chest Pain, Fever, Fracture)
- Real-time severity display with visual badges
- Prescription OCR upload with auto-triage

</td>
</tr>
<tr>
<td width="50%">

### 📊 Enterprise Admin Dashboard
- Real-time queue with live WebSocket updates
- Patient inflow **AreaChart** (Recharts)
- Department load **radial gauges**
- Wait time **sparkline trends**
- **CSV export** — one-click queue download
- Doctor assignment & room tracking

</td>
<td width="50%">

### 🚨 Emergency Escalation
- Critical patients **bypass the queue** instantly
- EMG token generation with priority override
- Dedicated Emergency Bay assignment
- Staff notification on critical detection
- Fast-track activation for moderate+ cases

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Polished UI/UX
- Dark theme, medical-grade aesthetic
- Video background with flat-surface cards
- Scroll-aware navbar animation
- Skeleton loaders & smooth transitions
- Unified badge system for severity/status
- Lucide icons (no emoji)

</td>
<td width="50%">

### 🎙️ Voice Triage
- Browser Speech API integration
- Multi-language greeting support
- Voice → Transcript → Triage pipeline
- LiveKit WebRTC infrastructure ready
- Sarvam AI STT/TTS integration

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### 1. Setup Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Configure your API key
echo "GEMINI_API_KEY=your_key_here" > .env

uvicorn main:app --reload --port 8000
```

### 2. Run Frontend

```bash
npm install
npm run dev
```

### 3. Open in Browser

```
http://localhost:5173
```

---

## 📸 Screenshots

<div align="center">

| Home Page | Patient Triage | Admin Dashboard |
|:---:|:---:|:---:|
| ![Home](screenshots/home.png) | ![Triage](screenshots/triage-chat.png) | ![Admin](screenshots/admin-dashboard.png) |
| Hero with video background, demo buttons, feature highlights | Step-by-step symptom collection with AI classification | Live queue, analytics charts, department gauges |

| Live Queue | AI Insights | Voice Agent |
|:---:|:---:|:---:|
| ![Queue](screenshots/live-queue.png) | ![Insights](screenshots/ai-insights.png) | ![Voice](screenshots/voice-agent.png) |
| Real-time public queue board with severity badges | Gemini-generated hospital insights & trends | Speech-based symptom reporting |

</div>

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React 19 + Vite)               │
│                                                             │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ HomePage │  │PatientPortal │  │   AdminDashboard     │  │
│  │          │  │  ┌─────────┐ │  │  ┌────────────────┐  │  │
│  │  Hero    │  │  │ Triage  │ │  │  │ Stats Cards    │  │  │
│  │  Demo    │  │  │ Chat    │ │  │  │ AreaChart      │  │  │
│  │  About   │  │  │ OCR     │ │  │  │ Radial Gauges  │  │  │
│  └──────────┘  │  │ Local   │ │  │  │ Sparklines     │  │  │
│                 │  │ Fallback│ │  │  │ CSV Export     │  │  │
│  ┌──────────┐  │  └─────────┘ │  │  │ Queue Table    │  │  │
│  │LiveQueue │  └──────────────┘  │  └────────────────┘  │  │
│  │VoiceAgent│                    └──────────────────────┘  │
│  │Insights  │  ┌──────────────┐                            │
│  └──────────┘  │  API Client  │  ┌────────────────────┐   │
│                │  (fetch + WS)│──│   WebSocket (5s)   │   │
│                └──────────────┘  └─────────┬──────────┘   │
└────────────────────────────────────────────┼───────────────┘
                                             │
                    ═════════════════════════╪════════════════
                                             │
┌────────────────────────────────────────────┼───────────────┐
│                    BACKEND (FastAPI)       │               │
│                                            ▼               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   main.py                             │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐   │  │
│  │  │ /api/triage │  │ /api/ocr-    │  │ /ws/queue │   │  │
│  │  │             │  │   triage     │  │           │   │  │
│  │  │ Gemini AI   │  │ Gemini Vision│  │ 5s Heart- │   │  │
│  │  │ Dept Router │  │ Symptom      │  │ beat      │   │  │
│  │  │ Priority    │  │ Extraction   │  │ Broadcast │   │  │
│  │  │ Scorer      │  │              │  │           │   │  │
│  │  └─────────────┘  └──────────────┘  └───────────┘   │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐   │  │
│  │  │ Triage      │  │ Department   │  │ Smart     │   │  │
│  │  │ Engine      │  │ Router       │  │ Queue     │   │  │
│  │  │ (400+ kw)   │  │ (confidence) │  │ (Scoring)  │   │  │
│  │  └─────────────┘  └──────────────┘  └───────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AI LAYER (External)                      │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │  │
│  │  │ Gemini 1.5     │  │ Sarvam AI                │   │  │
│  │  │ Flash          │  │ STT / TTS                │   │  │
│  │  │ (Triage + OCR) │  │ (Hindi Voice)            │   │  │
│  │  └────────────────┘  └──────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Use Cases

| Scenario | Input | Output | Wait Time |
|:---------|:------|:-------|:----------|
| **🚨 Cardiac Emergency** | "Chest pain with shortness of breath" | EMG token → Emergency Bay | 0-3 min |
| **🤒 Moderate Fever** | "Fever for 3 days with body ache" | AYM token → Medicine OPD | 15-30 min |
| **🦴 Fracture** | "Fell down, arm swelling, can't move" | AYM token → Orthopaedics | 10-20 min |
| **👁 Routine Eye Check** | "Blurred vision in left eye" | AYM token → Eye OPD | 30-45 min |
| **📋 Prescription OCR** | Upload prescription photo | Auto-extracted → triage result | Instant |

### Try It Yourself (Patient Portal)
- Click **"Try: Chest Pain"** → auto-fills answers → critical result + emergency modal
- Click **"Try: Fever"** → auto-fills → moderate + department assignment
- Click **"Try: Fracture"** → auto-fills → orthopaedic routing

---

## 📚 API Reference

### Core Triage
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/health` | Server health check (queue count, connections) |
| `POST` | `/api/triage` | AI-powered symptom triage & department routing |
| `POST` | `/api/ocr-triage` | Prescription image upload → OCR → auto-triage |

### Queue Management
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/queue` | Full queue list (sorted by priority) |
| `POST` | `/api/queue/add` | Add simulated patient for testing |
| `GET` | `/api/queue-status` | Queue dashboard (by dept, by severity, avg wait) |
| `WS` | `/ws/queue` | Real-time WebSocket with 5s heartbeat broadcasts |

### Analytics & Insights
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/stats` | Hospital-wide statistics |
| `GET` | `/api/departments` | Department list with patient counts & load status |
| `GET` | `/api/insights` | Gemini-generated operational insights |
| `GET` | `/api/feed` | Activity feed (last 10 patient events) |

### Intelligent Features
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/predict-wait` | ML-based wait time prediction by department |
| `POST` | `/api/priority-score` | Composite priority score calculation |
| `POST` | `/api/department-route` | Symptom-based department routing with confidence |

### Voice
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/livekit/token` | LiveKit voice room authentication |
| `POST` | `/api/voice/triage` | Audio upload → STT → triage pipeline |
| `GET` | `/api/voice/greeting` | Voice greeting TTS audio |

---

## 🛠 Tech Stack

<details>
<summary><b>Click to expand</b></summary>

<br />

### Frontend
| Technology | Purpose |
|:-----------|:--------|
| **React 19** | UI framework with latest features |
| **TypeScript 5** | Type-safe development |
| **Vite 8** | Lightning-fast build tool & HMR |
| **Recharts** | Charts (AreaChart, sparklines) |
| **Lucide React** | Icon library (medical & UI icons) |
| **Pure CSS** | Custom design tokens, no Tailwind |

### Backend
| Technology | Purpose |
|:-----------|:--------|
| **Python 3.11+** | Core language |
| **FastAPI** | Async REST framework |
| **Uvicorn** | ASGI server |
| **WebSockets** | Real-time bidirectional communication |
| **Pydantic** | Data validation & serialization |

### AI & Voice
| Technology | Purpose |
|:-----------|:--------|
| **Gemini 1.5 Flash** | Primary AI — triage & OCR |
| **Sarvam AI** | Hindi STT/TTS |
| **LiveKit** | WebRTC voice infrastructure |

### Dev Tools
| Tool | Purpose |
|:-----|:--------|
| **npm** | Package management |
| **dotenv** | Environment configuration |
| **pydantic** | Request/response models |

</details>

---

## 🎨 Design System

SYMPTORA uses a custom enterprise CSS design system — no frameworks, no Tailwind:

```
🎨 Design Tokens       📐 Layout            ✨ Animations
  ├── Colors            ├── Flat-surface     ├── Navbar shrink
  ├── Typography        │   cards            ├── Fade-in-up
  ├── Spacing           ├── Gradient         ├── Skeleton loaders
  ├── Shadows           │   borders          ├── Glow effects
  └── Border radius     └── Responsive grid  └── Reduced motion
```

### Badge System (Unified)
```css
.badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid; }

/* Severity */
.badge-critical    { /* red tones */ }
.badge-moderate    { /* amber tones */ }
.badge-mild        { /* green tones */ }

/* Status */
.badge-waiting         { /* blue tones */ }
.badge-called          { /* amber tones */ }
.badge-consultation    { /* purple tones */ }
.badge-done            { /* green tones */ }
```

---

## 📈 Roadmap

- [x] Core triage engine with Gemini AI
- [x] Multi-department routing (12 departments)
- [x] Real-time WebSocket queue updates
- [x] Admin dashboard with analytics
- [x] Prescription OCR triage
- [x] Voice triage (English + Hindi)
- [x] CSV data export
- [x] Unified badge & design system
- [ ] **Real WhatsApp Business API integration**
- [ ] **EHR / Hospital Management System integration**
- [ ] **ML-based wait time prediction (historical data)**
- [ ] **Automated SMS/WhatsApp notifications**
- [ ] **Offline mode for low-connectivity areas**
- [ ] **Multi-hospital network expansion**
- [ ] **Patient mobile app (PWA)**

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🐛 **Report bugs** — Open an issue with clear reproduction steps
2. 💡 **Suggest features** — Open a feature request issue
3. 🔧 **Submit PRs** — Fork, branch, commit, push, PR

```bash
# Development workflow
git checkout -b feature/your-feature
npm run dev          # Frontend
uvicorn main:app --reload --port 8000  # Backend
# Test, commit, push, PR
```

---

## 📁 Project Structure

```
symptora/
├── src/                        # Frontend
│   ├── api/                    # API client + WebSocket
│   │   └── client.ts
│   ├── components/             # Shared UI components
│   ├── data/                   # Mock data, triage logic
│   │   ├── mockData.ts
│   │   └── triageLogic.ts
│   ├── pages/                  # Route pages
│   │   ├── AdminDashboard.tsx
│   │   ├── PatientPortal.tsx
│   │   ├── LiveQueue.tsx
│   │   ├── AIInsights.tsx
│   │   ├── VoiceAgent.tsx
│   │   ├── About.tsx
│   │   └── HomePage.tsx
│   ├── App.tsx
│   └── index.css               # Full design system (~3900 lines)
├── backend/
│   ├── main.py                 # Single FastAPI entry point
│   ├── models.py               # Pydantic models
│   ├── triage_engine.py        # Gemini + rule-based triage
│   ├── mock_data.py            # Seed data
│   ├── voice_agent.py          # Voice processing
│   ├── features/               # Advanced features
│   │   ├── department_router.py
│   │   ├── priority_scorer.py
│   │   ├── wait_time_predictor.py
│   │   └── smart_queue.py
│   └── requirements.txt
├── public/
│   └── background.mp4          # Hero video
├── package.json
├── vite.config.ts
└── README.md
```

---

## 👥 Team

### TEAM FELIX — AAYAM 2026

> *"We don't just build software — we build solutions that save lives."*

<table>
<tr>
<td align="center" width="25%">
<img src="https://via.placeholder.com/120/1a1a2e/00d4aa?text=AJ" width="100" height="100" style="border-radius:50%; border: 3px solid var(--accent, #00d4aa);" alt="Ashwin Jolly"/><br />
<b>ASHWIN JOLLY</b><br />
<sub>Team Leader & Full-Stack Architect</sub>
</td>
<td align="center" width="25%">
<img src="https://via.placeholder.com/120/1a1a2e/00d4aa?text=FJ" width="100" height="100" style="border-radius:50%; border: 3px solid var(--accent, #00d4aa);" alt="Fiza Jamsheed"/><br />
<b>FIZA JAMSHEED</b><br />
<sub>Frontend Lead & UI/UX Designer</sub>
</td>
<td align="center" width="25%">
<img src="https://via.placeholder.com/120/1a1a2e/00d4aa?text=AM" width="100" height="100" style="border-radius:50%; border: 3px solid var(--accent, #00d4aa);" alt="Abdul Musawir"/><br />
<b>ABDUL MUSAWIR</b><br />
<sub>Backend Developer & AI Integration</sub>
</td>
<td align="center" width="25%">
<img src="https://via.placeholder.com/120/1a1a2e/00d4aa?text=PV" width="100" height="100" style="border-radius:50%; border: 3px solid var(--accent, #00d4aa);" alt="Parthiv V Sivadas"/><br />
<b>PARTHIV V SIVADAS</b><br />
<sub>QA & Testing Coordinator</sub>
</td>
</tr>
</table>

<br />

| Member | Role | Responsibilities | Key Contributions |
|:-------|:-----|:-----------------|:------------------|
| **Ashwin Jolly** | **Team Leader & Full-Stack Architect** | System architecture, full-stack development, API design, deployment, project coordination | Led end-to-end development — designed the system architecture, built the FastAPI backend with triage engine, department router, priority scorer, wait time predictor, and WebSocket infrastructure. Architected the frontend React stack, integrated Gemini AI, and established the enterprise CSS design system. |
| **Fiza Jamsheed** | **Frontend Lead & UI/UX Designer** | UI/UX design, component development, design system, user experience optimization | Designed the complete visual identity — dark medical theme, custom CSS design tokens, video background integration, scroll animations, unified badge system, and responsive layouts. Built the Patient Portal triage chat flow, HomePage hero, About page, and ensured pixel-perfect implementation across all pages. |
| **Abdul Musawir** | **Backend Developer & AI Integration** | Backend APIs, AI model integration, OCR pipeline, voice agent | Integrated Google Gemini 1.5 Flash for triage and OCR, built the prescription image analysis pipeline, implemented the voice agent with Sarvam AI STT/TTS, developed the activity feed and insights generation, and expanded the 400+ medical keyword library across 12 departments. |
| **Parthiv V Sivadas** | **QA & Testing Coordinator** | Quality assurance, testing, bug tracking, documentation, demo scenarios | Rigorously tested all triage scenarios (critical/moderate/mild/OCR/voice), validated edge cases and fallback paths, documented API endpoints and demo workflows, maintained project documentation, and ensured the system meets real-world hospital kiosk requirements. |

> *Every member of Team Felix contributed at their full potential, putting in countless hours of effort, creativity, and dedication to make SYMPTORA a reality. This project is a testament to what a passionate team can achieve when everyone gives their best.*

---

## 📬 Support

<div align="center">

⭐ **Star this repo** if you found it useful!  

</div>

---

<div align="center">

**Built with ❤️ by TEAM FELIX for AAYAM 2026**  
*Transforming hospital triage, one patient at a time.*

[Back to Top ⬆](#-symptora)

</div>
