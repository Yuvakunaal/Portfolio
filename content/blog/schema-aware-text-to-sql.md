---
title: "Schema-aware text-to-SQL: prompting LLMs to write correct queries"
description: "Lessons from building Query Forge AI and SQLumina — why naive natural-language-to-SQL hallucinates, and how feeding the schema makes LLM-generated queries actually correct."
date: "2026-04-18"
tags: ["AI", "SQL", "RAG", "Prompt Engineering", "Data"]
project: "Query Forge AI"
projectUrl: "https://github.com/Yuvakunaal"
---

Ask a language model to "show me the top 10 customers by revenue" and it will happily write SQL. Whether that SQL runs against *your* database is another question entirely. Naive text-to-SQL fails for one boring reason: **the model is guessing your schema.** It invents table names, mis-types columns, and joins on fields that don't exist.

I ran into this building **Query Forge AI** (a natural-language-to-SQL engine) and again while designing the practice environment for **SQLumina**. The fix is the same in both: stop making the model guess.

## Give it the schema, not just the question

The single highest-leverage change is to put the relevant schema *in the prompt*: table names, columns, types, and the foreign-key relationships. Suddenly the model isn't a fortune teller — it's a translator with a dictionary.

```text
Schema:
  customers(id, name, country)
  orders(id, customer_id → customers.id, total_cents, created_at)

Question: top 10 customers by revenue
→ SELECT c.name, SUM(o.total_cents) AS revenue
  FROM customers c JOIN orders o ON o.customer_id = c.id
  GROUP BY c.id ORDER BY revenue DESC LIMIT 10;
```

## When the schema is too big to paste

Real databases have hundreds of tables — you can't dump them all into context. This is where **retrieval** earns its keep: embed the schema (table + column descriptions), retrieve only the tables relevant to the question, and inject *those*. It's RAG, but the "documents" are schema fragments. You get correctness without blowing the context window.

## Validate like a compiler, not a vibe

LLM SQL should be treated as untrusted input:

- **Parse it** before you run it — reject anything that isn't a single read statement.
- **Bound it** — inject a `LIMIT`, run against a read-only role, time it out.
- **Explain it back** — show the user the query *and* a plain-English summary so they can catch a wrong join before it returns wrong numbers.

## Why this matters for learning, too

SQLumina flips the same idea: instead of hiding the schema, it *teaches* it. Schema-aware prompting and schema-aware learning turn out to be the same problem viewed from two sides — once you understand the shape of the data, both the model and the human write better queries.

Text-to-SQL isn't magic and it isn't hopeless. It's a translation task that lives or dies on context. Feed the schema, retrieve when it's big, validate always.
