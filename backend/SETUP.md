# CBET results backend — first phase

Status: prepared, disabled by default, not deployed. No services created.

## Included
- api/results.js: POST validated client-reported CBET scores; authenticated GET latest 200 results without email addresses.
- public/admin-results.html: password-style token login, responsive results table; no token persistence.
- src/App.jsx: routes supported CBET score-save requests to backend only when VITE_CBET_RESULTS_BACKEND=true. All other saves keep Formspree. Local leaderboard remains browser-local; no shared public leaderboard added.
- backend/schema.sql and meaningful handler tests.

## Before enabling
1. Create a Supabase project on its Free plan, not a paid trial/Pro plan. Review current pricing at https://supabase.com/pricing. Free tier currently lists 500 MB database and 5 GB egress; it may pause after a week of inactivity and has no automatic backups. Vercel compute usage can still incur overages.
2. Run backend/schema.sql in the Supabase SQL editor. RLS is enabled; anonymous/authenticated roles have no table privileges. Service-role access is server-only.
3. Add server environment variables in Vercel: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SCORE_ALLOWED_ORIGIN=https://medskillbuilder.com, RESULTS_ADMIN_TOKEN (a randomly generated token of at least 32 characters). Never prefix private variables with VITE_. Never paste secrets into chat or commit them.
4. Configure a Vercel Firewall rate-limit rule for /api/results before public activation. Origin checks are not bot protection; public clients can submit fabricated results. Configure spending alerts and review whether pause behavior is acceptable.
5. Deploy initially with VITE_CBET_RESULTS_BACKEND unset/false. Inspect /admin-results.html with your private token. Do not store the token in a URL. Share neither token nor dashboard screenshots containing learner data.
6. Test against a nonproduction database and deployment: save a CBET result, retry, verify persistence and correct percent; verify unauthenticated reads fail; verify other quizzes still use their existing flow. Vite alone does not run Vercel Functions: use a Vercel preview or Vercel CLI for integration testing. No live integration or browser tests were performed here.
7. Enable VITE_CBET_RESULTS_BACKEND=true and rebuild only after checks pass. www and preview domains need their own exact SCORE_ALLOWED_ORIGIN. Roll back by setting the feature flag false and rebuilding.

## Important limits
Scores remain client-reported, not server-graded or proof of exam readiness. This phase does not add learner accounts, cross-device progress, historical email import, automatic shared public leaderboard, CSV export, or pagination beyond the latest 200 results. Existing private email collection continues; no marketing consent is inferred. Email is stored privately but omitted from dashboard/API read output. Set an appropriate retention/deletion procedure before production. Do not run the schema over unrelated existing tables without reviewing it.

## Install and checks
Copy the included api, backend, and public files into the project. Replace src/App.jsx only if it still matches the uploaded November 1 version; otherwise merge the small useBackend branch in submitSavedScore. No new npm dependencies.
Run npm run build and node --test backend/results.test.mjs.

Verified locally: production build succeeds; 4 API tests pass with mocked database calls. No real learner submissions were sent. Existing large bundle warning remains.
