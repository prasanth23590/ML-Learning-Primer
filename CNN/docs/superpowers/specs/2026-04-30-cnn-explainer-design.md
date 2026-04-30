# CNN Explainer Website — Design Spec

**Date:** 2026-04-30
**Status:** Approved

## Overview

A single-page, scroll-driven interactive website that explains how Convolutional Neural Networks process images — from raw pixels to class probabilities — with a dedicated Transfer Learning section. Built for IIITB Deep Learning students who have ML background.

## Audience

IIITB DL course students. Assumes familiarity with basic ML concepts (loss functions, gradient descent, layers). Focus on building intuition for hierarchical feature learning and transfer learning mechanics.

## Visual Language

### Aesthetic

- **Background:** Deep navy-to-royal-blue gradient (`#0f1628` → `#1a2a4a` → `#1e3a5f`)
- **Cards:** Glassmorphic — semi-transparent (`rgba(255,255,255,0.05)`), backdrop blur, subtle white/blue border with inner glow, rounded corners (12-16px)
- **Typography:** Bold white headings (system sans-serif, -apple-system/BlinkMacSystemFont), lighter rgba white for body text
- **Badges:** Numbered rounded squares with blue→purple color progression per stage
- **Accents:** Amber/gold for CTAs and highlights
- **Animations:** Scroll-triggered via Intersection Observer, subtle fade-up + scale reveals

### Design Reference

Inspired by the "Agentic Journey Management" template aesthetic: glassmorphic cards with numbered stages, bullet lists inside cards, rich blue gradient background, CTA buttons with amber accent.

## Site Structure

### 1. Hero Section

- **Title:** "From Pixels to Probabilities"
- **Subtitle:** "How a CNN Sees and Understands an Image"
- **Visual:** Animated pixel grid that morphs/resolves into a classification label
- **Scroll indicator:** Downward arrow with pulse animation

### 2. The 7 Stages — Scroll-Driven Narrative

Each stage occupies a full or near-full viewport section. Layout: numbered glassmorphic card with:
- Stage badge (numbered, color-coded)
- Bold heading
- Description paragraph
- "What is learned" bullet list
- Visual/diagram area (CSS-generated feature map representations)
- "Key insight" callout

#### Stage 1: Input Image (Pixels)
- Visual: RGB pixel grid with hover to show individual pixel values
- Content: Raw image as a 3D tensor (H × W × 3), each pixel is just a number
- Insight: "The network sees numbers, not pictures"

#### Stage 2: Convolution Layer 1 (Edges)
- Visual: Edge detection filter visualization
- Interactive: Convolution kernel demo (see Section 3 below)
- Content: Detects edges, corners, simple gradients
- Insight: "Each filter responds to one specific pattern"

#### Stage 3: Convolution Layer 2 (Textures)
- Visual: Texture pattern representations (cross-hatching, dots, gradients)
- Content: Combines edges to find textures and motifs
- Insight: "Deeper layers learn complex patterns by combining simpler ones"

#### Stage 4: Convolution Layer 3 (Shapes & Parts)
- Visual: Shape outlines (circles, rectangles, organic curves)
- Content: Identifies shapes and object parts (e.g., peaks, tree lines, water regions)
- Insight: "Parts of objects — not whole objects yet"

#### Stage 5: Convolution Layer 4 (Objects)
- Visual: Object silhouettes and recognition areas
- Content: Recognizes objects and larger structures (mountains, trees, sky)
- Insight: "Understands 'what' is in the image"

#### Stage 6: Global Pooling (High-Level Features)
- Visual: Spatial feature maps collapsing into a single vector (animated compression)
- Content: Condenses feature maps into a compact vector — spatial information is summarized
- Insight: "Everything the network knows, compressed into one vector"

#### Stage 7: Fully Connected + Softmax (Probabilities)
- Visual: Animated probability bar chart showing class predictions
- Interactive: Softmax probability visualizer (see below)
- Content: Converts feature vector into probability distribution over classes
- Insight: "Probabilities sum to 1.0 — the highest is the model's prediction"

### 3. Interactive Convolution Demo

Placed between Stage 1 and Stage 2. A standalone interactive section:

- **Left:** Small grayscale image represented as a numbered grid (e.g., 7×7)
- **Center:** A 3×3 kernel that the user can select from presets (horizontal edge, vertical edge, sharpen, blur)
- **Right:** Output feature map that updates in real-time as the kernel "slides" over the input
- **Interaction:** User selects kernel preset; animation shows the kernel sliding across the input, computing dot products, filling the output grid
- **Implementation:** Pure CSS grid + JS for computation. No canvas required for this scale.

### 4. Key Takeaways Section

Three glassmorphic summary cards side-by-side:

1. "Early layers learn simple, universal patterns (edges, textures)"
2. "Deeper layers learn task-specific, complex concepts (objects, scenes)"
3. "Global pooling summarizes; fully-connected classifies"

### 5. Transfer Learning Section

#### Concept

Before/After comparison showing a pretrained VGG16 network being adapted for melanoma detection.

#### Layout

**Before (left):** Full VGG16 architecture diagram
- All layers active (blue/purple gradient)
- Trained on ImageNet (1000 classes)
- Label: "Pretrained on 1.2M images"

**Animated transition:** Visual "surgery" — the classification head gets removed, new layers attach

**After (right):** Modified VGG16 for melanoma detection
- Early layers greyed out with lock icons (frozen — edges/textures are universal)
- Later layers highlighted (fine-tuned for skin lesion features)
- New classification head (2 classes: benign/malignant)
- Label: "Fine-tuned on 10K dermoscopy images"

#### Content Cards Below

- **Why it works:** Early layers learn universal features (edges, textures) that transfer across domains
- **What to freeze:** Typically freeze conv layers 1-3, fine-tune from layer 4 onward
- **Benefits:** Less data needed, faster training, better generalization

### 6. Footer

- "Built for IIITB Deep Learning Course"
- Course year reference

## Technical Implementation

### Stack

- **Single `index.html`** — all CSS and JS embedded (no external files needed)
- **Zero dependencies** — no frameworks, no build step, no CDN imports
- **CSS:** Custom properties for theming, keyframe animations, scroll-triggered via Intersection Observer
- **JS:** Intersection Observer for scroll reveals, convolution demo logic, softmax visualizer

### Performance

- No images — all visuals are CSS-generated (gradients, borders, shapes) or JS-computed
- Lightweight: target < 50KB total
- Smooth 60fps scroll animations via `transform` and `opacity` only

### Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- `backdrop-filter` (glassmorphism)
- CSS Grid / Flexbox
- Intersection Observer API
- CSS custom properties

### File Output

Single file: `index.html` in the CNN project root directory.

## Scope Boundaries

**In scope:**
- All 7 CNN stages with explanations and CSS-generated visuals
- Convolution kernel demo (interactive)
- Softmax probability visualizer
- Transfer learning before/after with animated transition
- Scroll-driven reveal animations

**Out of scope:**
- Real image processing (no actual CNN inference)
- User image upload
- Backend/API calls
- Mobile-first responsive (desktop-optimized, but should not break on mobile)
