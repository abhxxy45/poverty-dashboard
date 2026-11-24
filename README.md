# Poverty Dashboard

Interactive dashboard for poverty-related data analysis and visualization using TypeScript (frontend) and Python (backend).

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Python (Flask/FastAPI) |
| **Database** | Not specified (file-based) |
| **Visualization** | Chart.js / Recharts |
| **Build** | Vite, npm, pip |

## Project Structure

```
poverty-dashboard/
├── src/                          # Frontend (TypeScript/React)
│   ├── components/               # React components
│   ├── App.tsx                   # Root component
│   ├── index.tsx                 # Entry point
│   ├── data.ts                   # Data structures
│   ├── types.ts                  # TypeScript types
│   └── ...
├── app.py                        # Python backend
├── config.py                     # Configuration
├── requirements.txt              # Python dependencies
├── package.json                  # Node dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite configuration
├── index.html                    # HTML template
└── README.md
```

## Features

- **Data Visualization**: Interactive charts for poverty metrics
- **Multi-dimensional Analysis**: By region, year, demographic factors
- **Backend Processing**: Python for data computation
- **Responsive Frontend**: React/Vite for smooth UX
- **API Integration**: Frontend-backend communication

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm
- pip

### Installation

```bash
# Clone repository
git clone https://github.com/abhxxy45/poverty-dashboard.git
cd poverty-dashboard

# Frontend setup
npm install

# Backend setup
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development servers
# Terminal 1: Python backend
python app.py

# Terminal 2: Frontend
npm run dev
```

### Environment Variables

Create `.env` file:

```env
# Frontend
VITE_API_URL=http://localhost:5000

# Backend
FLASK_ENV=development
PORT=5000
```

## Data Sources

- World Bank Open Data
- National Sample Survey Office (NSSO)
- Census of India
- Custom processed datasets

## Development

```bash
# Frontend
npm run dev        # Start Vite dev server
npm run build      # Production build

# Backend
python app.py      # Start Flask/FastAPI server
```

## Screenshots

*To be added*

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Repository**: https://github.com/abhxxy45/poverty-dashboard