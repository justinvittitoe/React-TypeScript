# React-TypeScript Candidate Viewer

A modern, GitHub-integrated candidate viewer built with **React** and **TypeScript**. Users can swipe through GitHub profiles, save potential candidates, and manage a list of saved profiles — all with persistent state management via `localStorage`.

> Developed by [justinvittitoe](https://github.com/justinvittitoe)

---

## 🚀 Features

- 🔍 **Candidate Discovery**: Pulls random users from GitHub and displays detailed info.
- ➕ **Save Candidates**: Add profiles to a persistent “Saved Candidates” list.
- ❌ **Reject Functionality**: Remove saved profiles at any time.
- 💾 **LocalStorage Sync**: Persist state across sessions.
- 💡 **React Router v6**: Clean routing between views.
- ⚛️ **React + TypeScript**: Strongly typed, maintainable, and scalable architecture.

---

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **React Router v6**
- **GitHub REST API**
- **Tailwind CSS** (optional)
- **LocalStorage** for persistence

---

## 🧱 Project Structure

src/ │ ├── api/ 
# GitHub API functions 
├── assets/ 
# Static assets (e.g. images) 
├── components/ 
# Reusable UI components 
├── interfaces/ 
# TypeScript interfaces 
├── pages/ 
# Page-level components 
│ ├── CandidateSearch.tsx │ 
└── SavedCandidates.tsx 
├── App.tsx 
# Main app with state and routing context 
├── main.tsx 
# Entry point with RouterProvider 
└── index.css # Global styles

---
##
## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/justinvittitoe/react-typescript.git
cd react-typescript

npm install

npm run dev
```
## ⚙️ Environment
This app uses public endpoints from the GitHub REST API. No authentication is required by default. If you encounter rate limits, you may configure an access token.

## 📄 License
This project is open source under the MIT License.

## 👤 Author
Justin Vittitoe
📍 GitHub: @justinvittitoe

## Deployed Site
https://react-typescript-ee4y.onrender.com
