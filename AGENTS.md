<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Session workflow

- Verify in order: `npm run lint` → `npx tsc --noEmit` → `npm run build`. `npm run build` also runs the TS check (~10s) and exercises real page data fetches, so it is the strongest single check.
- No test suite, no CI workflows, no pre-commit hooks exist. If you add tests, you must also add the runner — nothing is configured.
- `npm run dev` (Turbopack, port 3000) rewrites the managed block above and may add a second managed block (`nextjs-agent-feedback` — `experimental.agentFeedback: true` is on in `next.config.ts`). Both marker blocks are Next.js-managed: never hand-edit or delete them; commit `AGENTS.md` with your work.
- Single branch `main`, remote `origin` → `github.com/jobayerh99/bangla-news-24`. Commit messages are informal; no PR or release process is documented.

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` (`eslint`, flat config, `eslint-config-next`).
- `npx tsc --noEmit` — typecheck; there is no npm script for it.
- Lint currently exits 0 with pre-existing warnings only (unused vars in signin/signup, `<img>` in profile/UserInfo). Don't chase them, don't add new ones.

## Architecture (Next.js 16 specifics)

- App Router, source under `src/`, alias `@/*` → `src/*`. Route params are Promises: `const { id } = await params`.
- Middleware was renamed Proxy in Next 16: request interception lives in `src/proxy.ts` (named `proxy` export + `config.matcher`), not `middleware.ts`. Currently guards `/profile` and `/news/:path`, redirecting to `/signin` without a session.
- `cacheComponents: true` in `next.config.ts` — routes build as Partial Prerender (revalidate 1h / expire 1d). Cached server data uses `"use cache"` + `cacheLife()` inside async functions — see `src/components/Marquee.tsx` and `NavLinks.tsx`. Other fetches (home, category, news, MostRead) are uncached plain `fetch` with no `res.ok` checks.
- React Compiler is enabled (`reactCompiler: true`).
- Remote images are restricted to `ichef.bbci.co.uk` via `images.remotePatterns`; other hosts fail at runtime. `NewsCard`/`MainNews` pass API `imageUrl` straight to `next/image`.
- Only `not-found.tsx` and `loading.tsx` exist — there are no `error.tsx` boundaries anywhere; an API outage surfaces Next's default error page.

## Auth & data

- better-auth + MongoDB: server config `src/lib/auth.ts`, client `src/lib/auth-client.ts`, catch-all handler `src/app/api/auth/[...all]/route.ts`. Client pages call `authClient.*` (`useSession`, `signIn.email`, `signUp.email`, `updateUser`).
- `.env` (gitignored via `.env*`) is required to run: `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`/`SECRET`, `GITHUB_CLIENT_ID`/`SECRET`. `src/lib/auth.ts` creates the Mongo client at module load, so importing it (e.g. from proxy) needs `MONGODB_URL` set.
- All news content comes from the external API `https://news-api-v2.vercel.app/api/...` hardcoded across pages/components. There is no local news data layer.

## Known pitfalls (verified — do not replicate)

- `category/[categoryId]/page.tsx` and `news/[newsId]/page.tsx` import `NotFound` from `@/app/not-found` and call `NotFound()` when data is missing. That does **not** trigger the 404 route — it discards the returned JSX and keeps rendering, then crashes on `.map` of undefined. The correct API is `notFound()` from `next/navigation`. Fix if you touch those files.
- `signup/page.tsx` calls `redirect("/")` inside a client event handler after `signUp.email`; `redirect` only works during render/server code — use `window.location` or `router.push` there.
- Build prints `Next.js ignored package-lock.json in C:\projects ... outside the current Git repository` — a stray lockfile in the parent directory, not a repo problem. Ignore it.

## Styling & UI conventions

- Tailwind CSS v4 is CSS-first: config lives in `src/app/globals.css` (`@import "tailwindcss"`, `@plugin "daisyui"`). There is no `tailwind.config.*` file — don't create one. daisyUI classes are used throughout; the palette is red-700 accents on `bg-base-*`.
- User-facing strings are in Bengali (e.g. সাইন ইন, সর্বশেষ); keep new UI text Bengali to match.

## Docs

- `README.md` is stale create-next-app boilerplate (it references `app/page.tsx`, but code is in `src/app`). For Next.js behavior trust `node_modules/next/dist/docs/` over the README or training data.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
