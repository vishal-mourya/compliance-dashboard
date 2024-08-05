# Compliance Dashboard

## Overview

The Compliance Dashboard is a web application that interacts with Supabase to check compliance status for Row Level Security (RLS) and Point in Time Recovery (PITR). It consists of a backend service built with Node.js and Express and a frontend built with React.

## Features

- **User Details Fetching**: Retrieve and display user details from the Supabase database.
- **Compliance Checks**: 
  - **RLS Status**: Check if Row Level Security is enabled for the 'users' table.
  - **PITR Status**: Check if Point in Time Recovery is enabled.
- **Asynchronous Job Handling**: Submit compliance check jobs and track their status.

## Backend

### Setup

1. **Install Dependencies**:
   ```bash
   npm install express cors @supabase/supabase-js winston

2. **Configuration**:
   Replace the Supabase URL and API key with your own in the createClient function.
   
3. **Run the Server:**:
   ```bash
   node index.js

### API Endpoints
1. GET /check-rls: Checks the RLS status for the 'users' table.
2. GET /check-pitr: Checks the PITR status.


## Frontend

### Setup

1. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js axios

2. **Run the Application:**:
   ```bash
   npm start
