---
title: "Building CommitAI — a local-first AI git assistant with Ollama"
description: "How I built CommitAI: an offline, zero-key git assistant that turns staged diffs into clean Conventional Commits using a local LLM via Ollama and Gemma."
date: "2026-02-12"
tags: ["AI", "Developer Tools", "Ollama", "Local LLM", "Python"]
project: "CommitAI"
projectUrl: "https://github.com/Yuvakunaal/CommitAI"
---

Writing commit messages is the most repetitive part of every developer's day — and the easiest to do badly. **CommitAI** is my answer: a local-first CLI that reads your staged diff, asks a model running on your own machine to summarize it, and writes a clean [Conventional Commit](https://www.conventionalcommits.org/) — no cloud, no API keys, no diff ever leaving your laptop.

## Why local-first

Most "AI commit" tools ship your code diff to a hosted API. For a lot of teams that's a non-starter: the diff *is* the source code. CommitAI runs entirely against [Ollama](https://ollama.com/), so the only thing that touches your code is a model file sitting on your own disk. It works on a plane, behind a firewall, on 8GB of RAM.

## The pipeline

The flow is deliberately small — four stages, each easy to reason about:

1. **Read** the staged diff (`git diff --cached`).
2. **Prompt** a local model (I default to `gemma` via Ollama) with a tightly-scoped instruction: summarize *what changed and why*, not line-by-line.
3. **Normalize** the model's output into the Conventional Commit grammar (`type(scope): subject`), clamping the subject length and inferring the type from the diff.
4. **Complete** the workflow — write the `CHANGELOG.md` entry, optionally generate a PR description, and hand control back to git.

```text
Staged diff  →  Ollama (Gemma)  →  normalize  →  feat(api): add streaming endpoint
```

## The prompt is the product

The hard part isn't calling the model — it's getting *deterministic, structured* output from a small local model. A few things that moved the needle:

- **Constrain the shape, not just the content.** I ask for the type, scope and subject as separate fields, then assemble the commit myself. Letting the model freeform the whole line invites hallucinated scopes.
- **Give it the diff, not the files.** A diff already encodes intent (additions vs deletions). Feeding whole files buries the signal.
- **Validate before you trust.** A tiny post-processor rejects empty subjects, over-long lines, and types that don't match the change, then retries once.

## What I'd tell my past self

Small models reward small prompts. Every time I added "be concise and professional and clear and…" the output got *worse*. The win came from removing instructions and adding structure — exactly the same lesson that shows up again in multi-agent systems.

CommitAI is open source — [read the code on GitHub](https://github.com/Yuvakunaal/CommitAI). It earned a completion badge in the dev.to Gemma 4 Challenge, but the real payoff is that I haven't hand-written a commit message in months.
