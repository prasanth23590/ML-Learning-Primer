# ML Learning Primer

An interactive ML & Deep Learning learning platform built for the IIITB course. 15 self-contained, zero-dependency topic pages covering the full journey from EDA to Convolutional Neural Networks.

**Live site: https://prasanth23590.github.io/ML-Learning-Primer/**

---

## Topics

### Phase 1 — Fundamentals
| # | Topic | Demo type |
|---|-------|-----------|
| 01 | EDA & Statistics | Animated scatter + histogram |
| 02 | Linear Regression | Interactive canvas — click to add points, live OLS fit |
| 03 | Logistic Regression | Threshold slider + live confusion matrix |
| 04 | Regularization | Animated Ridge vs Lasso coefficient shrinkage |
| 05 | Advanced Regression | Animated polynomial degree comparison |

### Phase 2 — Ensemble & Advanced
| # | Topic | Demo type |
|---|-------|-----------|
| 06 | Decision Trees | Interactive patient-risk tree traversal |
| 07 | Random Forest | Animated bagging visualisation |
| 08 | Boosting | Animated residual error reduction across rounds |
| 09 | Support Vector Machines | Real-time margin expansion animation |
| 10 | Naive Bayes | Live Bayesian posterior updater |

### Phase 3 — Deep Learning
| # | Topic | Demo type |
|---|-------|-----------|
| 11 | Clustering | Animated K-Means convergence canvas |
| 12 | PCA | Rotating principal component axes canvas |
| 13 | Model Selection | Animated 5-fold cross-validation grid |
| 14 | Neural Networks | Interactive 3-layer forward-pass with input sliders |
| 15 | CNN | Interactive 3D convolution explainer |

---

## Structure

```
index.html               ← hub page (start here)
eda.html
linear-regression.html
logistic-regression.html
regularization.html
advanced-regression.html
decision-trees.html
random-forest.html
boosting.html
svm.html
naive-bayes.html
clustering.html
pca.html
model-selection.html
neural-networks.html
CNN/
  index.html             ← CNN explainer (Topic 15)
  mountain.jpg
```

## Tech

- Zero dependencies — pure HTML/CSS/JS
- Canvas 2D API for all interactive visualisations
- No build step — open any `.html` file directly or serve with `python3 -m http.server`
