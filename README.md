# 🤖 AutoBot Studio

A React dashboard with **6 AI-powered automation bots** built on the Claude API (Anthropic). Clean dark UI, real utility, portfolio-worthy code.

![AutoBot Studio](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react) ![Claude API](https://img.shields.io/badge/Claude-API-orange?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

---

## ✨ Bots Included

| Bot | What it does |
|-----|-------------|
| ✉ Email Writer | Draft professional emails from context + tone |
| ◈ Resume Analyzer | Match % score + gaps between resume & job description |
| </> Code Explainer | Explain any code in plain English |
| in LinkedIn Post | Generate viral LinkedIn posts in multiple styles |
| ⚠ Bug Fixer | Debug code, explain the fix |
| ✦ Tweet Thread | Turn any topic into a tweet thread |

---

## 🚀 Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/autobot-studio.git
cd autobot-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your Anthropic API key
Create a `.env` file:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 4. Update the fetch call
In `AutoBotStudio.jsx`, add the API key header:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
},
```

### 5. Run
```bash
npm run dev
```

---

## 🗂️ Project Structure
```
autobot-studio/
├── src/
│   ├── AutoBotStudio.jsx   # Main component (all bots)
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack
- **React 18** + Vite
- **Anthropic Claude API** (claude-sonnet)
- Pure inline styles (no CSS framework needed)

---

## 📌 Notes
- Never expose your API key in production — use a backend proxy
- All prompts are customizable in the `BOTS` array at the top of `AutoBotStudio.jsx`
- Each bot's behavior is controlled by its `system` prompt — easy to extend

---

## 🤝 Contributing
Fork it, add more bots, submit a PR!

---

Made with ⚡ by [Mannat](https://github.com/mannat-0776)
