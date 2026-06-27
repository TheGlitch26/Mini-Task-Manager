# TaskFlow

TaskFlow is a lightweight task management app built for our team to track work in real time. Anyone can view the current state of all tasks without needing an account, but only authenticated team members can create, update, or move tasks. It's designed to be simple, fast, and just functional enough for a small group to stay in sync without the overhead of a full project management tool.

🔗 **Live App:** [https://your-taskflow-app.vercel.app]([https://your-taskflow-app.vercel.app](https://mini-task-manager-bay.vercel.app/))

## Overview

We built TaskFlow to solve a small but real problem: we wanted a shared space to track what each of us was working on, without setting up a heavy backend or paying for tools we'd barely use. The app reads and writes directly to Supabase from the frontend, so there's no separate API server to maintain. Authentication is handled entirely through Supabase Auth, and only our team's accounts exist in the system, there's no public sign-up flow, since the whole point is to keep editing access restricted to the four of us.

Visitors who land on the site can immediately see every task and its current status. If they want to make changes, they're prompted to log in, and only our pre-created accounts can do that.

## Features

- **Public read access** — anyone visiting the site can view all tasks and their statuses without logging in
- **Restricted write access** — only authenticated team members can create, edit, move, or delete tasks
- **Dual view modes**:
  - **List view** — a clean, scrollable list of all tasks
  - **Board view** — a Kanban-style layout with three columns: **To Do**, **In Progress**, and **Done**
- **Persistent storage** powered by Supabase, so tasks stay saved across sessions and devices
- **No sign-up page** — accounts are pre-provisioned for our team only, keeping the app closed to outside edits

## Tech Stack

- **Frontend:** React, Next.js
- **Database:** Supabase (Postgres)
- **Authentication:** Supabase Auth
- **Hosting:** Vercel

There's no standalone backend, Next.js handles routing and rendering, while Supabase takes care of data persistence and auth in one place.

## How It Works

1. On load, the app fetches all tasks from Supabase and displays them publicly, no login required.
2. Users can toggle between a list view and a board view to see tasks organized by status.
3. If someone wants to add or modify a task, they're asked to log in.
4. Once authenticated, team members get full access to create, edit, move between board columns, or delete tasks.
5. Logged-out visitors retain read-only access at all times.

## Getting Started (Local Development)

If you'd like to run this project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/taskflow.git

# Navigate into the project
cd taskflow

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Team

TaskFlow was built by a team of four:

- **Shebnem Muradova**
- **Nihad Bagirzade**
- **Mohsin Ismayilov**
- **Yaqut Rasulbayli**

---

Built with effort as a team project to keep ourselves organized.
