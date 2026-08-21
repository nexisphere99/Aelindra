# AELINDRA   Initial Project Setup
## Code Agent Prompt: File Structure, Medieval UI, & MC Portrait Sidebar
### SugarCube 2.37+ | Twine Implementation
### Execute THIS FIRST   before any day content

---

## OVERVIEW

This prompt establishes the entire project skeleton: folder structure, SugarCube configuration, the medieval dark-fantasy UI theme, the stat system HUD, and the **right sidebar with MC standing portrait** that updates as the transformation progresses. Nothing story-related goes here   this is pure infrastructure.

After this is built, day content (Day -2, -1, 0, etc.) plugs into the framework.

---

## PART 1: TWINE PROJECT FILE STRUCTURE

Create this folder hierarchy. Every folder must exist before day content is added.

```
AELINDRA/
│
├── index.html                          ← Twine compiled output (generated)
│
├── src/                                ← Source files for Twine
│   ├── config/
│   │   ├── StoryInit.twee                ← All global variable declarations
│   │   ├── StoryTitle.twee               ← Game title
│   │   ├── StoryInterface.twee           ← Custom 3-panel layout (LEFT sidebar | CENTER passage | RIGHT sidebar)
│   │   ├── StoryCaption.twee             ← Left sidebar content (stats, time, objectives)
│   │   └── PassageHeader.twee            ← Auto-injected header for every passage
│   │
│   ├── ui/
│   │   ├── stylesheet.css              ← Master CSS   medieval theme, layout, components
│   │   ├── script.js                   ← Master JS   custom macros, widgets, utility functions
│   │   ├── widgets.twee                  ← SugarCube widget definitions (objectives, stat bars, etc.)
│   │   └── fonts/                      ← Local font files (fallback if CDN unavailable)
│   │       ├── Cinzel-Regular.woff2
│   │       ├── Cinzel-Bold.woff2
│   │       ├── CormorantGaramond-Regular.woff2
│   │       ├── CormorantGaramond-Italic.woff2
│   │       └── CormorantGaramond-SemiBold.woff2
│   │
│   ├── systems/
│   │   ├── objectives.twee               ← Objective tracker system (add/complete/display)
│   │   ├── inventory.twee                ← Inventory system
│   │   ├── wardrobe.twee                 ← Wardrobe/outfit system (future   stub now)
│   │   ├── time-system.twee              ← Time slot advancement logic
│   │   ├── stat-checks.twee              ← Stat check resolution macros
│   │   └── mc-portrait.twee              ← Right sidebar portrait manager
│   │
│   ├── passages/
│   │   ├── title-screen.twee             ← Title / main menu screen
│   │   ├── path-select.twee             ← Full Female vs Futanari path selection
│   │   ├── credits.twee                  ← Credits passage
│   │   └── days/                       ← Day content goes here (added per-day)
│   │       ├── day_minus_2/
│   │       ├── day_minus_1/
│   │       ├── day_0/
│   │       └── ...
│   │
│   └── assets/
│       ├── images/
│       │   ├── ui/                     ← UI elements (borders, buttons, textures)
│       │   │   ├── stone-texture.png
│       │   │   ├── parchment-bg.png
│       │   │   ├── wax-seal.png
│       │   │   ├── gold-border.png
│       │   │   ├── divider-ornate.png
│       │   │   └── sidebar-frame.png
│       │   │
│       │   ├── portraits/              ← MC standing portraits (right sidebar)
│       │   │   ├── edrin_default.png           ← Day -2 to Day 0: Male Edrin
│       │   │   ├── edrin_stressed.png          ← Male Edrin, stressed variant
│       │   │   ├── edrin_training.png          ← Male Edrin, training yard
│       │   │   ├── aelindra_day1.png           ← Day 1: Early transformation
│       │   │   ├── aelindra_day3.png           ← Day 3: Mid transformation
│       │   │   ├── aelindra_day7.png           ← Day 7: Transformation complete
│       │   │   ├── aelindra_day30.png          ← Month 1 end: B→C cup
│       │   │   ├── aelindra_day60.png          ← Month 2 end: C→D cup
│       │   │   ├── aelindra_day90.png          ← Month 3 end: D→DD cup
│       │   │   ├── aelindra_day120.png         ← Final: Coronation
│       │   │   ├── aelindra_futa_day1.png      ← Futa variants (same progression)
│       │   │   ├── aelindra_futa_day3.png
│       │   │   ├── aelindra_futa_day7.png
│       │   │   └── ...
│       │   │
│       │   ├── locations/              ← Location header images
│       │   │   ├── palace_chambers.png
│       │   │   ├── training_yard.png
│       │   │   ├── queen_chambers.png
│       │   │   ├── grand_library.png
│       │   │   ├── royal_gardens.png
│       │   │   ├── moonspire_tower.png
│       │   │   ├── kitchens.png
│       │   │   └── ...
│       │   │
│       │   └── npcs/                   ← NPC portraits (shown in dialogue)
│       │       ├── aldric.png
│       │       ├── seraphina.png
│       │       ├── ilara.png
│       │       ├── rowan.png
│       │       ├── rosalind.png
│       │       ├── kael.png
│       │       ├── lyra.png
│       │       └── ...
│       │
│       └── audio/                      ← (Future   ambient music, SFX)
│           ├── ambient/
│           └── sfx/
```

---

## PART 2: SUGARCUBE CONFIGURATION FILES

### StoryTitle.twee

```html
:: StoryTitle
AELINDRA: The Rite of Becoming
```

### StoryInterface.twee   THREE-PANEL LAYOUT

This is the critical file. SugarCube's default layout is: left sidebar + passage area. We're adding a **right sidebar** for the MC portrait. The layout becomes:

```
┌──────────────┬─────────────────────────────┬──────────────┐
│              │                             │              │
│  LEFT        │       CENTER                │  RIGHT       │
│  SIDEBAR     │       PASSAGE               │  SIDEBAR     │
│              │       (story text)           │              │
│  Stats       │                             │  MC Portrait │
│  Time        │                             │  Name/Title  │
│  Objectives  │                             │  Body Stats  │
│  Location    │                             │  Outfit      │
│              │                             │              │
└──────────────┴─────────────────────────────┴──────────────┘
```

```html
:: StoryInterface [nobr]
<div id="aelindra-wrapper">

  <!-- LEFT SIDEBAR   Stats, Time, Objectives -->
  <div id="sidebar-left" role="complementary">
    <div id="sidebar-left-inner">

      <!-- Game Logo / Title -->
      <div id="game-logo">
        <h1 id="game-title">AELINDRA</h1>
        <p id="game-subtitle">The Rite of Becoming</p>
      </div>

      <!-- Day & Time Display -->
      <div id="time-block" class="sidebar-section">
        <div id="day-display"></div>
        <div id="time-display"></div>
      </div>

      <!-- Resource Bars -->
      <div id="resource-bars" class="sidebar-section">
        <div id="energy-bar-container" class="resource-bar-wrap">
          <label>Energy</label>
          <div class="bar-track"><div id="energy-bar" class="bar-fill energy"></div></div>
          <span id="energy-val" class="bar-val"></span>
        </div>
        <div id="stress-bar-container" class="resource-bar-wrap">
          <label>Stress</label>
          <div class="bar-track"><div id="stress-bar" class="bar-fill stress"></div></div>
          <span id="stress-val" class="bar-val"></span>
        </div>
        <div id="arousal-bar-container" class="resource-bar-wrap" style="display:none;">
          <label>Arousal</label>
          <div class="bar-track"><div id="arousal-bar" class="bar-fill arousal"></div></div>
          <span id="arousal-val" class="bar-val"></span>
        </div>
      </div>

      <!-- Primary Stats -->
      <div id="stat-block" class="sidebar-section">
        <h3 class="section-head">Attributes</h3>
        <div id="stat-list"></div>
      </div>

      <!-- Objective Panel -->
      <div id="objective-panel" class="sidebar-section">
        <h3 class="section-head">⚔ Objectives</h3>
        <div id="obj-main-section">
          <h4 class="obj-type-head">Main</h4>
          <ul id="obj-main-list"></ul>
        </div>
        <div id="obj-side-section">
          <h4 class="obj-type-head">Side</h4>
          <ul id="obj-side-list"></ul>
        </div>
      </div>

      <!-- Gold -->
      <div id="gold-block" class="sidebar-section">
        <span class="gold-icon">🪙</span> <span id="gold-val"></span> gold
      </div>

      <!-- Menu Buttons -->
      <div id="sidebar-menu" class="sidebar-section">
        <button id="btn-save" class="menu-btn" onclick="UI.saves()">💾 Save</button>
        <button id="btn-load" class="menu-btn" onclick="UI.saves()">📂 Load</button>
        <button id="btn-settings" class="menu-btn" onclick="UI.settings()">⚙ Settings</button>
      </div>

    </div>
  </div>

  <!-- CENTER   Passage Content -->
  <div id="passage-wrapper">
    <div id="passage-container" data-passage="">
      <div id="passages"></div>
    </div>
  </div>

  <!-- RIGHT SIDEBAR   MC Portrait & Body Info -->
  <div id="sidebar-right" role="complementary">
    <div id="sidebar-right-inner">

      <!-- MC Portrait Frame -->
      <div id="mc-portrait-frame">
        <div id="mc-portrait-border">
          <img id="mc-portrait-img" src="" alt="Character Portrait">
        </div>
      </div>

      <!-- MC Name & Title -->
      <div id="mc-name-block">
        <div id="mc-name"></div>
        <div id="mc-title"></div>
      </div>

      <!-- Body Status (appears after transformation begins) -->
      <div id="body-status-block" style="display:none;">
        <h3 class="section-head">Body</h3>
        <div id="body-stats">
          <div class="body-stat-row">
            <span class="body-label">Height</span>
            <span id="bs-height" class="body-value"></span>
          </div>
          <div class="body-stat-row">
            <span class="body-label">Bust</span>
            <span id="bs-bust" class="body-value"></span>
          </div>
          <div class="body-stat-row">
            <span class="body-label">Waist</span>
            <span id="bs-waist" class="body-value"></span>
          </div>
          <div class="body-stat-row">
            <span class="body-label">Hips</span>
            <span id="bs-hips" class="body-value"></span>
          </div>
          <div class="body-stat-row">
            <span class="body-label">Sensitivity</span>
            <span id="bs-sensitivity" class="body-value"></span>
          </div>
        </div>
      </div>

      <!-- Current Outfit (appears when wardrobe unlocks) -->
      <div id="outfit-block" style="display:none;">
        <h3 class="section-head">Outfit</h3>
        <div id="current-outfit"></div>
      </div>

      <!-- Relationship Quick-View -->
      <div id="relationship-block" style="display:none;">
        <h3 class="section-head">Bonds</h3>
        <div id="rel-list"></div>
      </div>

    </div>
  </div>

</div>
```

### StoryInit.twee   ALL GLOBAL VARIABLES

```html
:: StoryInit [nobr]

/* ============================================================
   AELINDRA   GLOBAL VARIABLE INITIALIZATION
   All variables declared here. Day-specific flags are set
   in each day's transition passage, NOT here.
   ============================================================ */

/* --- META --- */
<<set $gamePath to "none">>             /* "female" or "futa"   set at path selection */
<<set $dayNumber to -2>>
<<set $dayLabel to "The Summons">>
<<set $timeSlot to "MORNING">>          /* MORNING, MIDDAY, AFTERNOON, EVENING, NIGHT */
<<set $gameStarted to false>>

/* --- PRIMARY STATS (0-100) --- */
<<set $statGRA to 0>>       /* Grace */
<<set $statAUT to 0>>       /* Authority */
<<set $statALL to 0>>       /* Allure */
<<set $statPRO to 0>>       /* Prowess */
<<set $statWIS to 0>>       /* Wisdom */
<<set $statRES to 0>>       /* Resolve */

/* --- RESOURCE STATS --- */
<<set $energy to 100>>
<<set $stress to 30>>
<<set $arousal to 0>>
<<set $gold to 500>>

/* --- HIDDEN STATS --- */
<<set $corruption to 0>>
<<set $devotion to 0>>
<<set $maternal to 0>>
<<set $dominance to 0>>
<<set $submission to 0>>

/* --- LORE / KNOWLEDGE --- */
<<set $loreSuc to 0>>            /* Succession law knowledge */
<<set $libraryLore to false>>
<<set $riteKnowledge to 0>>

/* --- AFFINITY (Romance NPCs) --- */
<<set $affAldric to 0>>
<<set $affRosalind to 0>>
<<set $affRowan to 0>>
<<set $affKael to 0>>
<<set $affLyra to 0>>

/* --- AFFINITY (Key NPCs) --- */
<<set $affSeraphina to 0>>
<<set $ilaraFamiliarity to 0>>
<<set $silverveilFamiliarity to 0>>

/* --- REPUTATION --- */
<<set $repStaff to 0>>
<<set $repMilitary to 0>>
<<set $repCourt to 0>>
<<set $repSilverveil to 0>>
<<set $repCommon to 0>>

/* --- POLITICAL --- */
<<set $ashborneThreat to 0>>
<<set $queenHealth to 100>>       /* Decreases over 120 days */
<<set $guardLoyalty to 0>>
<<set $householdReady to 0>>

/* --- BODY (pre-transformation defaults   male) --- */
<<set $mcName to "Edrin">>
<<set $mcTitle to "Prince of Aethermere">>
<<set $mcHeight to "5'11\"">>
<<set $mcBust to " ">>
<<set $mcWaist to "31\"">>
<<set $mcHips to "31\"">>
<<set $mcSensitivity to "Normal">>
<<set $mcBreastSize to " ">>
<<set $mcPortrait to "edrin_default">>
<<set $bodyStatusVisible to false>>

/* --- OUTFIT --- */
<<set $currentOutfit to "Leather jerkin, dark trousers, boots">>
<<set $outfitGRA to 0>>
<<set $outfitALL to 0>>
<<set $outfitAUT to 0>>
<<set $wardrobeUnlocked to false>>

/* --- OBJECTIVES --- */
<<set $objectives to []>>
<<set $completedObjectives to []>>

/* --- INVENTORY --- */
<<set $inventory to []>>
<<set $hasVelthamLetter to false>>

/* --- QUEST FLAGS --- */
<<set $vaelinQuestActive to false>>

/* --- PREGNANCY (future) --- */
<<set $pregnant to false>>
<<set $conceptionDay to -1>>
<<set $trimester to 0>>

/* --- RELATIONSHIP STATUS --- */
<<set $romancePrimary to "none">>
<<set $relationshipsVisible to false>>
```

### PassageHeader.twee   AUTO-INJECTED HEADER

```html
:: PassageHeader [nobr]
<<run updateSidebars()>>
```

---

## PART 3: MASTER CSS   MEDIEVAL DARK FANTASY THEME

```css
/* ================================================================
   AELINDRA   MASTER STYLESHEET
   Medieval Dark Fantasy Theme
   Color Palette: Deep purples, golds, dark stone, candlelight amber, blood red
   Fonts: Cinzel (headings), Cormorant Garamond (body)
   ================================================================ */

/* --- FONT IMPORTS --- */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

/* --- CSS VARIABLES --- */
:root {
  /* Backgrounds */
  --bg-deepest:       #0d0a0f;
  --bg-primary:       #1a1118;
  --bg-secondary:     #231a20;
  --bg-card:          #2a1f26;
  --bg-card-hover:    #342830;
  --bg-passage:       #1e1520;
  --bg-input:         #160f14;

  /* Text */
  --text-primary:     #d4c5a9;
  --text-bright:      #e8dcc4;
  --text-dim:         #8a7e6b;
  --text-faint:       #5a5145;

  /* Accents */
  --gold:             #c9a84c;
  --gold-bright:      #e0c168;
  --gold-dim:         #8a7433;
  --red:              #8b2d2d;
  --red-bright:       #b33a3a;
  --purple:           #5c3d6e;
  --purple-bright:    #7e55a0;
  --purple-dim:       #3a2548;
  --amber:            #b8860b;
  --teal:             #2d6b6b;

  /* Borders */
  --border-stone:     #3a2e35;
  --border-gold:      rgba(201, 168, 76, 0.3);
  --border-purple:    rgba(92, 61, 110, 0.4);

  /* Gradients */
  --grad-sidebar:     linear-gradient(180deg, #1a1118 0%, #0d0a0f 100%);
  --grad-passage:     linear-gradient(180deg, #1e1520 0%, #1a1118 100%);
  --grad-gold:        linear-gradient(135deg, #c9a84c 0%, #8a7433 100%);

  /* Shadows */
  --shadow-card:      0 2px 8px rgba(0,0,0,0.4);
  --shadow-glow-gold: 0 0 12px rgba(201, 168, 76, 0.15);
  --shadow-glow-purple: 0 0 12px rgba(126, 85, 160, 0.15);

  /* Fonts */
  --font-heading:     'Cinzel', 'Georgia', serif;
  --font-body:        'Cormorant Garamond', 'Garamond', 'Times New Roman', serif;
  --font-ui:          'Cinzel', serif;

  /* Sizing */
  --sidebar-left-w:   260px;
  --sidebar-right-w:  240px;
  --portrait-max-w:   200px;
  --portrait-max-h:   360px;
  --bar-height:       8px;
  --border-radius:    6px;
}


/* ================================================================
   GLOBAL RESETS & BASE
   ================================================================ */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg-deepest);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.75;
  overflow-x: hidden;
}


/* ================================================================
   HIDE DEFAULT SUGARCUBE UI
   We replace it entirely with StoryInterface
   ================================================================ */

#ui-bar, #ui-bar-toggle, #ui-bar-history {
  display: none !important;
}

#story {
  margin: 0 !important;
  padding: 0 !important;
}


/* ================================================================
   THREE-PANEL LAYOUT
   ================================================================ */

#aelindra-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* --- LEFT SIDEBAR --- */
#sidebar-left {
  width: var(--sidebar-left-w);
  min-width: var(--sidebar-left-w);
  background: var(--grad-sidebar);
  border-right: 1px solid var(--border-stone);
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
}

#sidebar-left-inner {
  padding: 20px 16px;
}

/* --- CENTER PASSAGE --- */
#passage-wrapper {
  flex: 1;
  margin-left: var(--sidebar-left-w);
  margin-right: var(--sidebar-right-w);
  background: var(--grad-passage);
  min-height: 100vh;
}

#passage-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 40px 32px;
}

/* --- RIGHT SIDEBAR --- */
#sidebar-right {
  width: var(--sidebar-right-w);
  min-width: var(--sidebar-right-w);
  background: var(--grad-sidebar);
  border-left: 1px solid var(--border-stone);
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
}

#sidebar-right-inner {
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


/* ================================================================
   LEFT SIDEBAR COMPONENTS
   ================================================================ */

/* Game Logo */
#game-logo {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-gold);
}

#game-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.15em;
  margin: 0;
  text-shadow: 0 0 20px rgba(201, 168, 76, 0.2);
}

#game-subtitle {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dim);
  font-style: italic;
  margin: 4px 0 0;
}

/* Sidebar Sections */
.sidebar-section {
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(58, 46, 53, 0.5);
}

.section-head {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 10px;
}

/* Time Block */
#time-block {
  text-align: center;
}

#day-display {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--text-bright);
  letter-spacing: 0.08em;
}

#time-display {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--amber);
  font-style: italic;
  margin-top: 2px;
}

/* Resource Bars */
.resource-bar-wrap {
  margin-bottom: 10px;
}

.resource-bar-wrap label {
  font-family: var(--font-ui);
  font-size: 0.65rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}

.bar-track {
  width: 100%;
  height: var(--bar-height);
  background: var(--bg-input);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-stone);
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.bar-fill.energy {
  background: linear-gradient(90deg, var(--teal), #4a9e9e);
}

.bar-fill.stress {
  background: linear-gradient(90deg, var(--amber), var(--red-bright));
}

.bar-fill.arousal {
  background: linear-gradient(90deg, #9b3a6e, #d44a8e);
}

.bar-val {
  font-family: var(--font-ui);
  font-size: 0.6rem;
  color: var(--text-dim);
  float: right;
  margin-top: 2px;
}

/* Stat List */
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid rgba(58, 46, 53, 0.3);
}

.stat-label {
  font-family: var(--font-ui);
  font-size: 0.7rem;
  color: var(--text-dim);
  letter-spacing: 0.06em;
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--text-bright);
  font-weight: 600;
}

.stat-value.highlight {
  color: var(--gold);
}

/* Objective Panel */
.obj-type-head {
  font-family: var(--font-ui);
  font-size: 0.6rem;
  color: var(--gold-dim);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 8px 0 4px;
}

#obj-main-list, #obj-side-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

#obj-main-list li, #obj-side-list li {
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 5px 0 5px 16px;
  position: relative;
  color: var(--text-primary);
  line-height: 1.4;
}

#obj-main-list li::before {
  content: '⚔';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 0.7rem;
}

#obj-side-list li::before {
  content: '◆';
  position: absolute;
  left: 2px;
  color: var(--text-dim);
  font-size: 0.5rem;
  top: 9px;
}

#obj-side-list li {
  color: var(--text-dim);
  font-size: 0.85rem;
}

/* Gold Display */
#gold-block {
  text-align: center;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--gold);
}

.gold-icon {
  font-size: 1rem;
}

/* Menu Buttons */
#sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  color: var(--text-dim);
  font-family: var(--font-ui);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 7px 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--gold-dim);
  color: var(--text-primary);
}


/* ================================================================
   RIGHT SIDEBAR   MC PORTRAIT
   ================================================================ */

/* Portrait Frame */
#mc-portrait-frame {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  margin-top: 8px;
}

#mc-portrait-border {
  width: var(--portrait-max-w);
  max-height: var(--portrait-max-h);
  border: 2px solid var(--gold-dim);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 0 20px rgba(201, 168, 76, 0.08),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
  background: var(--bg-deepest);
}

/* Ornate corner accents */
#mc-portrait-border::before,
#mc-portrait-border::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--gold);
  z-index: 2;
}

#mc-portrait-border::before {
  top: 4px;
  left: 4px;
  border-top: 2px solid var(--gold);
  border-left: 2px solid var(--gold);
}

#mc-portrait-border::after {
  bottom: 4px;
  right: 4px;
  border-bottom: 2px solid var(--gold);
  border-right: 2px solid var(--gold);
}

#mc-portrait-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  min-height: 280px;
  background: var(--bg-deepest);
  /* Placeholder gradient when no image loaded */
  background: linear-gradient(180deg, var(--purple-dim) 0%, var(--bg-deepest) 50%, var(--bg-secondary) 100%);
}

/* MC Name Block */
#mc-name-block {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-gold);
  width: 100%;
}

#mc-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.1em;
}

#mc-title {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-dim);
  font-style: italic;
  margin-top: 2px;
}

/* Body Stats */
#body-status-block {
  width: 100%;
  margin-bottom: 14px;
}

.body-stat-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px solid rgba(58, 46, 53, 0.3);
}

.body-label {
  font-family: var(--font-ui);
  font-size: 0.65rem;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}

.body-value {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-bright);
}

/* Outfit Block */
#outfit-block {
  width: 100%;
  margin-bottom: 14px;
}

#current-outfit {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dim);
  font-style: italic;
  line-height: 1.4;
}

/* Relationship Block */
#relationship-block {
  width: 100%;
}

.rel-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.rel-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-primary);
}

.rel-hearts {
  color: var(--red-bright);
  font-size: 0.7rem;
  letter-spacing: 2px;
}


/* ================================================================
   CENTER PASSAGE   CONTENT STYLING
   ================================================================ */

/* Passage text */
#passages {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
}

#passages p {
  margin: 0 0 1em;
  text-indent: 0;
}

/* Headings in passages */
#passages h2 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 0.1em;
  margin: 0 0 8px;
  text-align: center;
}

#passages h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--gold-dim);
  letter-spacing: 0.08em;
  margin: 16px 0 8px;
}

/* Links */
#passages a {
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  transition: all 0.2s ease;
}

#passages a:hover {
  color: var(--gold-bright);
  border-bottom-color: var(--gold);
  text-shadow: 0 0 8px rgba(201, 168, 76, 0.2);
}

/* Dialogue styling */
.dialogue {
  font-style: italic;
  color: var(--text-bright);
  margin: 8px 0;
  padding-left: 16px;
  border-left: 2px solid var(--gold-dim);
}

.dialogue .speaker {
  font-family: var(--font-heading);
  font-style: normal;
  font-size: 0.8rem;
  color: var(--gold);
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 2px;
}

/* Emphasis */
#passages em {
  color: var(--text-bright);
  font-style: italic;
}

#passages strong {
  color: var(--gold);
  font-weight: 600;
}

/* Horizontal rule / scene divider */
#passages hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  margin: 28px 0;
}


/* ================================================================
   HUB & CARD COMPONENTS
   ================================================================ */

/* Location Grid */
.location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  padding: 16px 0;
}

.loc-card {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: var(--border-radius);
  padding: 16px;
  transition: all 0.25s ease;
  cursor: pointer;
}

.loc-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--gold-dim);
  box-shadow: var(--shadow-glow-gold);
  transform: translateY(-1px);
}

.loc-card.visited {
  opacity: 0.65;
  border-left: 3px solid var(--gold-dim);
}

.loc-card.loc-new {
  border-left: 3px solid var(--purple);
}

.loc-card.loc-new:hover {
  box-shadow: var(--shadow-glow-purple);
}

.loc-card h3 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  color: var(--text-bright);
  margin: 0 0 6px;
  letter-spacing: 0.04em;
}

.loc-flavor {
  font-family: var(--font-body);
  color: var(--text-dim);
  font-style: italic;
  font-size: 0.9rem;
  margin: 6px 0 10px;
  line-height: 1.4;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 3px;
  font-family: var(--font-ui);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 3px 4px 3px 0;
}

.badge.main {
  background: var(--gold);
  color: var(--bg-deepest);
  font-weight: 600;
}

.badge.side {
  background: transparent;
  color: var(--text-dim);
  border: 1px solid var(--border-stone);
}

.badge.discovered {
  background: transparent;
  color: var(--purple-bright);
  border: 1px solid var(--border-purple);
}

/* Interaction Cards (sub-hubs) */
.interaction-card {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: var(--border-radius);
  padding: 14px 16px;
  margin: 10px 0;
  transition: all 0.2s ease;
}

.interaction-card:hover {
  border-color: var(--gold-dim);
  background: var(--bg-card-hover);
}

.interaction-card.main {
  border-left: 3px solid var(--gold);
}

.interaction-card.side {
  border-left: 3px solid var(--text-faint);
}

.interaction-card h4 {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--text-bright);
  margin: 0 0 4px;
}

.interaction-card p {
  font-size: 0.9rem;
  color: var(--text-dim);
  margin: 0;
  line-height: 1.4;
}

/* Empty state */
.empty-note {
  color: var(--text-faint);
  font-style: italic;
  text-align: center;
  padding: 16px;
  font-size: 0.9rem;
}

/* Return navigation */
.nav-return {
  margin-top: 24px;
  text-align: center;
}

.nav-return a {
  color: var(--text-dim);
  font-family: var(--font-ui);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-stone);
  padding-bottom: 2px;
}

.nav-return a:hover {
  color: var(--gold-dim);
  border-bottom-color: var(--gold-dim);
}

/* Scene end / continue */
.scene-end {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border-stone);
  text-align: center;
}

.scene-end a {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--gold);
  letter-spacing: 0.1em;
  text-decoration: none;
  padding: 10px 28px;
  border: 1px solid var(--gold-dim);
  border-radius: var(--border-radius);
  transition: all 0.25s ease;
  display: inline-block;
}

.scene-end a:hover {
  background: rgba(201, 168, 76, 0.1);
  border-color: var(--gold);
  box-shadow: var(--shadow-glow-gold);
  transform: translateY(-1px);
}

/* Day transition screens */
.day-transition {
  text-align: center;
  padding: 40px 20px;
}

.day-transition h2 {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  color: var(--gold);
  margin-bottom: 16px;
}

.day-transition p {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-dim);
  line-height: 1.8;
  max-width: 520px;
  margin: 0 auto 12px;
}

.transition-morning {
  color: var(--amber) !important;
  font-style: italic;
}


/* ================================================================
   STAT CHANGE NOTIFICATION (toast)
   ================================================================ */

.stat-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--gold-dim);
  border-radius: var(--border-radius);
  padding: 8px 20px;
  font-family: var(--font-ui);
  font-size: 0.7rem;
  color: var(--gold);
  letter-spacing: 0.08em;
  z-index: 9999;
  animation: toastIn 0.3s ease, toastOut 0.3s ease 2s forwards;
  box-shadow: var(--shadow-glow-gold);
}

.stat-toast.negative {
  border-color: var(--red);
  color: var(--red-bright);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes toastOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}


/* ================================================================
   RESPONSIVE   MOBILE COLLAPSE
   ================================================================ */

@media (max-width: 1100px) {
  #sidebar-right {
    display: none;
  }
  #passage-wrapper {
    margin-right: 0;
  }
}

@media (max-width: 800px) {
  #sidebar-left {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border-stone);
  }
  #sidebar-left-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px;
  }
  #passage-wrapper {
    margin-left: 0;
  }
  #passage-container {
    padding: 20px 16px;
  }
  .location-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## PART 4: MASTER JAVASCRIPT   SIDEBAR UPDATE FUNCTIONS

```javascript
/* ================================================================
   AELINDRA   MASTER SCRIPT
   Custom macros, sidebar updaters, utility functions
   ================================================================ */

/* --- SIDEBAR UPDATE (called by PassageHeader on every passage render) --- */
window.updateSidebars = function () {
  var sv = State.variables;

  /* --- LEFT SIDEBAR --- */

  // Day & Time
  var dayEl = document.getElementById('day-display');
  var timeEl = document.getElementById('time-display');
  if (dayEl) {
    var dayStr = sv.dayNumber < 0 ? 'Day ' + sv.dayNumber : 'Day ' + sv.dayNumber;
    dayEl.textContent = dayStr + '   ' + sv.dayLabel;
  }
  if (timeEl) timeEl.textContent = sv.timeSlot;

  // Resource Bars
  updateBar('energy', sv.energy);
  updateBar('stress', sv.stress);
  updateBar('arousal', sv.arousal);

  // Show arousal bar only after transformation
  var arousalWrap = document.getElementById('arousal-bar-container');
  if (arousalWrap) arousalWrap.style.display = sv.dayNumber >= 1 ? '' : 'none';

  // Stat List
  var statList = document.getElementById('stat-list');
  if (statList) {
    statList.innerHTML = buildStatRow('GRA', 'Grace', sv.statGRA)
      + buildStatRow('AUT', 'Authority', sv.statAUT)
      + buildStatRow('ALL', 'Allure', sv.statALL)
      + buildStatRow('PRO', 'Prowess', sv.statPRO)
      + buildStatRow('WIS', 'Wisdom', sv.statWIS)
      + buildStatRow('RES', 'Resolve', sv.statRES);
  }

  // Objectives
  renderObjectives(sv.objectives);

  // Gold
  var goldVal = document.getElementById('gold-val');
  if (goldVal) goldVal.textContent = sv.gold;

  /* --- RIGHT SIDEBAR --- */

  // Portrait
  var img = document.getElementById('mc-portrait-img');
  if (img) img.src = 'assets/images/portraits/' + sv.mcPortrait + '.png';

  // Name & Title
  var nameEl = document.getElementById('mc-name');
  var titleEl = document.getElementById('mc-title');
  if (nameEl) nameEl.textContent = sv.mcName;
  if (titleEl) titleEl.textContent = sv.mcTitle;

  // Body Stats
  var bodyBlock = document.getElementById('body-status-block');
  if (bodyBlock) bodyBlock.style.display = sv.bodyStatusVisible ? '' : 'none';
  setTextById('bs-height', sv.mcHeight);
  setTextById('bs-bust', sv.mcBust);
  setTextById('bs-waist', sv.mcWaist);
  setTextById('bs-hips', sv.mcHips);
  setTextById('bs-sensitivity', sv.mcSensitivity);

  // Outfit
  var outfitBlock = document.getElementById('outfit-block');
  if (outfitBlock) outfitBlock.style.display = sv.wardrobeUnlocked ? '' : 'none';
  setTextById('current-outfit', sv.currentOutfit);

  // Relationships
  var relBlock = document.getElementById('relationship-block');
  if (relBlock) relBlock.style.display = sv.relationshipsVisible ? '' : 'none';
};

/* --- HELPERS --- */

function updateBar(id, val) {
  var bar = document.getElementById(id + '-bar');
  var valEl = document.getElementById(id + '-val');
  if (bar) bar.style.width = Math.max(0, Math.min(100, val)) + '%';
  if (valEl) valEl.textContent = Math.round(val);
}

function buildStatRow(abbr, name, val) {
  var cls = val > 0 ? ' highlight' : '';
  return '<div class="stat-row">'
    + '<span class="stat-label">' + abbr + '   ' + name + '</span>'
    + '<span class="stat-value' + cls + '">' + val + '</span>'
    + '</div>';
}

function setTextById(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || ' ';
}

function renderObjectives(objs) {
  var mainList = document.getElementById('obj-main-list');
  var sideList = document.getElementById('obj-side-list');
  if (!mainList || !sideList) return;
  mainList.innerHTML = '';
  sideList.innerHTML = '';
  objs.forEach(function (o) {
    var li = document.createElement('li');
    li.textContent = o.text;
    if (o.type === 'MAIN') mainList.appendChild(li);
    else sideList.appendChild(li);
  });
}

/* --- STAT TOAST NOTIFICATION --- */
window.showStatToast = function (text, negative) {
  var toast = document.createElement('div');
  toast.className = 'stat-toast' + (negative ? ' negative' : '');
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 2500);
};


/* ================================================================
   MC PORTRAIT MANAGER
   Call <<updatePortrait>> after events that change appearance
   ================================================================ */

window.getPortraitForState = function () {
  var sv = State.variables;

  /* Pre-transformation: male Edrin */
  if (sv.dayNumber <= 0) {
    if (sv.stress > 60) return 'edrin_stressed';
    return 'edrin_default';
  }

  /* Post-transformation: path-dependent */
  var prefix = sv.gamePath === 'futa' ? 'aelindra_futa_' : 'aelindra_';

  if (sv.dayNumber <= 3)  return prefix + 'day1';
  if (sv.dayNumber <= 7)  return prefix + 'day3';
  if (sv.dayNumber <= 14) return prefix + 'day7';
  if (sv.dayNumber <= 30) return prefix + 'day7';
  if (sv.dayNumber <= 60) return prefix + 'day30';
  if (sv.dayNumber <= 90) return prefix + 'day60';
  if (sv.dayNumber <= 119) return prefix + 'day90';
  return prefix + 'day120';
};
```

---

## PART 5: WIDGET DEFINITIONS

### widgets.twee

```html
:: widgets [widget nobr]

/* ===== OBJECTIVE SYSTEM ===== */

<<widget "addObjective">>
  <<set _obj to {id: _args[0], text: _args[1], type: (_args[2] || "MAIN"), done: false}>>
  <<run $objectives.push(_obj)>>
<</widget>>

<<widget "completeObjective">>
  <<set _id to _args[0]>>
  <<set _newObjs to []>>
  <<for _i, _obj range $objectives>>
    <<if _obj.id is _id>>
      <<set _obj.done to true>>
      <<run $completedObjectives.push(_obj)>>
    <<else>>
      <<run _newObjs.push(_obj)>>
    <</if>>
  <</for>>
  <<set $objectives to _newObjs>>
<</widget>>

<<widget "clearObjectives">>
  <<set $objectives to []>>
<</widget>>

/* ===== STAT CHANGE WITH TOAST ===== */

<<widget "statChange">>
  /* Usage: <<statChange "statPRO" 2 "Prowess">> or <<statChange "stress" -5 "Stress">> */
  <<set _varName to _args[0]>>
  <<set _amount to _args[1]>>
  <<set _label to (_args[2] || _varName)>>
  <<set State.variables[_varName] to State.variables[_varName] + _amount>>
  /* Clamp resource stats */
  <<if _varName is "energy" or _varName is "stress" or _varName is "arousal">>
    <<set State.variables[_varName] to Math.max(0, Math.min(100, State.variables[_varName]))>>
  <</if>>
  <<run showStatToast((_amount > 0 ? '+' : '') + _amount + ' ' + _label, _amount < 0 && (_varName is 'energy' || _varName is 'gold'))>>
<</widget>>

/* ===== UPDATE MC PORTRAIT ===== */

<<widget "updatePortrait">>
  <<set $mcPortrait to getPortraitForState()>>
<</widget>>

/* ===== INVENTORY ===== */

<<widget "addItem">>
  <<run $inventory.push({id: _args[0], name: _args[1], desc: (_args[2] || "")})>>
<</widget>>

<<widget "hasItem">>
  <<set _result to false>>
  <<for _item range $inventory>>
    <<if _item.id is _args[0]>><<set _result to true>><</if>>
  <</for>>
<</widget>>

/* ===== DIALOGUE FORMATTER ===== */

<<widget "speak">>
  /* Usage: <<speak "ALDRIC">>Dialogue text here.<</speak>> */
  <div class="dialogue">
    <span class="speaker"><<print _args[0]>></span>
    _contents
  </div>
<</widget>>

/* ===== TIME DISPLAY HELPER ===== */

<<widget "advanceTime">>
  <<set $timeSlot to _args[0]>>
<</widget>>
```

---

## PART 6: TITLE SCREEN & PATH SELECTION

### title-screen.twee

```html
:: title-screen
<div class="title-screen">
  <div class="title-art">
    <h1 class="title-main">AELINDRA</h1>
    <p class="title-sub">The Rite of Becoming</p>
    <div class="title-ornament">⚜</div>
    <p class="title-tagline">"You have a choice," she says.<br>"Become my daughter   or watch everything I built burn."</p>
  </div>
  <div class="title-menu">
    [[Begin|path-select]]
    [[Load Game|title-load]]
    [[Credits|credits]]
  </div>
</div>
```

### path-select.twee

```html
:: path-select
<div class="path-select-screen">
  <h2>Choose Your Path</h2>
  <p class="path-intro">The Rite of Becoming will reshape Prince Edrin completely.<br>But the nature of the transformation is yours to decide.</p>

  <div class="path-cards">

    <div class="path-card" data-path="female">
      <h3>🌙 Full Female</h3>
      <p class="path-desc">Complete biological transformation. Edrin becomes entirely, irrevocably female   body, blood, bone. A princess in every sense the law demands.</p>
      <ul class="path-notes">
        <li>Complete female anatomy</li>
        <li>Traditional succession fulfilment</li>
        <li>Emotional arc: denial → acceptance → ownership</li>
      </ul>
      <<link "Choose this path">>
        <<set $gamePath to "female">>
        <<set $gameStarted to true>>
        <<addObjective "wake_up" "Wake up   it's morning in Crown's Rest" "MAIN">>
        <<goto "day-2_hub">>
      <</link>>
    </div>

    <div class="path-card" data-path="futa">
      <h3>⚔ Futanari</h3>
      <p class="path-desc">Female body with preserved male anatomy. Edrin becomes something unprecedented   neither fully one thing nor the other. A body the kingdom has no word for.</p>
      <ul class="path-notes">
        <li>Dual anatomy   both sets functional</li>
        <li>Heightened political resistance</li>
        <li>Emotional arc: concealment → espionage → bridge between</li>
      </ul>
      <<link "Choose this path">>
        <<set $gamePath to "futa">>
        <<set $gameStarted to true>>
        <<addObjective "wake_up" "Wake up   it's morning in Crown's Rest" "MAIN">>
        <<goto "day-2_hub">>
      <</link>>
    </div>

  </div>
</div>
```

**CSS for title/path screens:**

```css
/* --- TITLE SCREEN --- */
.title-screen {
  text-align: center;
  padding: 80px 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-main {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.25em;
  margin: 0;
  text-shadow: 0 0 40px rgba(201, 168, 76, 0.3);
}

.title-sub {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--text-dim);
  font-style: italic;
  letter-spacing: 0.15em;
  margin: 8px 0 20px;
}

.title-ornament {
  color: var(--gold-dim);
  font-size: 1.5rem;
  margin: 16px 0;
}

.title-tagline {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-dim);
  font-style: italic;
  line-height: 1.7;
  max-width: 420px;
}

.title-menu {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-menu a {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  color: var(--gold);
  text-decoration: none;
  padding: 12px 40px;
  border: 1px solid var(--gold-dim);
  border-radius: var(--border-radius);
  transition: all 0.25s ease;
}

.title-menu a:hover {
  background: rgba(201, 168, 76, 0.1);
  box-shadow: var(--shadow-glow-gold);
}

/* --- PATH SELECTION --- */
.path-select-screen {
  text-align: center;
  padding: 40px 20px;
}

.path-intro {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-dim);
  font-style: italic;
  max-width: 480px;
  margin: 0 auto 30px;
  line-height: 1.7;
}

.path-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.path-card {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: 8px;
  padding: 24px 20px;
  width: 300px;
  text-align: left;
  transition: all 0.25s ease;
}

.path-card:hover {
  border-color: var(--gold-dim);
  box-shadow: var(--shadow-glow-gold);
  transform: translateY(-2px);
}

.path-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--gold);
  margin: 0 0 10px;
  text-align: center;
}

.path-desc {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.path-notes {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.path-notes li {
  font-size: 0.85rem;
  color: var(--text-dim);
  padding: 3px 0 3px 14px;
  position: relative;
}

.path-notes li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: var(--gold-dim);
  font-size: 0.5rem;
  top: 7px;
}

.path-card a {
  display: block;
  text-align: center;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  padding: 10px;
  border: 1px solid var(--gold-dim);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.2s;
}

.path-card a:hover {
  background: rgba(201, 168, 76, 0.15);
}
```

---

## PART 7: PLACEHOLDER PORTRAIT SYSTEM

Until real art assets exist, generate placeholder portraits using CSS gradients. The portrait system should work with or without actual image files.

Add to `script.js`:

```javascript
/* --- PORTRAIT FALLBACK --- */
document.addEventListener('DOMContentLoaded', function () {
  var img = document.getElementById('mc-portrait-img');
  if (img) {
    img.addEventListener('error', function () {
      /* If image fails to load, show styled placeholder */
      this.style.display = 'none';
      var frame = document.getElementById('mc-portrait-border');
      if (frame) {
        frame.innerHTML = '<div class="portrait-placeholder">'
          + '<div class="placeholder-silhouette"></div>'
          + '<p class="placeholder-text">' + (State.variables.mcName || 'Edrin') + '</p>'
          + '</div>';
      }
    });
  }
});
```

Add to CSS:

```css
/* Portrait Placeholder (when no image available) */
.portrait-placeholder {
  width: 100%;
  min-height: 300px;
  background: linear-gradient(180deg, var(--purple-dim) 0%, var(--bg-deepest) 60%, var(--bg-secondary) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.placeholder-silhouette {
  width: 80px;
  height: 120px;
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid var(--gold-dim);
  border-radius: 40px 40px 20px 20px;
  margin-bottom: 12px;
}

.placeholder-text {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--gold-dim);
  letter-spacing: 0.1em;
}
```

---

## PART 8: IMPLEMENTATION ORDER

Execute these steps IN ORDER before adding any day content:

1. **Create the folder structure** per Part 1
2. **Create `StoryTitle.twee`** and **`StoryInit.twee`**   establish the game and all global variables
3. **Create `StoryInterface.twee`**   the three-panel layout with LEFT sidebar, CENTER passage, RIGHT portrait sidebar
4. **Create the master CSS file**   paste the entire stylesheet from Part 3, plus the title/path/placeholder CSS
5. **Create `script.js`**   paste the JavaScript from Part 4 (sidebar updaters, portrait manager, toast system)
6. **Create `widgets.twee`**   paste widget definitions from Part 5
7. **Create `title-screen.twee`** and **`path-select.twee`**   the game's entry points
8. **Create `PassageHeader.twee`**   the auto-updater hook
9. **Test**: Compile in Twine → title screen should render with medieval theme → path select should render two cards → selecting a path should init variables and land on Day -2 hub (which won't exist yet   that's OK, it confirms the pipeline works)
10. **THEN** add Day -2 content per the Day -2 Code Agent Prompt

---

## QUALITY CHECKLIST   INITIAL SETUP

- [ ] Three-panel layout renders: LEFT sidebar (260px) | CENTER passage | RIGHT sidebar (240px)
- [ ] Left sidebar shows: game title, day/time, energy/stress bars, stat list, objectives, gold, menu buttons
- [ ] Right sidebar shows: portrait frame with gold border and corner accents, MC name, MC title
- [ ] Portrait placeholder renders gracefully when no image file exists
- [ ] Body stats block is HIDDEN pre-transformation (`bodyStatusVisible = false`)
- [ ] Arousal bar is HIDDEN pre-transformation (Day 0 and earlier)
- [ ] Outfit block is HIDDEN until wardrobe unlocks
- [ ] Relationship block is HIDDEN until relationships form
- [ ] CSS uses Cinzel for headings, Cormorant Garamond for body text
- [ ] Color palette: deep purple-black backgrounds, gold accents, parchment text
- [ ] Location cards have hover states with gold glow
- [ ] Badges render: gold for MAIN, stone border for SIDE, purple border for DISCOVERED
- [ ] Stat toast notifications appear on stat changes and auto-dismiss
- [ ] Title screen renders centered with ornate typography
- [ ] Path selection shows two cards that correctly set `$gamePath`
- [ ] SugarCube default UI is fully hidden (`#ui-bar { display: none }`)
- [ ] Mobile responsive: right sidebar hides below 1100px, left sidebar unsticks below 800px
- [ ] All fonts load (Cinzel, Cormorant Garamond)   verify Google Fonts CDN or local fallbacks
- [ ] `PassageHeader` calls `updateSidebars()` on every passage render
- [ ] `<<speak>>` widget renders dialogue with gold speaker name and left border
