# IIITB ML/DL Learning Platform — Design Spec
Date: 2026-04-30

## Context

The IIITB Deep Learning course already has one polished interactive explainer — `CNN/index.html` — that walks students through CNNs via a scroll-driven, stage-based single-page site with zero dependencies. The rest of the 18-topic ML/DL curriculum (linear regression through neural networks) has no equivalent interactive resource. This project builds a full guided learning platform: a hub page (`index.html` at the IIITB root) that maps all 18 topics in sequence, plus one self-contained HTML page per topic, all matching the CNN explainer's design language and quality.

---

## Decisions Made

| Question | Decision |
|---|---|
| Structure | Hub + separate HTML file per topic (Option A) |
| Hub layout | Vertical numbered roadmap with phase groupings |
| Cross-topic theme | Topic-native examples (best example per algorithm) |
| Topic page depth | Interactive demo for 7 key topics; animated visuals for 9 simpler ones |
| Topic page template | Stage-based scroll flow (mirrors CNN/index.html) |

---

## File Structure

All new files live at `/Users/I330907/Library/CloudStorage/OneDrive-SAPSE/Desktop/Desktop/IIITB/`:

```
IIITB/
├── index.html                  ← NEW: Hub / course map
├── eda.html                    ← NEW: Topic 01
├── linear-regression.html      ← NEW: Topic 02
├── logistic-regression.html    ← NEW: Topic 03
├── regularization.html         ← NEW: Topic 04
├── advanced-regression.html    ← NEW: Topic 05
├── decision-trees.html         ← NEW: Topic 06
├── random-forest.html          ← NEW: Topic 07
├── boosting.html               ← NEW: Topic 08
├── svm.html                    ← NEW: Topic 09
├── naive-bayes.html            ← NEW: Topic 10
├── clustering.html             ← NEW: Topic 11
├── pca.html                    ← NEW: Topic 12
├── model-selection.html        ← NEW: Topic 13
├── neural-networks.html        ← NEW: Topic 14
└── CNN/
    └── index.html              ← EXISTING: Topic 15 (untouched)
```

15 files total: 1 hub + 14 new topic pages. The existing CNN/index.html serves as Topic 15 and is not modified.

---

## Hub Page (`index.html`)

### Layout
Single-page scroll. Sections:

1. **Hero** — animated pixel/data grid (reuse hero pattern from CNN/index.html), title "IIITB — ML & DL Learning Path", subtitle "From data exploration to deep learning · 15 topics · guided sequence"

2. **Phase pills** — 3 filter badges: "Phase 1: ML Foundations", "Phase 2: Ensemble & Advanced", "Phase 3: Deep Learning"

3. **Vertical roadmap** — numbered cards (01–15) with connecting vertical lines between them. Each card:
   - Numbered badge (colored per phase)
   - Topic name (bold)
   - 1-line tagline (subtopics summary)
   - "→" arrow — entire card is a clickable link to that topic's `.html` file
   - Phase header labels appear above the first card of each phase

4. **Footer** — "Built for IIITB Deep Learning Course · 2026"

### Phase groupings
- **Phase 1 (blue tones, topics 01–05):** EDA & Statistics, Linear Regression, Logistic Regression, Regularization, Advanced Regression
- **Phase 2 (purple tones, topics 06–10):** Decision Trees, Random Forest, Boosting, SVM, Naive Bayes
- **Phase 3 (cyan/teal tones, topics 11–15):** Clustering, PCA, Model Selection, Neural Networks, CNN

### Colors
Phase 1 uses `--accent-blue` → `--accent-indigo` progression. Phase 2 uses `--accent-purple` → `--accent-violet` → `--accent-rose`. Phase 3 uses `--accent-cyan` → `--accent-teal` → `--accent-amber`. Inherits all CSS custom properties from CNN/index.html design system.

---

## Topic Page Template

Every topic page (eda.html through neural-networks.html) uses this exact section sequence:

```
HERO
  └─ Animated visual (topic-specific)
  └─ Title: "<Hook Phrase>" 
  └─ Subtitle: one-line description
  └─ Scroll indicator ↓

Stage 1 — The Problem
  └─ glass-card with stage-badge "1"
  └─ Real-world motivating question
  └─ Left: bullet list of "what we're trying to solve"
  └─ Right: visual (dataset preview, problem illustration)
  └─ insight-box quote

Stage 2 — The Intuition
  └─ glass-card with stage-badge "2"
  └─ Plain-language explanation, no math
  └─ Animated CSS/SVG visual showing the core idea

[INTERACTIVE DEMO — key topics only]
  └─ Full-width glass-card, lightning-bolt badge
  └─ Purpose-built JS interaction (see assignments below)
  └─ Controls (buttons/sliders), live computation display
  └─ Legend

Stage 3 — The Math
  └─ glass-card with stage-badge "3"
  └─ Key formulas rendered in styled monospace/SVG
  └─ Step-by-step breakdown

Stage 4 — Assumptions & Pitfalls
  └─ glass-card with stage-badge "4"
  └─ What can go wrong, what to check
  └─ Visual: warning-style callout boxes

Stage 5 — When to Use
  └─ glass-card with stage-badge "5"
  └─ Pros / Cons two-column layout
  └─ Real-world use cases with domain labels

Key Takeaways
  └─ 3-column glassmorphic card grid (same as CNN/index.html)

Prev / Next Navigation
  └─ Full-width bar: "← Previous: [Topic Name]" and "Next: [Topic Name] →"
  └─ Both are clickable links

Footer
  └─ "Built for IIITB Deep Learning Course · 2026"
```

All scroll reveals use the `.reveal` / `.reveal.visible` + IntersectionObserver pattern from CNN/index.html.

---

## Interactive Demo Assignments

### Full Interactive (7 topics)

| Topic | Demo | Interaction |
|---|---|---|
| Linear Regression | Scatter plot + regression line | Drag data points; line and R² update live |
| Logistic Regression | 2D scatter with decision boundary | Slider adjusts threshold; boundary and confusion metrics update |
| Decision Trees | Step-by-step tree builder | Click "Split" to add nodes; shows information gain at each step |
| Clustering | K-Means on 2D point cloud | Choose K; watch centroids converge over iterations |
| PCA | 2D data cloud with PC axes | Rotate axes; variance explained % updates live |
| Neural Networks | Forward pass through 3-layer net | Sliders for input values; activations propagate and light up |
| CNN | Existing kernel animation | Already built in CNN/index.html — link/embed |

### Animated Visuals (8 topics)

| Topic | Visual |
|---|---|
| EDA & Statistics | Animated histogram bars building up; scatter plot points appearing |
| Regularization | L1/L2 constraint region animation; coefficient shrinkage bar chart |
| Advanced Regression | Polynomial curve fitting animation (degree 1 → 2 → 3 → overfit) |
| Random Forest | Multiple decision trees appearing, votes aggregating |
| Boosting | Error residuals shrinking across boosting rounds |
| SVM | Margin widening animation, support vectors highlighting |
| Naive Bayes | Probability table filling in, posterior updating |
| Model Selection | Cross-validation folds cycling, bias-variance tradeoff curve |

---

## Design System

All topic pages inherit the full CSS from CNN/index.html verbatim:

- CSS custom properties on `:root` (colors, radii)
- `.glass-card`, `.stage-badge`, `.reveal`, `.insight-box`
- `.section`, `.section-compact`, `.stage-container`
- `.stage-header`, `.stage-content`, `.stage-learns`
- `.takeaways-grid`, `.takeaway-card`
- Body background gradient + `body::before` radial overlay
- `IntersectionObserver` scroll reveal JS (copy as-is)
- Zero external dependencies — all CSS and JS embedded per file
- `python3 -m http.server 8000` to serve locally

Each file is fully self-contained. No shared CSS file, no build step — same constraint as CNN/index.html.

---

## Topic-Native Real-World Examples

| Topic | Primary Example |
|---|---|
| EDA & Statistics | Lending Club loan dataset (already in course) |
| Linear Regression | House price prediction (Housing.csv in course) |
| Logistic Regression | Telecom churn prediction |
| Regularization | House price with overfit features |
| Advanced Regression | Non-linear salary vs experience |
| Decision Trees | Heart disease prediction (Heart+Disease.ipynb in course) |
| Random Forest | Telecom churn ensemble |
| Boosting | XGBoost on structured data |
| SVM | Email spam classification |
| Naive Bayes | Text/news classification |
| Clustering | Customer segmentation (Online Retail dataset in course) |
| PCA | MNIST digit compression |
| Model Selection | Comparing models on same dataset |
| Neural Networks | House price with dense layers |
| CNN | Torres del Paine image (existing) |

---

## Verification

1. Open `IIITB/index.html` directly in a browser — hub page renders, all 15 topic links are clickable
2. Click each topic card — correct `.html` file opens
3. On each topic page: scroll reveals trigger, interactive demos respond to input, Prev/Next links navigate correctly
4. CNN link on hub opens `CNN/index.html` — existing page untouched
5. Serve with `python3 -m http.server 8000` from IIITB root — all pages load, no 404s
6. Resize to mobile width (375px) — all layouts collapse gracefully to single column
