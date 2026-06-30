// Kunaal's body of work, presented as a director's filmography.
// All projects are real; film metadata is a creative lens over the facts.

export const director = {
  name: "KUNAAL",
  fullName: "Boggavarapu Yuva Satya Kunaal",
  logline:
    "A B.E. AI & Data Science graduate from CBIT, founder of SQLumina, and builder of production-grade systems across AI pipelines, data engineering, automation, and SaaS.",
  email: "bhavikunaal@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/boggavarapu-yuva-satya-kunaal-127817290/" },
    { label: "GitHub", href: "https://github.com/Yuvakunaal" },
    { label: "dev.to", href: "https://dev.to/yuva_kunaal" },
    { label: "Email", href: "mailto:bhavikunaal@gmail.com" },
  ],
};

export type Film = {
  no: string;
  title: string;
  year: string;
  genre: string;
  runtime: string; // a playful "scope" measure
  rating: string; // status as a film certification
  synopsis: string;
  stack: string[];
  live: string | null;
  github: string | null;
};

export const films: Film[] = [
  {
    no: "01",
    title: "SQLumina",
    year: "2026",
    genre: "Large-Scale SaaS",
    runtime: "Feature",
    rating: "DEPLOYED · PRE-LAUNCH",
    synopsis:
      "A full structured SQL learning ecosystem — schema-aware lessons, practice environments, progressive challenges, and intelligent guidance. Built from the ground up to be the definitive place to master SQL. Production-grade SaaS architecture. Deployed; launch incoming.",
    stack: ["SaaS", "Full-Stack", "SQL Learning", "Production Architecture"],
    live: null,
    github: null,
  },
  {
    no: "02",
    title: "Habit Ink",
    year: "2026",
    genre: "Minimal SaaS",
    runtime: "Feature",
    rating: "IN THEATERS",
    synopsis:
      "A minimal, intentional habit-tracking SaaS for people who want clarity over clutter. No noise, no gamification gimmicks — just a clean daily rhythm that actually sticks. Live and growing.",
    stack: ["React", "Firebase", "Tailwind", "Framer Motion"],
    live: "https://habitink.vercel.app/",
    github: "https://github.com/Yuvakunaal/Habit-ink",
  },
  {
    no: "03",
    title: "AI Flowchart Studio",
    year: "2026",
    genre: "Multi-Agent AI",
    runtime: "Feature",
    rating: "IN THEATERS",
    synopsis:
      "Plain English to structured diagrams via a 4-stage Multi-Agent Orchestration pipeline: Orchestrator → Logic Parser → Generator → Syntax Validator. BYOK privacy architecture, SSE real-time streaming, 50-step undo/redo, export to PNG / SVG / Mermaid.",
    stack: ["FastAPI", "Gemini", "Mermaid.js", "Vanilla JS", "Render"],
    live: "https://ai-flowchart-studio.vercel.app",
    github: "https://github.com/Yuvakunaal/AI-Flowchart-Studio",
  },
  {
    no: "04",
    title: "CommitAI",
    year: "2026",
    genre: "Developer Tooling",
    runtime: "Short",
    rating: "OFFICIAL SELECTION",
    synopsis:
      "A local-first AI Git assistant. Reads staged diffs, prompts Ollama, normalizes output into Conventional Commits, writes the changelog, and completes the workflow — entirely on your machine. Built for the dev.to Gemma 4 Challenge (completion badge).",
    stack: ["Python", "Ollama", "Gemma 4", "Rich", "Git Hooks"],
    live: null,
    github: "https://github.com/Yuvakunaal/CommitAI",
  },
  {
    no: "05",
    title: "Kunaal's Illustrations",
    year: "2026",
    genre: "Open-Source Art",
    runtime: "Short",
    rating: "OFFICIAL SELECTION",
    synopsis:
      "An open-source Agent Skill guiding AI agents to generate clean, hand-drawn in-text illustrations — defining character IPs, style DNA, composition patterns, and QA rules. A complete visual language, not a prompt.",
    stack: ["Agent Skill", "Gemini", "Antigravity"],
    live: null,
    github: "https://github.com/Yuvakunaal/kunaal-illustrations",
  },
  {
    no: "06",
    title: "Query Forge AI",
    year: "2025",
    genre: "NL → SQL Engine",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "A production natural-language-to-SQL engine with schema-aware prompting. Understands database structure to generate accurate, optimized queries from plain English.",
    stack: ["FastAPI", "MySQL", "Mistral", "Python"],
    live: null,
    github: null,
  },
  {
    no: "07",
    title: "AnalyzeQuestion",
    year: "2025",
    genre: "RAG System",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "An AI-driven coding pattern detection system built with a retrieval-augmented pipeline for grounded analysis.",
    stack: ["RAG", "LLM", "Python"],
    live: null,
    github: null,
  },
  {
    no: "08",
    title: "ERP Intelligence Engine",
    year: "2025",
    genre: "Data Engineering",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "An end-to-end ETL pipeline with OCR-driven extraction automating the most time-consuming academic data workflows — saving 8+ hours every week.",
    stack: ["Python", "OCR", "ETL", "Automation"],
    live: null,
    github: null,
  },
  {
    no: "09",
    title: "ChatWithPDF",
    year: "2025",
    genre: "PDF Q&A",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "A PDF question-answering system with OCR grounding and LLM accuracy for reliable document interaction.",
    stack: ["RAG", "OCR", "LLM"],
    live: null,
    github: null,
  },
  {
    no: "10",
    title: "AI Voice Desktop Assistant",
    year: "2025",
    genre: "Voice Agent",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "A privacy-first voice agent with local AI architecture and sub-second response time.",
    stack: ["Python", "Local LLM", "TTS/STT"],
    live: null,
    github: null,
  },
  {
    no: "11",
    title: "Automation Systems",
    year: "2025",
    genre: "Workflow Automation",
    runtime: "Short",
    rating: "COMPLETE",
    synopsis:
      "Certificate generation, attendance monitoring, and HR workflow automation systems built around practical operational needs.",
    stack: ["Python", "Make.com", "Automation"],
    live: null,
    github: null,
  },
];

// "The Craft" — disciplines as below-the-line film departments.
export const departments = [
  {
    dept: "DIRECTION",
    role: "AI / LLM Engineering",
    skills: [
      "Multi-Agent Orchestration",
      "Prompt Engineering",
      "RAG Systems",
      "Ollama",
      "Claude · Gemini · GPT",
      "Mistral · LLaMA · Gemma 4",
    ],
  },
  {
    dept: "CINEMATOGRAPHY",
    role: "Frontend & Full-Stack",
    skills: ["HTML", "CSS", "JavaScript (ES6+)", "Glassmorphic UI", "Dark/Light Theming", "SSE"],
  },
  {
    dept: "PRODUCTION",
    role: "Backend & APIs",
    skills: ["Python", "FastAPI", "Flask", "REST", "Socket.IO", "Gunicorn"],
  },
  {
    dept: "EDITING",
    role: "Data & Analytics",
    skills: ["SQL", "Pandas", "NumPy", "ETL Pipelines", "OCR", "Make.com"],
  },
  {
    dept: "SOUND & STORAGE",
    role: "Databases & Infra",
    skills: ["MySQL", "SQLite", "Neon", "Supabase", "Firebase", "Vercel", "Render", "Docker"],
  },
];

export const productionLog = [
  { year: "2020", title: "Opening Frame", note: "10th Class — 10 / 10 CGPA · Sri Chaitanya Techno School" },
  { year: "2021–22", title: "Establishing Shots", note: "Intermediate, MPC — 970 / 1000 · Sri Chaitanya Junior Kalasala" },
  { year: "2022", title: "Principal Photography", note: "Began B.E. AI & Data Science · CBIT" },
  { year: "2025", title: "First Cut", note: "First build wave — NL→SQL & RAG engines, OCR pipelines, a voice agent, and automation systems" },
  { year: "2026", title: "Going Wide", note: "AI Flowchart Studio · CommitAI · Habit Ink · Kunaal's Illustrations" },
  { year: "2026", title: "Final Grade", note: "Graduated CBIT — 9.16 / 10 · First Class with Distinction" },
  { year: "Now", title: "The Feature", note: "SQLumina deployed — large-scale SQL learning SaaS, launch incoming" },
];

export const laurels = [
  { honor: "TOP 18%", body: "LeetCode · 200+ Problems Solved" },
  { honor: "5★ MASTER", body: "HackerRank · Python" },
  { honor: "4★", body: "HackerRank · Problem Solving" },
  { honor: "2★ RATED", body: "CodeChef" },
  { honor: "BADGE", body: "dev.to · Gemma 4 Challenge" },
  { honor: "9.16 / 10", body: "B.E. AI & DS · CBIT" },
  { honor: "CERTIFIED", body: "IBM · Infosys · NASSCOM" },
  { honor: "CERTIFIED", body: "Salesforce · IIT Hyderabad" },
];
