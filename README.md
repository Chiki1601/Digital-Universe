# Digital Universe

A single, configuration-driven platform engine (Angular 22 + ASP.NET Core) that powers 17
original, fictional digital experiences across seven categories: OTT/Streaming, Music, Social
Media, Shopping, News/Content, Creator Platforms, and Professional Networking.

> **Status:** Phase 5 — Shopping (ShopSphere, FashionHub, MarketZone). This README will grow with each phase.

## Problem statement

Most portfolio projects build one app. Digital Universe demonstrates something harder: **one
reusable Angular + ASP.NET Core architecture that renders many distinct digital products**, driven
entirely by configuration rather than per-platform, hand-written UI code.

## The core idea: configuration-driven UI

```
Platform Configuration  →  Platform Engine  →  Section Renderer  →  Dynamic Components  →  Rendered Experience
```

Each fictional platform (e.g. `CineVerse`, `SoundWave`, `ShopSphere`) is described by a small
configuration object — a theme id, a layout, and an ordered list of sections:

```json
{
  "platformId": "cineverse",
  "name": "CineVerse",
  "type": "ott",
  "theme": "cinematic",
  "layout": { "hero": true, "sidebar": false, "search": true },
  "sections": [
    { "type": "hero" },
    { "type": "carousel", "title": "Trending Now" },
    { "type": "carousel", "title": "Popular Movies" }
  ]
}
```

Angular reads this configuration and picks reusable components (`HeroBannerComponent`,
`ContentCarouselComponent`, `MediaCardComponent`, ...) to render the experience. The same
component library, themed differently per platform, produces 17 different-looking products. This
was chosen over 17 hand-built apps because it is the only way to prove the architecture actually
scales — and because it mirrors how real multi-brand platforms (media groups, marketplaces,
super-apps) are built in practice.

## No-database architecture

**This project intentionally does not use a database.** There is no Entity Framework, no SQL
Server/PostgreSQL/MongoDB/SQLite, no ORM, no migrations, and no connection strings anywhere in the
codebase.

All backend data lives in in-memory C# collections seeded at startup (see
`server/Repositories/InMemory`). All frontend state lives in Angular signals and services. This
means:

- **Data resets whenever the ASP.NET Core process restarts.**
- Any "write" operations in later phases (admin edits, cart, wishlist, etc.) are only durable for
  the lifetime of the running process.
- This is by design — the goal is to showcase architecture and UI engineering, not persistence.

## Technology stack

**Frontend:** Angular 22, TypeScript, standalone components, Signals, RxJS, Angular Router (lazy
loaded), Reactive Forms, SCSS, HttpClient, HTTP interceptors, route guards, dependency injection.

**Backend:** ASP.NET Core Web API (.NET 10), C#, controllers, services, DTOs, middleware, JWT
authentication (added in a later phase), in-memory repositories, global exception handling.

## Folder structure

```
DigitalUniverse/
├── DigitalUniverse.sln
├── client/                        Angular 22 application
│   └── src/app/
│       ├── core/                  services, guards, interceptors, models, state
│       ├── shared/                reusable components, directives, pipes, models
│       ├── layouts/                main-layout, platform-layout
│       ├── features/               home, ott, music, social, shopping, news, creator,
│       │                           professional, auth, admin, platforms (explorer), not-found
│       └── platform-engine/        models, services, configuration, renderers, themes
└── server/                        ASP.NET Core Web API
    ├── Controllers/
    ├── Services/{Interfaces,Implementations}
    ├── Models/{Domain,DTOs}
    ├── Repositories/{Interfaces,InMemory}
    ├── Middleware/
    └── Extensions/
```

## API endpoints (Phase 1)

| Method | Route                               | Description                          |
| ------ | ------------------------------------ | ------------------------------------ |
| GET    | `/api/platforms`                     | List all platform summaries          |
| GET    | `/api/platforms/{id}`                | Get one platform summary             |
| GET    | `/api/platforms/{id}/configuration`  | Get full config (theme/layout/sections) |
| GET    | `/api/themes`                        | List all theme definitions           |
| GET    | `/api/themes/{id}`                   | Get one theme definition             |

More endpoints (Content, Products, Categories, Search, Navigation, Auth, Admin) are added in later
phases per the project roadmap.

## Fictional platforms

| Category | Platforms |
| --- | --- |
| OTT / Streaming | CineVerse, StreamBox, SeriesWorld |
| Music | SoundWave, TuneSpace |
| Social Media | SocialHub, Connectly, ProNetwork |
| Shopping | ShopSphere, FashionHub, MarketZone |
| News / Content | NewsSpace, DailySphere |
| Creator Platforms | CreatorSpace, ContentHub |
| Professional Networking | CareerConnect, WorkSphere |

All names, branding, and content are original and not affiliated with or modeled directly on any
real company's assets.

## How to run

**Backend** (from `server/`):

```
dotnet run
```

Runs at `http://localhost:5146` (see `Properties/launchSettings.json`).

**Frontend** (from `client/`):

```
npm install
npm start
```

Runs at `http://localhost:4200` and proxies `/api/*` requests to the backend via
`proxy.conf.json`, so no CORS configuration is needed in development beyond what's already set up.

## How to build

```
dotnet build                 # from the repo root, builds the whole solution
npm run build                # from client/, production Angular build
```

## How to test

```
npm test                     # from client/, runs Vitest unit tests
```

.NET test projects are added once there is meaningful business logic to cover (Phase 15).

## The Platform Engine (Phase 2)

`platform-engine/renderers/section-renderer.component.ts` is the component that makes the
architecture diagram above real: it walks a platform's `sections` array and, for each section
type, picks a reusable component —

- `hero` → `HeroBannerComponent` (fed by the platform's own name/tagline/description)
- `carousel` / `stories` → `ContentCarouselComponent` of `MediaCardComponent`s

The same layout config also toggles chrome around the renderer: `layout.sidebar` shows
`SidebarComponent`, `layout.search` shows a debounced `SearchComponent`. Visit `/platforms/ott/cineverse`
(hero + carousels, no sidebar) and `/platforms/social/socialhub` (no hero, sidebar + search) to see
the same engine produce two different layouts from two different configs.

Carousel content currently comes from `PlaceholderContentService`, a deterministic stand-in for
the real Content/Product/Post APIs that arrive in Phases 4–8 — it exists purely so the renderer has
something to render before those domain APIs exist.

## Theme Engine (Phase 3)

`ThemeService` (`core/services/theme.service.ts`) is the single source of truth for visual theming:

- `colorScheme` signal (`light` / `dark` / `system`, persisted to `localStorage`) resolves against
  the OS `prefers-color-scheme` media query via `resolvedScheme`.
- `activePlatformTheme` signal lets any route push a full `ThemeConfig` (e.g. CineVerse's
  `cinematic` theme) that overrides the light/dark default while it's set.
- An `effect()` writes the active theme's colors, radius, and font onto `:root` as CSS custom
  properties (`--primary-color`, `--surface-color`, ...) every time either signal changes.
- `theme.cardStyle` (`elevated` / `flat` / `outlined` / `glass`) resolves to a bundle of
  `--card-bg` / `--card-border` / `--card-shadow` / `--card-backdrop` variables, so any card-like
  surface opts into the platform's card treatment just by consuming those variables instead of
  hardcoding a look.

The home page's **Theme Engine** section fetches all 7 platform themes from `GET /api/themes`
(via `ThemeApiService`) and lets you preview any of them live across the whole page — proving the
engine works standalone, not only when a specific platform route sets it.

## OTT Experience (Phase 4)

CineVerse, StreamBox, and SeriesWorld now have a dedicated experience instead of the generic
Platform Engine shell (`features/ott/`), backed by a real `ContentController`:

- `GET /api/content?platformId={id}` — all movies/series for a platform (trending first)
- `GET /api/content/{id}` — full detail for one title

24 original fictional titles are seeded across the three platforms (see
`InMemoryContentRepository`). Features: hero banner, debounced title search, genre filter pills,
Trending/Popular rows, a **Continue Watching** row with per-title progress bars, a **Watchlist**
row you can build by tapping `+` on any card, a movie detail page with a mock video player
(play/pause, seekable progress, no real video source), and a "More Like This" row.

Watchlist and continue-watching progress are `signal`-based client state (`WatchlistService`,
`ContinueWatchingService`) — intentionally not persisted to the backend since there's no user
account system yet; they reset on page reload.

Two new reusable `platform-engine` components came out of this phase: `FilterPanelComponent`
(pill-style filtering, reusable by Shopping's category filters later) and `VideoPlayerComponent`
(mock playback UI, reusable by the Creator platforms later). The accent-gradient placeholder art
used by both `MediaCardComponent` and OTT's `MovieCardComponent` was extracted into a shared Sass
mixin (`platform-engine/styles/_accent-gradients.scss`) rather than duplicated.

Routing note: `/platforms/ott/:platformId` is matched by a literal route defined *before* the
generic `/platforms/:category/:platformId` fallback in `platforms.routes.ts`, so OTT gets its own
experience while every other category still renders through the generic engine shell until its own
phase lands.

## Shopping Experience (Phase 5)

ShopSphere, FashionHub, and MarketZone now have a dedicated experience (`features/shopping/`),
backed by two new controllers:

- `GET /api/categories?platformId={id}` — categories for a platform (4 per platform, 12 total)
- `GET /api/products?platformId={id}` / `GET /api/products/{id}` — products for a platform / one
  product's full detail

24 original fictional products are seeded across the three platforms (see
`InMemoryProductRepository`) — general goods for ShopSphere, apparel for FashionHub, local/artisan
goods for MarketZone. Features: product grid, category filter (reusing `FilterPanelComponent` from
Phase 4 rather than building a near-duplicate `CategoryNavigationComponent`), a price-range filter,
sorting, debounced search, a mock product gallery (thumbnail swatches swap the placeholder art,
since there are no real product photos), wishlist, and a full cart → checkout flow.

Two more reusable `platform-engine` components came out of this phase: `PriceComponent` (currency
formatting with strikethrough original price + discount badge) and `QuantitySelectorComponent`.
`ProductCardComponent`/`ProductGridComponent` stay shopping-specific since their card shape
(price, stock badge, add-to-cart) doesn't generalize the way `MediaCardComponent` does.

`CartService` is signal-based and **scoped per platform** (keyed by `"{platformId}:{productId}"`)
so browsing ShopSphere and FashionHub don't share a cart — checking out is, after all, a
single-store action in real commerce. Checkout is a genuine Reactive Form (the project's first),
validated client-side; submitting clears that platform's cart and shows a confirmation screen. No
backend order persistence and no real payment processing — this is explicitly a demo checkout.

## Limitations

- No database or persistence — all state is in-memory and resets on restart.
- Authentication (Phase 11) is demonstration-only and must never be used as a template for
  production auth.
- Carousel content on Music/Social/News/Creator/Professional platforms is still placeholder data;
  real content APIs for those land in Phases 6–10, each replacing that category's generic Platform
  Engine shell the way OTT (Phase 4) and Shopping (Phase 5) already did.
- Watchlist/continue-watching (OTT) and cart/wishlist (Shopping) state are demo-only, in-memory,
  and reset on page reload — there's no user account system yet.
- Checkout does not process real payments or persist orders anywhere; submitting just clears the
  platform's cart and shows a confirmation screen.

## Roadmap

See the 18-phase development plan (Platform Engine → Theme Engine → OTT → Shopping → Social →
Music → News → Creator → Professional → Auth/RBAC → Admin → SignalR → Search → Testing →
Performance/Accessibility → Polish → Documentation) — each phase inspects existing code before
adding to it and ends with a green `dotnet build` and `npm run build`.
