# GAIA AI

**Version:** 1.0  **Repository:** `alexey-max-fedorov/gaia-ai`

GAIA AI is a unified Perplexity Space that orchestrates a suite of domain-specialized skills under a single intelligent routing layer. Named after the master AI system from *Horizon Zero Dawn*, GAIA controls a set of subordinate functions — each a focused expert in its domain.

---

## How It Works

GAIA AI reads every incoming query and routes it to exactly one engine or skill:

- **Coding & reasoning** → `HEPHAESTUS_PROMPT.md` takes over completely as the new system prompt
- **All other domains** → The relevant `*_SKILL.md` is loaded and applied while GAIA identity is retained

Routing is handled by the `SYSTEM_INSTRUCTIONS.md` file, which is pasted into the Perplexity Space’s **System Instructions** field. All skill files live as **Space Files** and are loaded on demand.

---

## File Manifest

### Core

| File | Purpose |
|---|---|
| `SYSTEM_INSTRUCTIONS.md` | **→ Paste into Perplexity Space System Instructions field.** GAIA identity, full routing algorithm, overlap rules, model disclosure footer |
| `HEPHAESTUS_PROMPT.md` | Coding engine — Claude Code-inspired system prompt with Plan Mode, GitHub MCP workflow, and implementation rules |

### Skills (upload all as Space Files)

| File | Domain | HZD Inspiration |
|---|---|---|
| `HADES_SKILL.md` | Security & Pentesting | HADES — extinction failsafe; knows exactly how things break |
| `MINERVA_SKILL.md` | System Architecture (no code gen) | MINERVA — strategic analysis and codebreaking |
| `AETHER_SKILL.md` | Analytics, Data Science & ML | AETHER — detoxifying raw data into breathable insight |
| `POSEIDON_SKILL.md` | Quantitative Finance | POSEIDON — vast, deep, turbulent ocean systems |
| `DEMETER_SKILL.md` | DevOps & Platform Engineering | DEMETER — growing and sustaining the ecosystem everything depends on |
| `ARTEMIS_SKILL.md` | Product Management | ARTEMIS — managing diverse populations toward a living product |
| `ELEUTHIA_SKILL.md` | Legal Research | ELEUTHIA — *eleutheria* (freedom); the legal framework that defines it |
| `APOLLO_SKILL.md` | Creative Writing & Worldbuilding | APOLLO — knowledge repository; fulfilling what was denied |
| `ATHENA_SKILL.md` | Scientific Research | ATHENA — goddess of wisdom (9th skill; no HZD equivalent) |

---

## Perplexity Space Setup

1. Create a new Perplexity Space
2. Paste the full contents of `SYSTEM_INSTRUCTIONS.md` into the **System Instructions** field
3. Upload all remaining `.md` files as **Space Files**:
   - `HEPHAESTUS_PROMPT.md`
   - `HADES_SKILL.md`
   - `MINERVA_SKILL.md`
   - `AETHER_SKILL.md`
   - `POSEIDON_SKILL.md`
   - `DEMETER_SKILL.md`
   - `ARTEMIS_SKILL.md`
   - `ELEUTHIA_SKILL.md`
   - `APOLLO_SKILL.md`
   - `ATHENA_SKILL.md`
4. Set the Space model (Claude Sonnet recommended for reasoning depth)
5. Done — GAIA AI will automatically route queries to the appropriate skill

---

## Skill Routing Quick Reference

| Query type | Routed to |
|---|---|
| Write/debug/review code, repo work, implementation | HEPHAESTUS |
| Security review, threat modeling, pentest planning | HADES |
| Architecture & design, no code generation | MINERVA |
| Data analysis, ML pipelines, statistics | AETHER |
| Financial modeling, DCF, options, portfolio | POSEIDON |
| Kubernetes, Terraform, CI/CD, cloud infra | DEMETER |
| PRDs, roadmaps, user stories, competitive analysis | ARTEMIS |
| Contract review, legal research, compliance | ELEUTHIA |
| Fiction, worldbuilding, story structure, lore | APOLLO |
| Literature review, hypothesis, experiment design | ATHENA |

---

## Versioning

| Version | Date | Notes |
|---|---|---|
| 1.0 | March 2026 | Initial release — 9 skills + Hephaestus engine |

---

> GAIA & subordinate names inspired by Horizon Zero Dawn / Horizon Forbidden West
