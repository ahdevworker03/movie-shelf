# MovieShelf — Strict Agent Contract (Production Mode)

## SYSTEM PURPOSE

You are an autonomous coding agent working on a React application called **MovieShelf**.

Your goal is to maintain a **production-grade, stable, predictable, and scalable application**.

You are NOT allowed to experiment, refactor broadly, or redesign architecture unless explicitly instructed.

---

# 1. CORE EXECUTION RULES (NON-NEGOTIABLE)

- Do NOT rebuild the project.
- Do NOT change architecture unless required to fix a verified bug.
- Do NOT introduce new patterns without justification.
- Do NOT duplicate state across layers.
- Do NOT mix UI state with domain state.
- Do NOT implement future features.
- Do NOT optimize prematurely.
- Do NOT refactor working code.

Every change must be:

> minimal, isolated, reversible, and testable.

---

# 2. STATE ARCHITECTURE RULES (CRITICAL)

## 2.1 Single Source of Truth

Each domain must have exactly ONE source of truth:

- watchLater → global state only
- watched → global state only
- movies (feed/search) → separated by context rules

## 2.2 Strict State Separation

You MUST separate state into 3 categories:

### Domain State (Persistent)

- watchLater
- watched
- movies (feed or search results)

### UI State (Ephemeral)

- loading
- error
- dropdown visibility
- input value

### Derived State (Computed ONLY)

- filtered lists
- searchResults (if derived from API)

---

## 2.3 Forbidden Patterns

- ❌ duplicating state in useState + reducer
- ❌ storing UI state in reducer
- ❌ mixing searchResults with feed
- ❌ sharing state between unrelated routes

---

# 3. ROUTING ISOLATION RULES

- Each route is fully isolated.
- Pages must NOT read or mutate unrelated page state.
- Navigation must NOT trigger state resets unless explicitly designed.

Routes:

- `/` → Home (Feed + Search)
- `/watch-later`
- `/watched`

---

# 4. SEARCH SYSTEM RULES (STRICT)

Search must follow this pipeline:

## 4.1 Input Layer

- user types → updates `query`
- triggers debounced suggestion fetch only

## 4.2 Suggestion Layer

- suggestions are ephemeral UI state
- MUST NOT affect results or feed

## 4.3 Submission Layer

- Enter/button triggers final search
- updates `searchResults`
- overrides feed only in Home

## 4.4 Forbidden

- suggestions MUST NOT render as main results
- typing MUST NOT change global results state

---

# 5. HOME FEED RULES

- Home page MUST always show content on first load.
- Default feed is independent from search.
- Feed is replaced ONLY by search results.

Feed sources:

- trending OR popular OR category-based API

Feed must:

- be stable
- be cached or controlled
- not depend on search state

---

# 6. CONTEXT PERFORMANCE RULES

- Context value MUST be memoized.
- No new object creation per render.
- No inline functions in provider value unless memoized.
- Prevent unnecessary consumer re-renders.

---

# 7. SIDE EFFECT RULES (useEffect SAFETY)

- No infinite loops in effects.
- No API calls triggered by multiple overlapping states.
- Separate effects:
  - initial load
  - typing debounce
  - submit search

---

# 8. LOCAL STORAGE RULES

Persist ONLY:

- watchLater
- watched

Rules:

- Must be isolated keys
- Must not overwrite each other
- Must be safe from silent failure (try/catch required)

---

# 9. UI STATE RULES

- UI state must never modify domain state directly.
- Dropdowns, loaders, and inputs are ephemeral only.
- No UI state persistence unless explicitly required.

---

# 10. PERFORMANCE RULES

- Avoid unnecessary re-renders.
- Memoize expensive components (MovieCard allowed).
- Avoid global state bloat.
- Remove unused code only when safe.

---

# 11. ERROR HANDLING RULES

- No raw API errors in UI.
- All errors must be mapped to user-safe messages.
- App must NEVER crash to blank screen.

---

# 12. CHANGE DISCIPLINE RULE

Every change must pass:

- Does it change architecture? → ❌ reject
- Does it duplicate state? → ❌ reject
- Does it mix UI + domain state? → ❌ reject
- Is it minimal and isolated? → ✅ allowed

---

# 13. WORKFLOW RULE

- Complete ONLY the requested phase
- Do NOT anticipate future phases
- Do NOT add enhancements unless requested
- After every change → ensure app stability before stopping

---

# FINAL PRINCIPLE

Stability > Features > Optimization > Style
