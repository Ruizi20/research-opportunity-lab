# Research Opportunity Lab instructions

- Produce English dashboard text, run summaries, and documentation. Preserve original source titles where necessary for provenance.
- The dashboard is a static record viewer. Do not imply that playback or import runs a live agent, browses the web, or schedules updates.

- When the user asks to run, refresh, or demonstrate the research opportunity radar, read `config/research_brief.json`, `prompts/RESEARCH_INTELLIGENCE.md`, `prompts/ORCHESTRATOR.md`, and `config/run-template.json` before starting.
- Use subagents for the independent roles specified in `prompts/ORCHESTRATOR.md` when collaboration tools are available. State clearly if the current session does not support subagents.
- Treat information collection as the first and most important stage. Verify event dates, affected entities, before/after conditions, and primary-source URLs before generating research ideas.
- Browse for current information. Prefer primary official sources; use secondary reporting only to supplement context and impact.
- Distinguish confirmed facts, inferences, and unknowns. Never invent sources or infer a research gap merely because a search returned no paper.
- Preserve rejected events, failed ideas, reviewer objections, and revisions in the run record.
- The Supervisor alone writes the combined result to `runs/run-latest.json` and `dist/run-latest.json`; subagents return their outputs without concurrently editing those files.
- Keep `dist/index.html` unchanged during ordinary radar runs. It is the presentation dashboard and imports the generated JSON record.
