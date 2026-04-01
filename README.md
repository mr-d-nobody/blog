# Blog Platform

A modern blog platform built with React.js, Vite, and Tailwind CSS.

## Features

- User registration and login with local storage
- User profiles
- Create and read blog posts
- Add comments to posts
- Real-time comment updates
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:** React.js with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **Data Storage:** Browser localStorage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. Register a new user account
2. Login with your credentials
3. Create blog posts
4. View posts and add comments
5. Manage your profile

## Data Storage

All data (users, posts, comments) is stored in browser localStorage. Data persists across sessions but is local to each browser.

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Project Structure

- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components (Home, Login, etc.)
  - `context/` - React Context for state management
  - `App.jsx` - Main application component
  - `main.jsx` - Application entry point
- `index.html` - HTML template
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
