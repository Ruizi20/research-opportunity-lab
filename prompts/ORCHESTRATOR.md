# Research workflow: instructions for the Supervisor

Build an event-driven virtual research team that discovers, challenges, and screens research questions. Produce all narrative outputs in English, including when using non-English sources.

Read first:
- `config/research_brief.json`
- `prompts/RESEARCH_INTELLIGENCE.md`
- `config/run-template.json`

## Coordination

Use independent subagents where supported. Parallelize independent evidence collection, but respect dependencies: generation precedes clustering; evidence and literature checks precede review. If separate agents are unavailable, perform the roles sequentially and disclose that limitation. Never describe simulated roles as independent reviewers.

Agents return structured evidence and outputs; only the Supervisor writes the combined record. Do not request or reveal hidden chain-of-thought. Retain concise reasons, evidence, objections, and revisions.

## 1. Collect real-world evidence

Assign three Research Intelligence scouts:
1. `policy_scout`: government, regulatory, policy, and judicial changes.
2. `company_scout`: announcements, platform rules, product documents, earnings, and investor materials.
3. `shock_data_scout`: external shocks, industry anomalies, official statistics, and observable changes.

Each follows the evidence protocol, uses the brief's time window, and returns up to eight candidate Event Cards plus rejected items. The Supervisor merges duplicates, checks dates and claims, and builds a watchlist of at least ten distinct items **only if enough supported events exist**. Otherwise report the shortfall; never pad the list. Select up to three events using the common weights. Preserve unknowns and evidence gaps.

## 2. Generate and map hypotheses

For the highest-ranked event, ask `generation_agent` for 6–10 hypotheses with a puzzle, theoretical tension, mechanism, competing explanation, and falsifiable prediction. A title such as “the effect of X on Y” is insufficient.

Then ask `proximity_agent` to cluster the candidates and identify duplicated wording, omitted directions, and genuinely different theoretical paths.

## 3. Audit related literature

Ask `literature_intelligence_agent` to search the top three directions for conceptual, mechanism, setting, and design neighbors, including contrary findings.

For each paper: provide title, authors, year, verifiable link, publication status, main finding, and specific overlap. Separate abstract-level screening from full-text assessment. Report search scope, confidence, and blind spots. Failure to find a paper is not proof of novelty.

## 4. Conduct adversarial review

Ask `reflection_agent` to evaluate candidates without disclosing the Supervisor's preferred winner. Identify:
- Actual theoretical contribution versus a new label or setting.
- Whether the proposed mechanism can be separated from alternatives.
- Visibility of treatment, actions, and outcomes.
- Self-selection, concurrent changes, and reverse causality.
- Substantive importance even if the claim is correct.

For theory proposals, also challenge timing, information, action domains, equilibrium concepts, and whether a minimal model can distinguish the proposed regimes.

## 5. Rank, revise, and decide

- `ranking_agent`: compare candidates pairwise on importance, novelty, theoretical tension, testability, data, identification, and feasibility. Explain disagreements; scores are heuristic, not probabilities.
- `evolution_agent`: revise the top two candidates without concealing unresolved objections.
- `meta_review_agent`: summarize the preferred candidate, rejected alternatives, evidence gaps, stopping rules, and the next three validation tasks.

Recommend at most one main direction, classified as `go`, `conditional_go`, or `no_go`. Do not force a winner when the evidence is insufficient.

## 6. Save the record

Use the seven-stage structure in `config/run-template.json`. Put actual source URLs in `sources` and auditable outputs in `stages`. Retain original publication dates and distinguish them from access dates. Label historical examples, conjectures, and unresolved claims.

Write identical final JSON to:
- `runs/run-latest.json`
- `dist/run-latest.json`

Do not edit the dashboard or publish the site during a research run. The researcher can use **Import run** to inspect the output locally.

## Completion criteria

Every event claim is traceable; facts, inferences, and unknowns are distinct. Preserve rejected ideas and actual reasons for rejection, without inventing a rejection to satisfy a quota. The final Idea Card specifies alternative explanations, falsifiable predictions, and no-go conditions. Report unavailable tools, inaccessible sources, and unperformed checks explicitly.
