# Morphology Candidate Layer

This document defines an intermediate candidate format for deriving chart updates from dictionary-style corpora before editing `morphology-chart/data/charts.json`.

## Why this layer exists

Raw dictionary matches are noisy. Orthographic overlap does not always imply derivational relation. The candidate layer keeps evidence and confidence separate from curated chart output.

## Pipeline

1. Extract lemmas and definitions from ena.ge records.
2. Generate candidate relations with confidence scores.
3. Review and approve/reject candidates.
4. Project only approved items into morphology charts.

## Candidate file format

Store one file per target token/root (for example `შეცვლ-candidates.json`, `ცვალ-candidates.json`).

```json
{
  "root": {
    "id": "root-dzl",
    "ka": "ძლ-",
    "en": "strong / strength"
  },
  "generatedAt": "2026-05-03T11:00:00+04:00",
  "source": {
    "provider": "ena.ge",
    "sourceFiles": [
      "websites/corp-txt/ძლ-ენა.txt",
      "websites/corp-txt/ძალ-ენა.txt"
    ]
  },
  "summary": {
    "totalCandidates": 0,
    "highConfidence": 0,
    "mediumConfidence": 0,
    "lowConfidence": 0
  },
  "candidates": [
    {
      "lemma": "გაძლიერება",
      "normalizedLemma": "გაძლიერება",
      "definitionSnippet": "…",
      "posGuess": "verbal noun",
      "relation": "derived_from",
      "parentLemma": "ძლიერი",
      "pattern": "prefix/suffix heuristic",
      "confidence": 0.93,
      "evidence": [
        {
          "type": "definition_signal",
          "text": "contains: ზმნის მოქმედებისა"
        },
        {
          "type": "suffix_match",
          "text": "matched -ება"
        }
      ],
      "nplg": {
        "found": true,
        "matchCount": 1,
        "bestTerm": "გაძლიერება",
        "enGloss": "strengthening; making stronger",
        "searchUrl": "http://www.nplg.gov.ge/gwdict/index.php?...",
        "termUrl": "http://www.nplg.gov.ge/gwdict/index.php?a=term&d=46&t=123"
      },
      "status": "candidate",
      "review": {
        "decision": "pending",
        "reviewer": "",
        "notes": ""
      }
    }
  ]
}
```

Use repository-relative paths in `source.sourceFiles` (never machine-specific absolute paths).

## Relation labels

- `derived_from`: likely derivation; chart-eligible
- `compound_with`: likely compound tied to the root; chart-eligible after review
- `variant_of`: spelling/register/archaism variant; usually note-level, not a new node
- `semantic_neighbor`: semantically related but unclear morphology; usually evidence-only
- `orthographic_neighbor`: string overlap without derivational confidence; exclude from chart

## Confidence rubric

Suggested additive scoring:

- `+0.35` definition contains derivational signal (e.g. `ზმნის მოქმედებისა`)
- `+0.20` suffix/pattern match (e.g. `-ება`, `-ებული`, `-ობა`, `-ი`)
- `+0.15` parent lemma exists in the same candidate root set
- `+0.10` POS guess is coherent with suffix
- `+0.10` already present in chart (existing curation support)
- `-0.30` likely orthographic neighbor from exclusion list
- `-0.20` weak/ambiguous evidence

Interpretation:

- `>= 0.80`: high confidence
- `0.55 - 0.79`: medium confidence
- `< 0.55`: low confidence

## Projection rules into charts

- Include only `review.decision == approved`.
- Default include only `relation` in `{derived_from, compound_with}`.
- Reuse existing chart node IDs where possible.
- Never auto-delete chart nodes.
- Keep rejected candidates in candidate files for auditability.
