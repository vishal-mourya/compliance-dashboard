const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5002;

const supabase = createClient(
    "https://hoqfneswnzcwwgzpkrbk.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcWZuZXN3bnpjd3dnenBrcmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzgzMzksImV4cCI6MjAzODM1NDMzOX0.kqwuakX-Mfj0hPdZLA4Rwam2iDbPSIIRrdgK1GC6nIg"
);

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'compliance.log') }),
    new winston.transports.Console()
  ]
});

app.use(cors());
app.use(express.json());

app.get('/check-rls', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('check_rls_status_for_users');

    if (error) {
      logger.error({
        message: 'RLS Check Error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }

    // Log RLS status
    logger.info({
      message: 'RLS Check Success',
      status: data[0],
      timestamp: new Date().toISOString()
    });

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/check-pitr', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('check_pitr_status');

    if (error) {
      logger.error({
        message: 'PITR Check Error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }

    // Log PITR status
    logger.info({
      message: 'PITR Check Success',
      status: data,
      timestamp: new Date().toISOString()
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});