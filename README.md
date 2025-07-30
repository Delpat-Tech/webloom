# 🚀 Delpat Website

> **The Execution Engine for Founders & Teams**  
A modern, high-trust web presence for Delpat — the team that builds MVPs, automations, and internal tools for ambitious startups and scaling teams.

---

## 🧰 Tech Stack

- **Frontend:** React + Vite + TypeScript  
- **Styling:** TailwindCSS + ShadCN UI  
- **Animation:** Framer Motion  
- **Icons:** Lucide React  
- **Backend (Optional APIs):** Express.js (Node)  
- **Tooling:** ESLint, Prettier, Git, Vercel 

---

## ⚙️ Setup Instructions

```
1. Clone the repo
git clone https://github.com/Delpat-Tech/delpat.git
cd delpat

2. Install dependencies
pnpm install
or
npm install
or
yarn install
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Optional: Environment variables for additional features
# (No external API keys required for basic functionality)
```

**Note:** The GeoMap component now uses React Simple Maps, which doesn't require any external API keys. The map is fully functional out of the box.

## 🚀 Run Locally
```
1. Start the dev server
pnpm dev
or
npm run dev
```
**Access the app at:** http://localhost:5173

## 🧪 Build for Production
```
1. Generate optimized production build
pnpm build
 or
npm run build
```
## 🌐 Deployment
You can deploy the frontend via Vercel, Firebase Hosting, or any static site host.

🔸 Vercel 

- Push your code to GitHub
- Go to vercel.com
- Click "New Project" → Import the repo
- Set build command: pnpm build
- Set output directory: dist
- Hit Deploy


## 📂 Project Structure
```
.
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level components (Home, About, etc.)
│   ├── sections/       # Full page sections (Hero, Services, etc.)
│   ├── utils/          # Utilities/helpers
│   └── main.tsx        # App entry point
├── express/            # (Optional) Backend API routes
├── tailwind.config.ts
├── vite.config.ts
└── README.md

```