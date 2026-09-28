# Project Guidelines & Development Rules

## 1. Branching & Push Protocol
- **Never push directly to `main`**: All modifications, features, or fixes must be developed on a dedicated branch (e.g., `feature/...` or `fix/...`).
- **Push to Remote**: Push the feature branch to `origin <branch-name>` so it can be previewed.
- **User Review & Approval**: The user reviews the feature branch. The branch is only merged into `main` after explicit user confirmation.
- **Repository Structure Step-by-Step Breakdown**: Every time changes are proposed, document:
  - Exact files created or modified in the repository structure.
  - Step-by-step explanation of changes.
  - Verification that the desktop/laptop layout and animations remain 100% untouched.

## 2. Layout & Aesthetic Integrity
- **Desktop/Laptop View**: The original desktop layout, 3D card flipping animations, and runway scroll effects must remain completely preserved.
- **Responsiveness**: Any mobile layout optimizations must be scoped strictly using responsive modifiers (e.g., `max-md:`, `md:`) or mobile media queries. Do not apply global `overflow-x: hidden` to `html`/`body` that might disrupt native scroll momentum or Framer Motion `useScroll`.

## 3. UI Component System
- Reusable animation primitives reside in `src/components/ui/` (e.g., `BorderBeam`, `MagneticButton`, `TextScramble`, `SquareArchitectureGraph`).
- Clean, modular, and performant components leveraging Framer Motion and Tailwind CSS.
