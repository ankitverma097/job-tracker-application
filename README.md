## Jaipur Job Tracker

Simple job-tracking dashboard focused on hourly/shift work around Jaipur. You can filter jobs by company, type, salary range, and distance from the city center, then apply/withdraw and see your applied list.

---

## Demo

**Local demo**

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

You can apply to jobs, change filters, and refresh the page to see that applied jobs are persisted in local storage.

---

# Setup & Run

- Requirements: Node 20+, npm
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` then `npm start`

# No environment variables are required.
All job data is loaded from: src/data/jobs.json

# Architecture Overview
---Built using Next.js (App Router).
---The main page is located at:  src/app/page.tsx
---This file renders the complete dashboard UI.


# State Management

-Filter state (company, type, salary range, distance) is managed locally inside the Dashboard component.
-Applied job IDs are managed globally using JobContext (src/context/JobContext.tsx).
-Persistence is handled through a reusable useLocalStorage hook so applied jobs remain after page refresh.
-This avoids prop drilling and keeps global state centralized.


# Data Handling
-Job data is stored locally in: src/data/jobs.json

# Distance from Jaipur center is calculated on the client using a  formula inside:

-src/lib/distance.ts

# Jaipur coordinates and configuration values are stored in:
-src/lib/constants.ts


# UI Structure

-Styled using Tailwind CSS v4.
-Main reusable components:
-FiltersPanel
-TypeChips
-JobList
-AppliedJobList
-JobCard


# Static JSON Data

-The assignment requires local JSON only, so there is no backend.

# Client-side Filtering & Distance Calculation

-All filtering and distance computation happen in memory on the client.
This works well for small datasets but would not scale efficiently for very large datasets without pagination or server-side filtering.

# Local Storage Persistence

-Applied jobs are stored in localStorage, which means:
-Data persists after refresh
-It works per browser and per device
-No cross-device synchronization


# What I’d Do Next
-Add Backend & API
-Move job data to a database (e.g., Postgres or Mongodb etc.) and expose via API routes.
-Implement server-side filtering, sorting, and pagination.

# Add Authentication
-we can add the functionality of authentication of the user and can create individual  dasboard for user so they can login and see the job . Also can see how many jobs applied by them 

# Add Job Detail Page

-Create dynamic routes for individual job details including:
-Full description
-Requirements





