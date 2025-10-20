# 🌊 River Rescue: Clean the Mekong

## Overview
River Rescue is an interactive pixel-art arcade game that combines fast-paced gameplay with environmental education. Players take on the role of a volunteer captain of the River Rescue Team, tasked with cleaning the Mekong River by collecting floating trash while dodging obstacles and racing against time.

## Game Concept
The game addresses the critical issue of plastic pollution in Vietnam's rivers, particularly the Mekong and Saigon Rivers. With Vietnam discarding an estimated 3.7 million tons of plastic waste annually, this game aims to raise awareness about river pollution and inspire players to take action in real life.

## How to Run the Game

### Option 1: Play the Standalone HTML Version (Recommended for Submission)
1. Navigate to `game_submission/game_app/`
2. Open `index.html` in your web browser
3. The game will load and you can start playing immediately

### Option 2: Run the Full React + Vite + Phaser Development Version
1. From the root directory of the repository:
   ```bash
   npm install
   npm run dev
   ```
2. Open the link shown in terminal (usually http://localhost:5173)

### Option 3: Build Production Version
```bash
npm run build
npm run preview
```

## Controls
- **Hold Space** or **Hold Mouse Button** → Move boat up
- **Release** → Boat falls down
- Collect trash, avoid obstacles, grab power-ups!

## Gameplay Mechanics

### Objective
Clean the river by collecting as much trash as possible within 60 seconds. The more trash you collect, the cleaner the river becomes, transforming from murky brown to crystal blue.

### Game Elements

| Element | Type | Description | Sustainability Message |
|---------|------|-------------|----------------------|
| 🛶 Boat | Player | Your eco-volunteer vessel | Individual agency in sustainability |
| 🧴 Plastic Bottle | Collectible (+10 pts) | Common single-use item | Global plastic pollution crisis |
| 🥫 Can | Collectible (+15 pts) | Aluminum beverage can | Importance of recycling |
| 🗑️ Plastic Bag | Collectible (+25 pts) | Floating bag | Microplastics harm to aquatic life |
| 🌲 Log | Obstacle (-20 pts) | Floating debris | Natural challenges |
| 🎣 Fishing Net | Obstacle (-20 pts) | Discarded net | Ghost gear endangers marine life |
| 🚤 Submarine | Obstacle (-20 pts) | Industrial pollution | Underwater industrial threats |
| 🧲 Turbo Cleaner | Power-up | Attracts nearby trash for 5s | Technology's role in cleanup |
| 🛡️ Eco Shield | Power-up | Temporary invincibility (4s) | Environmental resilience |
| ⏱️ Eco Boost | Power-up | Adds 10 seconds to timer | Urgency of climate action |

### Scoring & Progression
- **Trash Collection**: Each type of trash has different point values
- **Cleanliness Stages**: The background evolves through 7 stages (0-6) as you collect more trash
- **Thresholds**: 0 → 100 → 200 → 350 → 500 → 700 → 900 points
- **High Score**: Your best score is saved locally using browser storage
- **Total Impact**: The game tracks total trash collected across all play sessions

## Educational Impact

### Real-World Connection
- The Mekong River is a lifeline for millions in Vietnam and Southeast Asia
- Plastic pollution is a growing crisis affecting marine ecosystems
- Small, consistent actions lead to visible change
- Community clean-up efforts make real differences

### Key Messages
1. **Individual Action Matters**: Every piece of trash collected represents real-world cleanup actions
2. **Interconnectedness**: River health affects ecology, economy, and community
3. **Proper Waste Disposal**: Single-use plastic reduction is crucial
4. **Technology & Innovation**: Solutions exist through community action and tech

## Technology Stack

### Game Engine & Framework
- **Phaser 3** (v3.60.0) - 2D game engine for rendering and physics
- **React** (v18.2.0) - Modern UI framework
- **Vite** (v5.4.0) - Fast build tool and dev server
- **TypeScript** (v5.6.3) - Type-safe development

### Development Tools
- **VS Code** - Primary IDE
- **Git/GitHub** - Version control
- **npm** - Package management

### AI Tools Used
- **GitHub Copilot** - Code generation and completion
- **ChatGPT/Claude** - Game design brainstorming, prompt engineering
- **AI Image Generators** - Asset creation (backgrounds, sprites)

## Project Structure
```
game_submission/
├── README.md                    # This file
├── project_report.pdf           # Detailed project report
├── youtube_link.txt             # Demo video link
├── prompts/                     # AI prompts used
│   ├── concept_prompts.txt
│   ├── asset_generation_prompts.txt
│   ├── code_generation_prompts.txt
│   └── refinement_prompts.txt
├── game_app/                    # Playable web game
│   ├── index.html
│   ├── css/styles.css
│   ├── js/game.js
│   └── assets/
└── screenshots/                 # Game screenshots
    ├── menu_screen.png
    ├── play_screen1.png
    ├── play_screen2.png
    ├── play_screen3.png
    └── results_screen.png
```

## Features

### Core Gameplay
✅ Smooth physics-based controls (Jetpack Joyride-style)
✅ Dynamic background that changes based on cleanliness
✅ Multiple collectible types with varying point values
✅ Three types of obstacles with collision detection
✅ Three power-ups with unique effects
✅ 60-second time limit with visual timer
✅ Score and trash counter tracking

### Polish & Quality
✅ Pixel-art aesthetic with custom sprites
✅ Saigon River-inspired backgrounds
✅ Local storage for persistent high scores
✅ Responsive UI with game statistics
✅ Educational facts on end screen
✅ Menu system with About and Stats sections

### Accessibility
✅ Multiple control schemes (keyboard + mouse)
✅ Clear visual feedback
✅ Readable text and UI
✅ Instant restart capability

## Customization & Extensibility

All assets are easily replaceable in `/public/assets/`:
- **Backgrounds**: 7 stages in `backgrounds/` folder
- **Sprites**: Individual PNG files for boat, trash, obstacles, power-ups
- **Asset Mapping**: Centralized in `src/game/assets.ts`

To reskin the game for different regions or themes:
1. Replace PNG files in `/public/assets/`
2. Update filenames in `src/game/assets.ts` if needed
3. Adjust `CLEAN_THRESHOLDS` in `src/game/settings.ts` for difficulty

## Future Enhancements
- 🔊 Sound effects and background music
- 📱 Mobile touch controls optimization
- 🌐 Online leaderboards
- 🎮 Additional game modes (endless, time trial)
- 🎨 Sprite sheet animations
- 🌍 Multi-language support
- 📊 Detailed statistics dashboard

## Credits & Acknowledgements
Created to raise awareness about river pollution, plastic waste, and sustainable living in Vietnam 🇻🇳

Inspired by:
- Real community clean-up efforts along the Mekong and Saigon Rivers
- The urgent need for environmental action in Southeast Asia
- Classic arcade games like Jetpack Joyride and Flappy Bird

Built with dedication to environmental conservation and interactive learning.

## Contact & Contributions
For questions, suggestions, or contributions, please visit the GitHub repository.

---

**Remember**: Every action in the game represents a real-world opportunity to make a difference. Start by reducing single-use plastics, recycling properly, and joining local river clean-up initiatives! 🌍💚
