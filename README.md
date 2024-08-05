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

# Approach for Asynchronous Processing

### 1. Using Background Jobs for Asynchronous Execution
I can implement a background job processing system to handle the compliance checks asynchronously. This way, the API requests can be handled quickly by delegating the heavy lifting to background tasks.

### 2. Using a Message Queue System
I can integrate a message queue system like RabbitMQ or Redis Queue (RQ) to manage and distribute the tasks. This allows you to handle a high volume of tasks and scale easily.

### 3. Implementing a Job Status Tracking
We could maintain the status of each job to track its progress and retrieve results. This can be done using a database or a job management tool.


# Compliance Checks and Configurations

This document provides instructions for configuring and managing Multi-Factor Authentication (MFA), Row Level Security (RLS), and Point in Time Recovery (PITR) in Supabase.

## 1. Multi-Factor Authentication (MFA)

**Issue:** MFA is not enabled for all users.

**Automatic Fix:** Enable MFA for all users.

**Commands/Tutorial:**

**Supabase CLI:**
Supabase does not provide direct CLI commands for enabling MFA for users.

**Manual Tutorial:**

1. Log in to the [Supabase Dashboard](https://app.supabase.com).
2. Go to the **Authentication** section.
3. Navigate to the **Settings** tab.
4. Enable MFA for user accounts by configuring settings.

*Note:* Automating MFA configuration is not directly supported in the current CLI tools.

## 2. Row Level Security (RLS)

**Issue:** RLS is not enabled for databases.

**Automatic Fix:** Enable RLS for all tables in the databases.

**Commands/Tutorial:**

**SQL Commands:**

If RLS is not enabled, you can enable it using SQL commands

```sql
-- Enable RLS for a specific table
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow specific actions
CREATE POLICY select_policy
  ON your_table
  FOR SELECT
  USING (auth.uid() = user_id);
```

## 3. Point in Time Recovery (PITR)

**Issue:** PITR is not enabled.

**Automatic Fix:** Enable PITR for your databases.

**Commands/Tutorial:**

### Supabase Dashboard:

1. Go to the **Database** section in your Supabase Dashboard.
2. Find the database you want to configure.
3. Check if PITR is enabled under the database settings.

### SQL Commands:

PITR is usually managed at the database provider level and is not directly configurable through SQL commands for individual databases. Supabase handles PITR at its infrastructure level

### Support/Documentation:

- Contact [Supabase Support](https://supabase.com/support) to enable PITR if it’s not visible in the dashboard settings.
- Consult [Supabase Documentation](https://supabase.com/docs) for the latest information on PITR configuration.

## Example Automated Tutorial for Each Issue

### MFA Configuration Tutorial:

1. Log in to [Supabase Dashboard](https://app.supabase.com).
2. Go to **Authentication** → **Settings**.
3. Enable Multi-Factor Authentication.
4. Apply MFA settings to all user accounts.

### RLS Configuration Tutorial:

1. Open SQL Editor in Supabase Dashboard.
2. Run the dynamic SQL script to enable RLS for all tables.
3. Create policies as needed for your use case.

### PITR Configuration Tutorial:

1. Check database settings in Supabase Dashboard for PITR.
2. Contact Supabase support if PITR is not visible.
3. Follow the guidelines provided by Supabase for PITR.
