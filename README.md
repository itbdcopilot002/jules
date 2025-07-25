# Jules Resource Management Portal

This project is a minimal resource management portal to track team members, projects, and allocations.

## Backend Setup

1. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```
2. Run the development server:
   ```bash
   python backend/app.py
   ```

## Running Tests

Tests are written with `pytest`. Install the requirements above and run:

```bash
pytest
```

## Frontend

The `frontend` directory contains a very small React UI. You can serve it locally
with a simple static server:

```bash
cd frontend
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser. The UI will communicate with
the running Flask backend on the same host.
