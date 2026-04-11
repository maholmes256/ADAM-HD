# Number Raiders

**Number Raiders** is a browser-based 2D math adventure game for elementary school students ages 6 to 10. Players explore an isometric world, collide with obstacles that trigger math challenges, and earn rewards as they progress through increasingly difficult levels. The game is designed to reinforce addition, subtraction, and multiplication skills through active, game-driven practice.

Built by **Team ADAM-HD** at San Jose State University as part of Software Engineering I.

---

## Table of Contents

- [Overview](#overview)
- [Gameplay](#gameplay)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [Team](#team)

---

## Overview

Number Raiders is a single-player online game built as a game-based learning platform. The core loop puts students inside an explorable map where math problems are woven directly into the gameplay. When a player runs into an obstacle, a math problem is generated on the spot and displayed as an overlay. Solving it correctly clears the path forward. Failing uses up a retry, and running out of retries ends the run.

The platform is built for three audiences. Students play the game and track their own achievements. Parents can view progress reports across sessions. Educators have a dedicated portal to monitor student performance and growth over time. All three roles share a single Firebase backend, with row-level security ensuring each user only sees the data they are meant to see.

---

## Gameplay

Players navigate a tile-based isometric world rendered in 2D. Movement is free within each level, and the map contains obstacles scattered throughout. Colliding with an obstacle pauses movement and triggers the math problem system, which generates a problem based on the current difficulty setting.

**Game states:**

- **Menu** - start a new game, adjust settings, view the evolutions page, or select difficulty
- **Playing** - move around the world and explore the map
- **Paused** - view settings, resume, or quit to menu
- **Problem Solving** - answer the generated math problem before the timer runs out
- **Game Over** - view final score and achievements, retry the level, or return to menu

If the player answers correctly, the obstacle is marked as solved and play resumes. An incorrect answer shows error feedback and returns the player to the problem. Once the timer expires with no remaining retries, the session ends.

**Math topics:**

- Addition
- Subtraction
- Multiplication

Problems are procedurally generated using expression trees, so no two sessions produce the same set of questions and the game never needs a premade problem bank. The same tree structure always evaluates to the same answer, which means answers do not need to be stored separately in the database.

---

## Features

**Core Gameplay**
- Isometric 2D world with single-player level progression
- Map-based exploration with free movement
- Procedurally generated math problems scaled to difficulty
- Timer-based problem solving with limited retries
- Pause menu with settings access mid-session

**User System**
- Account creation with secure profile storage
- Separate portals for students, parents, and educators
- Cross-device cloud saves via Firebase
- Admin dashboard for platform-wide management

**Progress and Rewards**
- Per-session score tracking
- Achievement system unlocked through gameplay
- Parent and educator visibility into student growth over time
- Cosmetic rewards as a low-priority engagement layer

**Platform Requirements**
- Smooth 60+ FPS gameplay
- Cross-browser compatibility
- Child safety content filtering
- Data encrypted at rest and in transit
- Automatic backups with a scalable backend
- Target of 99% uptime

---

## Architecture

### Client and Server

The application is split between a browser-based client and a Firebase backend. The client handles all rendering, game logic, and UI. The server handles authentication, data persistence, and cloud functions.

**Client (Browser)**
- PixiJS renders the isometric world at the WebGL layer
- The custom ECS game engine manages all game objects, logic, and the main loop
- React sits on top as the UI layer, rendering the HUD, menus, and the math problem overlay
- Player input feeds directly into the ECS engine

**Server (Firebase)**
- Firebase Authentication manages user login and account security
- Firestore stores user profiles, game progress, achievements, analytics data, and the math problem pool
- Cloud Functions handle server-side logic and data processing

Communication between client and server uses HTTPS and WebSocket.

### Entity Component System

The game engine is built on a custom ECS architecture rather than traditional object-oriented inheritance. This was chosen for three reasons: scalability as entity count grows, elimination of deep class hierarchies, and efficient component querying during each game tick.

- **Entity** - a unique numeric ID that represents any distinct object in the game world (the player, an obstacle, a collectible, etc.)
- **Component** - pure data attached to an entity, with no logic of its own (Position, Velocity, Sprite, Obstacle, etc.)
- **System** - logic that runs every tick and operates on all entities that possess a specific set of components (MovementSystem, CollisionSystem, RenderSystem, MathProblemSystem, etc.)

### Isometric Rendering

The 2D grid is projected into isometric space using a standard linear transformation, giving the world a pseudo-3D appearance without the overhead of actual 3D geometry.

### Math Problem Generation

Problems are built as expression trees where each internal node is an operator and each leaf is a number. Trees are constructed procedurally at runtime, so the game generates fresh problems on demand without querying a database. Evaluation uses a bottom-up depth-first traversal, respecting standard order of operations.

### Database Schema

```
users/
  {userId}/
    user schema        -- display name, role, account info
    progress/
      progress schema  -- current level, score, unlocked achievements

problems/
  {problemId}/
    spec               -- difficulty parameters used to generate the tree
    expr               -- the serialized expression tree
    createdAt
    expiresAt
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Rendering | PixiJS (WebGL) |
| UI | React |
| Game Engine | Custom ECS (TypeScript) |
| Backend | Firebase |
| Build Tool | Vite |
| Testing | Vitest |
| CI/CD | GitHub Actions |
| Issue Tracking | GitHub Issues |


---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
git clone https://github.com/maholmes256/ADAM-HD.git
cd ADAM-HD
npm install
```

### Running Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

---

## Project Structure

```
ADAM-HD/
├── src/
│   ├── core/          # ECS engine (Engine, types)
│   ├── systems/       # Game systems (Movement, Collision, Render, MathProblem)
│   ├── components/    # Component definitions (Position, Velocity, Sprite, etc.)
│   ├── ui/            # React UI layer (HUD, menus, math problem overlay)
│   └── main.ts        # Application entry point
├── index.html
├── style.css
└── eslint.config.js
```

---

## Testing

Testing uses Vitest for unit and component tests, with GitHub Actions running the full suite on every push. Bugs are logged and tracked through GitHub Issues.

**Test levels:**

| Level | Scope |
|-------|-------|
| Unit | Math problem generation, collision event triggering |
| Component | MovementSystem + CollisionSystem, MathProblemSystem + MathProblemUI |
| System | Full gameplay loop, complete user session |
| Release | Login verification, production build launch |

**Defect severity tiers:**

| Priority | Description | Response Time | Resolution Target |
|---------|-------------|---------------|-------------------|
| Critical | Game crash, data loss, security breach | Immediate | Within 24 hours |
| High | Major feature broken with no workaround | Within 4 hours | Within 3 days |
| Medium | Feature broken but workaround exists | Within 24 hours | Before release |
| Low | Minor UI issues, typos, cosmetic bugs | Within 1 week | If time permits |

---

## Contributing

Development runs on two-week sprints. At the end of each sprint, the team demos working modules and records the number of functional requirements completed. A weekly meeting produces updated meeting minutes and Gantt chart revisions.

**Workflow:**
1. Pick up an issue from the [GitHub Issues](https://github.com/maholmes256/ADAM-HD/issues) board
2. Create a branch and open a pull request when ready
3. The Software Architect reviews all PRs and provides code feedback before merging
4. GitHub Actions runs the test suite automatically on every push

Bug reports should be filed as GitHub Issues and tagged with the appropriate severity label.

---

## Team

| Name | Role |
|------|------|
| Matthew Ho | Project Manager / Product Planning |
| Hailey Myers | Product Requirements |
| Arnav Kumar | Software Architect |
| Destiny Freeman | QA and Testing Lead |
| Ayesha Sabzwari | Developer |
| Davit Kostanyan | Developer |

---

## License

MIT
