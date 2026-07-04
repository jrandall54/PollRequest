# PollRequest

PollRequest is a real-time, interactive classroom response system designed for Computer Science education. Inspired by Kahoot! but tailored for programming classes, it allows teachers to host live quizzes with syntax-highlighted code blocks, and enables students to join on their mobile devices using a simple code.

The system uses Firebase anonymous authentication to track student profiles and performance across multiple sessions without requiring full registration, making it quick and easy to use in a classroom environment.

---

## Key Features

- **Real-Time Synchronisation**: Uses Cloud Firestore listeners to keep projector and mobile screens in perfect sync.
- **CS-Themed Design System**: Built with modern typography (Inter & JetBrains Mono), responsive design, and CSS custom property themes (Light, Dark, and Colorful).
- **Code Block Highlighting**: Full Prism.js syntax highlighting with specialized support for Java, Python, C/C++, and C#.
- **Student Identity**: Students enter a name and select from a library of 30+ custom SVG line-art icons.
- **Scoring Engine**: Evaluates answers with linear speed bonuses, partial credit for multi-select questions, and scaling streak bonuses.
- **Question Bank Manager**: Create, update, or delete questions directly from the UI.
- **Bulk Imports**: Import question sets directly from Markdown or JSON files.
- **Teacher Analytics**: Access dashboard analytics tracking student accuracy, average response times, question difficulty ratings, and session histories.
- **Data Portability**: Export student, question, and session data directly to CSV or JSON formats.

---

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES Modules), HTML5, custom CSS.
- **Build Tooling**: Vite.
- **Database & Auth**: Firebase Firestore (NoSQL database) and Firebase Anonymous Authentication.
- **Syntax Highlighting**: Prism.js.

---

## Quick Start

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) installed.

### 2. Installation
Clone the repository, navigate into the project directory, and install dependencies:

```bash
npm install
```

### 3. Firebase Configuration
PollRequest requires a Firebase project to operate.
1. Refer to the step-by-step instructions in the [SETUP.md](SETUP.md) file to create a project on the Firebase console.
2. Once created, paste your project's configuration values inside the `src/firebase.js` configuration block.

### 4. Running Locally
Start the local development server:

```bash
npm run dev
```

To expose the development server to your local network (so you can test the student interface on a mobile device connected to the same Wi-Fi):

```bash
npm run dev -- --host
```

---

## Project Structure

```text
├── .github/workflows/   # GitHub Actions build and deploy workflows
├── public/              # Static assets (favicon)
├── sample-questions/    # Sample questions and format documentation
├── src/
│   ├── components/      # UI components (timer, charts, modals, etc.)
│   ├── screens/         # Page controllers (host views, player views)
│   ├── services/        # Service layers (auth, sessions, scoring, analytics)
│   ├── styles/          # Modular CSS stylesheets and themes
│   ├── utils/           # Helper scripts and application constants
│   ├── firebase.js      # Firebase configuration and initialization
│   ├── main.js          # App entry point and routing manager
│   └── router.js        # Single Page Application router
├── index.html           # Main HTML document entry point
├── package.json         # Dependencies and project scripts
├── SETUP.md             # Firebase configuration guide
└── vite.config.js       # Vite configuration file
```

---

## Deployment

This repository includes a GitHub Actions workflow that automatically builds and deploys the app to GitHub Pages on every push to the `main` branch.

To configure GitHub Pages:
1. Go to your repository settings on GitHub.
2. Navigate to **Pages** under the Code and Automation section.
3. Set the source build option to **GitHub Actions**.
4. Push your changes to `main` to trigger the build and deploy.
