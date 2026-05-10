# Cambodia Tax App

Local web app for Cambodia tax calculations. The project has two parts:

- `backend/` - Flask API that serves tax calculators and reference data
- `frontend/` - React app that consumes the API

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- `pip` and `npm` available in your terminal

## Project Setup

Clone the repository and open the project folder, then set up the backend and frontend separately.

### 1. Backend setup

From the project root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
.venv\\Scripts\\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask API:

```bash
python app.py
```

The backend runs at `http://127.0.0.1:5000` and exposes API endpoints under `/api`.

### 2. Frontend setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Start the React app:

```bash
npm start
```

The frontend opens in your browser, usually at `http://localhost:3000`.

## Important Note

The frontend is configured to call the backend at `http://127.0.0.1:5000/api`. Keep the backend running before using the calculators in the browser.

## Available Scripts

### Backend

- `python app.py` - start the Flask API server

### Frontend

- `npm start` - run the development server
- `npm run build` - create a production build
- `npm test` - run the React test runner

## API Overview

The backend exposes these routes:

- `GET /api/health`
- `GET /api/tax-info`
- `POST /api/salary-tax`
- `POST /api/prepayment-tax`
- `POST /api/penalty`
- `POST /api/patent-tax`
- `POST /api/lighting-tax`
- `POST /api/special-tax`

## Suggested Run Order

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend in the browser and use the calculators.
