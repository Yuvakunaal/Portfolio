---
title: "Inside a 4-stage multi-agent pipeline (FastAPI + Gemini)"
description: "The architecture behind AI Flowchart Studio: a 4-stage multi-agent LLM pipeline — Orchestrator, Logic Parser, Generator, Validator — that turns plain English into rendered diagrams."
date: "2026-03-04"
tags: ["AI", "Multi-Agent Systems", "LLM", "FastAPI", "Architecture"]
project: "AI Flowchart Studio"
projectUrl: "https://ai-flowchart-studio.vercel.app"
---

"Multi-agent" gets thrown around a lot. In **AI Flowchart Studio** it means something concrete: instead of asking one model to do the whole job — *turn this paragraph into a correct, renderable diagram* — I split the job across four specialists, each with one responsibility and one output contract.

## Why split it at all

A single prompt that has to validate intent, decompose logic, generate syntax, *and* self-correct will do all four jobs at about 70%. Each handoff in a pipeline is a chance to enforce a contract and fail fast. The result is less "magic," more **debuggable** — when a diagram comes out wrong, I know exactly which stage to look at.

## The four stages

1. **Orchestrator** — decides whether the request can even be a flowchart. A prompt like *"explain photosynthesis"* gets rejected here with a helpful message, before any tokens are wasted downstream.
2. **Logic Parser** — decomposes the text into a structured graph of **nodes and edges** as JSON. This is the most important stage: get the graph right and rendering is mechanical.
3. **Generator** — converts that graph into optimized [Mermaid.js](https://mermaid.js.org/) syntax. It never sees the original prose, only the validated graph — which keeps it honest.
4. **Syntax Validator** — catches rendering anomalies *before* the output reaches the browser, so users never see a broken diagram.

```text
"user signs up, we email them, they verify"
   → Orchestrator (yes, this is a flow)
   → Logic Parser ({nodes:[...], edges:[...]})
   → Generator (graph TD; A-->B; ...)
   → Validator (renders cleanly ✓)
```

## Streaming the pipeline, not just the answer

Because each stage is discrete, I stream the *stage status* over [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) — the UI shows "Parsing logic…", "Generating diagram…" as they happen. It turns a 6-second wait into a progress story, and it's free once your backend is already staged.

## BYOK by design

The whole thing is **Bring Your Own Key**: the user's Gemini key lives in their browser, never on my server, and nothing is retained. Splitting the pipeline made this easier, not harder — there's exactly one place that talks to the model, so there's exactly one place to keep keyless.

## The takeaway

Multi-agent isn't about having *more* models. It's about giving each model a **smaller, contract-bound job** so the system as a whole is inspectable. Try it on [AI Flowchart Studio](https://ai-flowchart-studio.vercel.app), or read the [source](https://github.com/Yuvakunaal/AI-Flowchart-Studio).
