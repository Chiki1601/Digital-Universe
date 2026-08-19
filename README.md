# 🌌 Digital Universe

> **A configuration-driven digital experience engine built with Angular 22 + ASP.NET Core (.NET 10).**

Digital Universe is a portfolio-scale architecture project that demonstrates how **one reusable frontend/backend platform engine can power 17 distinct fictional digital products** without building 17 separate applications.

Instead of hard-coding every product, each experience is described through configuration — including its theme, layout, and ordered sections — and the Angular engine dynamically renders the appropriate reusable components.

**Current milestone:** 🛍️ **Phase 5 — Shopping**

---

## ✨ Why Digital Universe?

Most portfolio applications demonstrate that you can build **one product**.

Digital Universe demonstrates something different:

> **Can you design an architecture that scales across many products while keeping the codebase reusable, maintainable, and consistent?**

The project uses a shared component system, configuration-driven rendering, reusable themes, domain-specific features, and an ASP.NET Core API layer to simulate a multi-brand digital ecosystem.

### What this project demonstrates

- 🧩 Configuration-driven UI architecture
- ♻️ Reusable Angular component system
- 🎨 Dynamic platform/theme engine
- ⚡ Angular Signals + reactive state management
- 🧱 Standalone Angular architecture
- 🔌 ASP.NET Core Web API architecture
- 🛒 Complete demo shopping experience
- 🎬 OTT/streaming experience
- 🔎 Debounced search and filtering
- 📝 Reactive Forms and validation
- 🧭 Lazy-loaded routing
- 🛡️ Route guards and HTTP interceptors
- 📦 In-memory repository architecture
- 📐 Scalable feature-based folder structure

---

## 🏗️ Architecture at a Glance

```text
                    ┌──────────────────────────┐
                    │   Platform Configuration │
                    │ theme / layout / sections│
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      Platform Engine     │
                    │ Angular configuration    │
                    │ driven rendering         │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Section Renderer     │
                    │ maps section → component │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────┴─────────────┐
                    ▼                          ▼
             Reusable UI                Platform Features
          Hero / Carousel /             OTT / Shopping /
          Filters / Cards /              Music / Social /
          Video / Price etc.             News / Creator
                    │
                    └────────────┬─────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │    ASP.NET Core API      │
                    │ Controllers / Services   │
                    │ Repositories / DTOs      │
                    └──────────────────────────┘
```

---

## 🧠 Core Concept — Configuration-Driven UI

Each fictional platform is represented by a small configuration object.

For example:

```json
{
  "platformId": "cineverse",
  "name": "CineVerse",
  "type": "ott",
  "theme": "cinematic",
  "layout": {
    "hero": true,
    "sidebar": false,
    "search": true
  },
  "sections": [
    { "type": "hero" },
    { "type": "carousel", "title": "Trending Now" },
    { "type": "carousel", "title": "Popular Movies" }
  ]
}
```

Angular reads this configuration and dynamically selects reusable components:

```text
hero
  ↓
HeroBannerComponent

carousel
  ↓
ContentCarouselComponent
  ↓
MediaCardComponent
```

The result is a completely different product experience without duplicating the application architecture.

This is the key architectural idea behind Digital Universe:

> **Configuration defines the experience. Reusable components implement the experience.**

---

# 🌍 17 Fictional Digital Products

Digital Universe currently models **17 original fictional platforms across 7 categories**.

| Category | Platforms |
|---|---|
| 🎬 OTT / Streaming | CineVerse · StreamBox · SeriesWorld |
| 🎵 Music | SoundWave · TuneSpace |
| 💬 Social Media | SocialHub · Connectly · ProNetwork |
| 🛍️ Shopping | ShopSphere · FashionHub · MarketZone |
| 📰 News / Content | NewsSpace · DailySphere |
| 🎨 Creator Platforms | CreatorSpace · ContentHub |
| 💼 Professional Networking | CareerConnect · WorkSphere |

> All names, branding, and content are fictional and original. They are not affiliated with or modeled directly on any real company's assets.

---

# 🚀 Implemented Experiences

## 🎬 OTT Experience — Phase 4

**Platforms:** CineVerse, StreamBox, SeriesWorld

The OTT category has its own dedicated experience instead of relying on the generic platform shell.

### Features

- 🎬 Hero banner
- 🔎 Debounced title search
- 🏷️ Genre filtering
- 🔥 Trending content
- ⭐ Popular content
- ▶️ Continue Watching
- 📊 Per-title progress indicators
- ❤️ Watchlist
- 🎞️ Movie/series detail page
- ▶️ Mock video player
- ⏩ Seekable playback progress
- 🎯 More Like This section

### API

```http
GET /api/content?platformId={id}
GET /api/content/{id}
```

The application currently seeds **24 fictional titles** across the three OTT platforms.

---

## 🛍️ Shopping Experience — Phase 5

**Platforms:** ShopSphere, FashionHub, MarketZone

The Shopping phase introduces a dedicated commerce experience backed by product and category APIs.

### Features

- 🛍️ Product grid
- 🏷️ Category filtering
- 💰 Price-range filtering
- ↕️ Product sorting
- 🔎 Debounced product search
- 🖼️ Mock product gallery
- ❤️ Wishlist
- 🛒 Platform-scoped cart
- ➕ Quantity selector
- 💳 Demo checkout
- ✅ Reactive Form validation
- 🎉 Checkout confirmation

### API

```http
GET /api/categories?platformId={id}

GET /api/products?platformId={id}

GET /api/products/{id}
```

The project currently contains **24 fictional products**:

- ShopSphere → general goods
- FashionHub → apparel
- MarketZone → local/artisan products

### Platform-scoped cart

Each shopping platform has an independent cart.

```text
ShopSphere
  └── Cart

FashionHub
  └── Cart

MarketZone
  └── Cart
```

Cart items are keyed by:

```text
{platformId}:{productId}
```

This prevents products from different fictional stores from being mixed into the same checkout.

---

# 🎨 Theme Engine

The Theme Engine provides a centralized visual system for the entire application.

`ThemeService` acts as the single source of truth for theme state.

### Supported capabilities

- ☀️ Light mode
- 🌙 Dark mode
- 🖥️ System preference
- 🎨 Platform-specific themes
- 💾 LocalStorage persistence
- 🌈 CSS custom properties
- 🧊 Card styles
- 🔤 Platform-specific typography
- 📐 Radius and surface configuration

Theme values are applied to `:root` through CSS variables such as:

```css
--primary-color
--surface-color
--card-bg
--card-border
--card-shadow
--card-backdrop
```

This allows shared components to automatically adapt to the active platform.

### Theme preview

The home page can fetch the available platform themes through:

```http
GET /api/themes
```

and preview them across the application.

---

# 🧩 Reusable Platform Engine

The Platform Engine is the architectural heart of Digital Universe.

The section renderer walks through the configured sections and maps them to reusable Angular components.

### Example

```text
Configuration
     │
     ├── hero
     │     └── HeroBannerComponent
     │
     ├── carousel
     │     └── ContentCarouselComponent
     │           └── MediaCardComponent
     │
     └── stories
           └── ContentCarouselComponent
```

The same engine can produce different layouts depending on configuration.

For example:

```text
CineVerse
├── Hero
├── Trending
└── Popular
```

while:

```text
SocialHub
├── Sidebar
├── Search
├── Stories
└── Feed
```

Both are rendered by the same underlying architecture.

---

# 🛠️ Technology Stack

## Frontend

| Technology | Usage |
|---|---|
| Angular 22 | Application framework |
| TypeScript | Application language |
| Standalone Components | Component architecture |
| Angular Signals | Reactive state |
| RxJS | Async/reactive workflows |
| Angular Router | Routing & lazy loading |
| Reactive Forms | Form handling & validation |
| SCSS | Styling |
| HttpClient | API communication |
| HTTP Interceptors | Request/response handling |
| Route Guards | Route protection |
| Dependency Injection | Service architecture |

## Backend

| Technology | Usage |
|---|---|
| ASP.NET Core Web API | REST API |
| .NET 10 | Runtime |
| C# | Backend language |
| Controllers | HTTP endpoints |
| Services | Business/application logic |
| DTOs | API contracts |
| In-Memory Repositories | Demo data layer |
| Middleware | Cross-cutting concerns |
| JWT | Demonstration authentication |

---

# 📁 Project Structure

```text
DigitalUniverse/
│
├── DigitalUniverse.sln
│
├── client/                              # Angular 22 application
│   └── src/app/
│       ├── core/
│       │   ├── services/
│       │   ├── guards/
│       │   ├── interceptors/
│       │   ├── models/
│       │   └── state/
│       │
│       ├── shared/
│       │   ├── components/
│       │   ├── directives/
│       │   ├── pipes/
│       │   └── models/
│       │
│       ├── layouts/
│       │   ├── main-layout/
│       │   └── platform-layout/
│       │
│       ├── features/
│       │   ├── home/
│       │   ├── ott/
│       │   ├── music/
│       │   ├── social/
│       │   ├── shopping/
│       │   ├── news/
│       │   ├── creator/
│       │   ├── professional/
│       │   ├── auth/
│       │   ├── admin/
│       │   ├── platforms/
│       │   └── not-found/
│       │
│       └── platform-engine/
│           ├── models/
│           ├── services/
│           ├── configuration/
│           ├── renderers/
│           ├── themes/
│           └── styles/
│
└── server/                              # ASP.NET Core Web API
    ├── Controllers/
    ├── Services/
    │   ├── Interfaces/
    │   └── Implementations/
    ├── Models/
    │   ├── Domain/
    │   └── DTOs/
    ├── Repositories/
    │   ├── Interfaces/
    │   └── InMemory/
    ├── Middleware/
    └── Extensions/
```

---

# 🗄️ No-Database Architecture

Digital Universe intentionally does **not** use a database.

There is currently:

- ❌ No Entity Framework
- ❌ No SQL Server
- ❌ No PostgreSQL
- ❌ No MongoDB
- ❌ No SQLite
- ❌ No ORM
- ❌ No migrations
- ❌ No database connection strings

Instead, backend data is seeded into in-memory C# collections at startup.

```text
ASP.NET Core
     │
     ▼
InMemory Repository
     │
     ▼
Seeded Data
```

Frontend state is handled using Angular Signals and services.

### Important consequence

Because the architecture is intentionally in-memory:

> **Data resets whenever the ASP.NET Core process restarts.**

Client-side demo state such as watchlists and carts also resets when the page is reloaded.

This is intentional. The primary goal is to demonstrate **architecture, component design, state management, and UI engineering**, not persistence.

---

# 🔌 API Endpoints

## Platform API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/platforms` | List platform summaries |
| `GET` | `/api/platforms/{id}` | Get a platform summary |
| `GET` | `/api/platforms/{id}/configuration` | Get theme/layout/section configuration |

## Theme API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/themes` | List all themes |
| `GET` | `/api/themes/{id}` | Get one theme |

## OTT API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/content?platformId={id}` | Get platform content |
| `GET` | `/api/content/{id}` | Get content details |

## Shopping API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/categories?platformId={id}` | Get platform categories |
| `GET` | `/api/products?platformId={id}` | Get platform products |
| `GET` | `/api/products/{id}` | Get product details |

> Additional APIs for Music, Social, News, Creator, Professional Networking, Authentication, Admin, Search, and other phases are planned as the project progresses.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have:

- .NET 10 SDK
- Node.js
- npm
- Angular CLI (if required by your local workflow)

Verify your environment:

```bash
dotnet --version
node --version
npm --version
```

---

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd DigitalUniverse
```

---

## 2. Start the backend

From the `server/` directory:

```bash
dotnet run
```

The API runs at:

```text
http://localhost:5146
```

The configured port can be checked in:

```text
server/Properties/launchSettings.json
```

---

## 3. Start the frontend

From the `client/` directory:

```bash
npm install
npm start
```

The Angular application runs at:

```text
http://localhost:4200
```

During development, `/api/*` requests are proxied to the ASP.NET Core backend through:

```text
proxy.conf.json
```

---

# 🏗️ Build

## Build the complete .NET solution

From the repository root:

```bash
dotnet build
```

## Build the Angular application

From `client/`:

```bash
npm run build
```

---

# 🧪 Testing

Run Angular unit tests:

```bash
npm test
```

The frontend test suite uses **Vitest**.

.NET test projects will be introduced when meaningful backend business logic requires dedicated automated coverage.

---

# 🗺️ Development Roadmap

Digital Universe is being developed as an **18-phase architecture journey**.

```text
01  Platform Engine
02  Configuration-Driven Rendering
03  Theme Engine
04  OTT Experience
05  Shopping Experience
06  Social Experience
07  Music Experience
08  News Experience
09  Creator Experience
10  Professional Experience
11  Authentication & RBAC
12  Admin Experience
13  SignalR / Realtime
14  Search
15  Testing
16  Performance & Accessibility
17  UI / UX Polish
18  Documentation
```

### Current progress

```text
Platform Engine        ████████████████████  Complete
Theme Engine            ████████████████████  Complete
OTT                     ████████████████████  Complete
Shopping                ████████████████████  Complete
Social                  ░░░░░░░░░░░░░░░░░░░░  Upcoming
Music                   ░░░░░░░░░░░░░░░░░░░░  Upcoming
News                    ░░░░░░░░░░░░░░░░░░░░  Upcoming
Creator                 ░░░░░░░░░░░░░░░░░░░░  Upcoming
Professional            ░░░░░░░░░░░░░░░░░░░░  Upcoming
```

---

# ⚠️ Current Limitations

Digital Universe is intentionally a demonstration/portfolio architecture.

### Persistence

All backend data is in-memory and resets after the server restarts.

### Demo state

The following are currently client-side only:

- OTT watchlist
- Continue Watching progress
- Shopping cart
- Shopping wishlist

They reset after a page reload.

### Checkout

Checkout is a UI/validation demonstration.

There is:

- ❌ No real payment gateway
- ❌ No order persistence
- ❌ No transaction processing

### Authentication

Authentication introduced in later phases is demonstration-only and **must not be treated as production authentication**.

### Remaining platforms

Music, Social, News, Creator, and Professional experiences currently rely on the generic Platform Engine until their dedicated implementation phases are completed.

---

# 🎯 Engineering Goals

Digital Universe is intentionally designed around several engineering principles:

### 1. Reusability

Build components once and reuse them across multiple digital products.

### 2. Configuration over duplication

Prefer configuration-driven behavior over creating separate implementations for every platform.

### 3. Separation of concerns

Keep:

```text
Core
Shared
Features
Platform Engine
Backend Services
Repositories
Middleware
```

clearly separated.

### 4. Domain-specific components where necessary

Not everything should be forced into a generic component.

For example:

```text
MediaCardComponent
    → reusable

ProductCardComponent
    → shopping-specific
```

This keeps abstraction useful rather than excessive.

### 5. Progressive architecture

Each phase builds on the existing architecture instead of creating isolated applications.

---

# 💡 What Makes This Project Different?

Digital Universe is not simply a collection of UI screens.

It is an experiment in answering a larger engineering question:

> **How far can a reusable, configuration-driven application architecture scale before platform-specific requirements justify dedicated experiences?**

The project intentionally explores that boundary.

The generic Platform Engine handles common experiences, while dedicated modules take over when a domain becomes complex enough — such as OTT and Shopping.

That balance between **reuse and specialization** is one of the core architectural goals of the project.

---

# 📌 Project Status

| Area | Status |
|---|---|
| Platform Engine | ✅ Complete |
| Configuration Rendering | ✅ Complete |
| Theme Engine | ✅ Complete |
| OTT Experience | ✅ Complete |
| Shopping Experience | ✅ Complete |
| Social Experience | 🚧 Planned |
| Music Experience | 🚧 Planned |
| News Experience | 🚧 Planned |
| Creator Experience | 🚧 Planned |
| Professional Experience | 🚧 Planned |
| Authentication / RBAC | 🚧 Planned |
| Admin | 🚧 Planned |
| Realtime / SignalR | 🚧 Planned |
| Search | 🚧 Planned |
| Testing | 🚧 Planned |
| Performance / Accessibility | 🚧 Planned |
| Documentation | 🚧 Ongoing |

---

## 🌌 Final Thought

**Digital Universe is built to show architecture, not just screens.**

One codebase.

Multiple digital products.

Shared components.

Dynamic configuration.

Platform-specific experiences where they matter.

> **Build once. Configure differently. Scale intelligently.**

---

### 📄 License

This project is a personal portfolio/learning project. All fictional platforms, names, branding, and sample content are created for demonstration purposes.
