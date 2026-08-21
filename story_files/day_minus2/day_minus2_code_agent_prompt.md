# AELINDRA   Day -2 Code Agent Prompt
## Open-World Hub Integration | Objective-Driven Architecture
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day -2 ("The Summons") is the game's first playable day. The player experiences Edrin's last normal morning before the Rite of Becoming is revealed. This day establishes the open-world hub system, the objective/quest tracker, and the location-based exploration loop that will persist for all 120 days.

**CRITICAL ARCHITECTURE PRINCIPLE:** The player is NEVER railroaded from scene to scene. Instead:

1. Player wakes → sees **Objective Panel** with current goals
2. Player selects a **Location** from the available hub
3. Location may contain: a **Main Scene** (objective-gated), **Side Encounters** (discoverable), or **Ambient NPCs** (always present)
4. Scene plays → player returns to hub → selects next location
5. Time advances based on actions taken → some locations/NPCs become unavailable
6. Night = Palace Chambers only → Sleep → Day ends

The player DISCOVERS the story by going to places. They are not told "Scene 3 plays now." They see an objective ("Answer the Queen's summons") and choose to go to the Queen's Chambers. En route, they might detour to the kitchen, chat with a guard, or explore the library first. The story happens because the player went looking for it.

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day-2_core_content.md` | 6 main scenes (first-person prose, passage text) |
| `day-2_supplementary_npc.md` | 14 optional NPC encounters (discoverable interactions) |
| This file | Integration logic, hub structure, unlock conditions, passage mapping |

---

## GLOBAL VARIABLES   INITIALIZE ON DAY -2

```javascript
// ===== DAY -2 INIT   Place in StoryInit or day-2 boot passage =====

// --- Time System ---
<<set $timeSlot to "MORNING">>        // MORNING, MIDDAY, AFTERNOON, EVENING, NIGHT
<<set $dayNumber to -2>>
<<set $dayLabel to "The Summons">>

// --- Primary Stats ---
<<set $statPRO to 0>>    // Prowess
<<set $statWIS to 0>>    // Wisdom
<<set $statAUT to 0>>    // Authority
<<set $statGRA to 0>>    // Grace
<<set $statALL to 0>>    // Allure
<<set $statRES to 0>>    // Resolve

// --- Resource Stats ---
<<set $energy to 100>>
<<set $stress to 30>>
<<set $arousal to 0>>
<<set $gold to 500>>     // Palace treasury   high starting value

// --- Hidden Stats ---
<<set $corruption to 0>>
<<set $devotion to 0>>
<<set $dominance to 0>>
<<set $submission to 0>>
<<set $loreSuc to 0>>       // Succession lore
<<set $libraryLore to false>>

// --- Affinity Trackers ---
<<set $affAldric to 0>>
<<set $affRowan to 0>>
<<set $affRosalind to 0>>
<<set $affKael to 0>>
<<set $affLyra to 0>>
<<set $affSeraphina to 0>>

// --- Reputation ---
<<set $repStaff to 0>>
<<set $repMilitary to 0>>
<<set $repCourt to 0>>
<<set $repSilverveil to 0>>
<<set $repCommon to 0>>

// --- Day -2 Scene Flags ---
<<set $d2_woke to false>>
<<set $d2_sparred to false>>
<<set $d2_queen to false>>
<<set $d2_library to false>>
<<set $d2_gardens to false>>
<<set $d2_night to false>>

// --- Day -2 NPC Flags ---
<<set $d2_npc_brin to false>>
<<set $d2_npc_letter to false>>
<<set $d2_npc_maids to false>>
<<set $d2_npc_caedric to false>>
<<set $d2_npc_marta to false>>
<<set $d2_npc_joss to false>>
<<set $d2_npc_keller to false>>
<<set $d2_npc_tamsin to false>>
<<set $d2_npc_elise to false>>
<<set $d2_npc_vaelin to false>>
<<set $d2_npc_wynn to false>>
<<set $d2_npc_harwick to false>>
<<set $d2_npc_alva to false>>
<<set $d2_npc_perrin to false>>

// --- Objective Tracker ---
<<set $objectives to []>>
<<set $completedObjectives to []>>
<<set $sideObjectives to []>>
```

---

## TIME SYSTEM   DAY -2 SCHEDULE

The day is divided into 5 time slots. Each main scene advances the clock. Side encounters do NOT advance the clock (they're ambient   the player can do as many as are available in the current slot without penalty). Transitioning to the next main objective advances the slot.

```
MORNING    → Wake, Training Yard, Kitchen access
MIDDAY     → Queen's Chambers (triggered by objective)
AFTERNOON  → Grand Library, Servant Quarters access
EVENING    → Royal Gardens, Rowan arrival
NIGHT      → Edrin's Chambers (sleep / final encounters)
```

**Time Advancement Rules for Day -2:**
| Action | Advances Time To |
|---|---|
| Complete Wake scene (`d2_woke = true`) | Stay MORNING |
| Complete Sparring (`d2_sparred = true`) | MIDDAY |
| Complete Queen scene (`d2_queen = true`) | AFTERNOON |
| Complete Library (`d2_library = true`) | EVENING |
| Complete Gardens (`d2_gardens = true`) | NIGHT |
| Sleep | END DAY -2 → Begin Day -1 |

---

## OBJECTIVE PANEL SYSTEM

The Objective Panel is a persistent UI element (sidebar or overlay) that shows the player their current goals. Objectives are divided into:

- **MAIN** (gold icon)   story-critical, advances the day
- **SIDE** (silver icon)   optional, enriches the world
- **DISCOVERED** (bronze icon)   revealed by exploration or NPC conversation

### Day -2 Objective Flow

```
[MORNING   On Wake]
  MAIN: "Report to the Training Yard   morning sparring with Captain Vane"
  SIDE: "Examine your chambers" (triggers letter interaction, Brin)
  SIDE: "Visit the Kitchens   breakfast is better hot"

[AFTER SPARRING]
  MAIN: "Answer the Queen's summons   Queen's Chambers, East Wing"
  SIDE: "Explore the corridors" (triggers maids, Caedric)
  SIDE: "Return to Training Yard" (triggers Keller, Tamsin)
  SIDE: "Visit the Kitchens" (if not done   Marta, Joss)

[AFTER QUEEN SCENE]
  MAIN: "Seek answers   the Grand Library holds records of the Rite"
  SIDE: "Explore the servant quarters   Below Stairs"
  SIDE: "Walk the corridors" (Caedric if not seen)

[AFTER LIBRARY]
  MAIN: "The Royal Gardens   someone is playing music"
  SIDE: "Speak with the gardener" (Wynn)
  SIDE: "Take the courtyard path" (Harwick)
  DISCOVERED: "Restricted section   Elise mentioned additional sources" (if Elise encountered)

[AFTER GARDENS/ROWAN]
  MAIN: "Return to your chambers   it's late"
  SIDE: "Speak with the night guard" (Perrin)

[NIGHT   CHAMBERS]
  MAIN: "Sleep" → End Day
```

### Objective Panel   SugarCube Implementation

```html
<!-- Place in StoryCaption or a sidebar widget -->
<div id="objective-panel" class="obj-panel">
  <h3 class="obj-header">⚔ Objectives</h3>
  <div id="obj-main" class="obj-section">
    <h4>📜 Main Quest</h4>
    <ul id="obj-main-list"></ul>
  </div>
  <div id="obj-side" class="obj-section">
    <h4>🗡 Side Quests</h4>
    <ul id="obj-side-list"></ul>
  </div>
</div>
```

```javascript
// Macro to add/complete objectives
<<widget "addObjective">>
  <<set _obj to {id: _args[0], text: _args[1], type: _args[2] || "MAIN", done: false}>>
  <<set $objectives.push(_obj)>>
<</widget>>

<<widget "completeObjective">>
  <<set _id to _args[0]>>
  <<for _i, _obj range $objectives>>
    <<if _obj.id is _id>>
      <<set _obj.done to true>>
      <<set $completedObjectives.push(_obj)>>
    <</if>>
  <</for>>
  <<set $objectives to $objectives.filter(function(o) { return !o.done; })>>
<</widget>>
```

---

## LOCATION HUB   DAY -2

The hub is a passage that renders available locations as interactive cards. Each card shows:
- Location name + icon
- Brief flavour text
- Available interactions (icons or badges for NPCs present)
- Lock/unlock status

### Hub Passage: `day-2_hub`

```html
:: day-2_hub
<<set _slot to $timeSlot>>

<div class="hub-header">
  <h2>Crown's Rest   Day -2: The Summons</h2>
  <p class="time-display">Time: <<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>></p>
</div>

/* --- RENDER OBJECTIVE PANEL --- */
<<include "objectivePanel">>

<div class="location-grid">

/* ========== EDRIN'S CHAMBERS ========== */
<div class="loc-card" @class="'loc-card' + ($d2_woke ? ' visited' : '')">
  <h3>🛏 Edrin's Chambers</h3>
  <p class="loc-flavor">Your stone-walled bedchamber. Austere. Familiar.</p>
  <<if not $d2_woke>>
    <span class="badge main">⚔ Wake Up</span>
    [[Enter → |day-2_wake]]
  <<elseif $timeSlot is "NIGHT" and not $d2_night>>
    <span class="badge main">⚔ Sleep</span>
    [[Enter → |day-2_night]]
  <<else>>
    /* Side interactions available in chambers */
    <<if not $d2_npc_letter and $d2_woke>>
      <span class="badge side">📜 Examine desk</span>
    <</if>>
    [[Enter → |day-2_chambers_explore]]
  <</if>>
</div>

/* ========== TRAINING YARD ========== */
<<if $d2_woke>>
<div class="loc-card" @class="'loc-card' + ($d2_sparred ? ' visited' : '')">
  <h3>⚔ Training Yard</h3>
  <p class="loc-flavor">Practice blades and chalk-dusted flagstones. Aldric waits.</p>
  <<if not $d2_sparred>>
    <span class="badge main">⚔ Spar with Captain Vane</span>
  <</if>>
  <<if $d2_sparred and not $d2_npc_keller>>
    <span class="badge side">🗡 Guardsman at the bench</span>
  <</if>>
  <<if $d2_sparred and not $d2_npc_tamsin>>
    <span class="badge side">🗡 Recruit at the dummies</span>
  <</if>>
  [[Enter → |day-2_training_hub]]
</div>
<</if>>

/* ========== QUEEN'S CHAMBERS ========== */
<<if $d2_sparred and not $d2_queen>>
<div class="loc-card">
  <h3>👑 Queen's Chambers   East Wing</h3>
  <p class="loc-flavor">The oak door with the royal crest. More guards than usual.</p>
  <span class="badge main">⚔ Answer the summons</span>
  [[Enter → |day-2_queen]]
</div>
<</if>>

/* ========== PALACE CORRIDORS ========== */
<<if $d2_woke>>
<div class="loc-card">
  <h3>🏛 Palace Corridors</h3>
  <p class="loc-flavor">Stone hallways connecting the palace wings. Portraits of queens line the walls.</p>
  <<if not $d2_npc_maids>>
    <span class="badge side">🗡 Voices near the tapestry</span>
  <</if>>
  <<if not $d2_npc_caedric>>
    <span class="badge side">🗡 Someone sitting in the alcove</span>
  <</if>>
  [[Explore → |day-2_corridors]]
</div>
<</if>>

/* ========== KITCHENS ========== */
<<if $d2_woke>>
<div class="loc-card">
  <h3>🍞 Palace Kitchens</h3>
  <p class="loc-flavor">Heat, steam, and the smell of fresh bread. Marta's domain.</p>
  <<if not $d2_npc_marta>>
    <span class="badge side">🗡 The Head Cook</span>
  <</if>>
  <<if $d2_npc_marta and not $d2_npc_joss>>
    <span class="badge side">🗡 The scullion has gossip</span>
  <</if>>
  [[Enter → |day-2_kitchen]]
</div>
<</if>>

/* ========== GRAND LIBRARY ========== */
<<if $d2_queen>>
<div class="loc-card" @class="'loc-card' + ($d2_library ? ' visited' : '')">
  <h3>📚 Grand Library</h3>
  <p class="loc-flavor">Three stories of knowledge. Painted constellations on the ceiling. Answers, maybe.</p>
  <<if not $d2_library>>
    <span class="badge main">⚔ Research the Rite of Becoming</span>
  <</if>>
  <<if $d2_library and not $d2_npc_elise>>
    <span class="badge side">🗡 A librarian in the stacks</span>
  <</if>>
  <<if $d2_library and not $d2_npc_vaelin>>
    <span class="badge side">🗡 A scholar on the floor</span>
  <</if>>
  [[Enter → |day-2_library_hub]]
</div>
<</if>>

/* ========== SERVANT QUARTERS ========== */
<<if $d2_queen>>
<div class="loc-card">
  <h3>🔑 Servant Quarters   Below Stairs</h3>
  <p class="loc-flavor">The machinery of royal life. Clean corridors, honest work.</p>
  <<if not $d2_npc_alva>>
    <span class="badge side">🗡 The Head Housekeeper</span>
  <</if>>
  [[Enter → |day-2_servants]]
</div>
<</if>>

/* ========== ROYAL GARDENS ========== */
<<if $d2_library>>
<div class="loc-card" @class="'loc-card' + ($d2_gardens ? ' visited' : '')">
  <h3>🌿 Royal Gardens</h3>
  <p class="loc-flavor">Stone paths, night-blooming jasmine, a silver stag fountain. Someone is playing a lute.</p>
  <<if not $d2_gardens>>
    <span class="badge main">⚔ Follow the music</span>
  <</if>>
  <<if not $d2_npc_wynn>>
    <span class="badge side">🗡 The old gardener</span>
  <</if>>
  <<if not $d2_npc_harwick>>
    <span class="badge side">🗡 A perfumed ambush</span>
  <</if>>
  [[Enter → |day-2_gardens_hub]]
</div>
<</if>>

</div> /* end location-grid */
```

---

## PASSAGE ROUTING   LOCATION SUB-HUBS

Each location has its own sub-hub that displays available interactions within that location. This prevents direct scene-chaining while keeping the player oriented.

### Training Yard Sub-Hub

```html
:: day-2_training_hub
<h2>⚔ Training Yard</h2>
<p>Chalk-dusted flagstones. Practice blades on the rack. Morning light.</p>

<<if not $d2_sparred>>
  /* Main scene */
  <div class="interaction-card main">
    <h4>🗡 Captain Aldric Vane</h4>
    <p>He's running a whetstone along his practice blade. Waiting for you.</p>
    [[Spar with Aldric|day-2_training]]
  </div>
<</if>>

<<if $d2_sparred>>
  <<if not $d2_npc_keller>>
  <div class="interaction-card side">
    <h4>🛡 Guardsman at the Bench</h4>
    <p>A weathered soldier sharpening his sword. He looks like he wants to talk.</p>
    [[Approach|day-2_npc_keller]]
  </div>
  <</if>>

  <<if not $d2_npc_tamsin>>
  <div class="interaction-card side">
    <h4>🗡 Recruit at the Training Dummies</h4>
    <p>A young woman beating a dummy with questionable technique but admirable fury.</p>
    [[Watch / Intervene|day-2_npc_tamsin]]
  </div>
  <</if>>

  <<if $d2_npc_keller and $d2_npc_tamsin>>
    <p class="empty-note">The yard is quiet now. Nothing else demands your attention here.</p>
  <</if>>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Library Sub-Hub

```html
:: day-2_library_hub
<h2>📚 Grand Library</h2>
<p>Three stories of books. Dust motes in slanted light. Haeth watches from his desk.</p>

<<if not $d2_library>>
  <div class="interaction-card main">
    <h4>📖 Eastern Alcove   The Rite of Becoming</h4>
    <p>Haeth directed you here. Three sources on the top shelf.</p>
    [[Research|day-2_library]]
  </div>
<</if>>

<<if $d2_library>>
  <<if not $d2_npc_elise>>
  <div class="interaction-card side">
    <h4>📜 A Voice Between the Shelves</h4>
    <p>Someone is sorting books nearby. Ink-stained fingers, sliding spectacles.</p>
    [[Investigate|day-2_npc_elise]]
  </div>
  <</if>>

  <<if not $d2_npc_vaelin>>
  <div class="interaction-card side">
    <h4>📿 Scholar on the Floor</h4>
    <p>A young man in temple robes, surrounded by a fortress of open books, muttering about divine mandate.</p>
    [[Approach|day-2_npc_vaelin]]
  </div>
  <</if>>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Gardens Sub-Hub

```html
:: day-2_gardens_hub
<h2>🌿 Royal Gardens</h2>
<p>Dusk. Jasmine and woodsmoke. The fountain splashes softly.</p>

<<if not $d2_npc_wynn>>
<div class="interaction-card side">
  <h4>🌹 The Old Gardener</h4>
  <p>A bent figure pruning winter roses with metronomic precision.</p>
  [[Approach|day-2_npc_wynn]]
</div>
<</if>>

<<if not $d2_npc_harwick>>
<div class="interaction-card side">
  <h4>💎 Movement Behind the Topiary</h4>
  <p>A rustle of silk. A wave of perfume. Someone is lying in wait.</p>
  [[Investigate|day-2_npc_harwick]]
</div>
<</if>>

<<if not $d2_gardens>>
<div class="interaction-card main">
  <h4>🎵 The Stone Bench   Lute Music</h4>
  <p>Someone familiar is playing. The melody wanders, finds something beautiful.</p>
  [[Follow the music|day-2_gardens]]
</div>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Kitchen Sub-Hub

```html
:: day-2_kitchen
<h2>🍞 Palace Kitchens</h2>
<p>Heat, steam, chaos. Three hearths blazing. The smell of fresh bread and rosemary.</p>

<<if not $d2_npc_marta>>
<div class="interaction-card side">
  <h4>👩‍🍳 Head Cook Marta</h4>
  <p>She spots you immediately. There's a stool, a plate, and a look that says sitting is mandatory.</p>
  [[Sit|day-2_npc_marta]]
</div>
<</if>>

<<if $d2_npc_marta and not $d2_npc_joss>>
<div class="interaction-card side">
  <h4>🧹 The Scullion</h4>
  <p>A soot-covered boy appears at your elbow. He has news.</p>
  [[Listen|day-2_npc_joss]]
</div>
<</if>>

<<if $d2_npc_marta and $d2_npc_joss>>
  <p class="empty-note">The kitchen hums on. Marta is back to commanding her domain. No one else needs your attention.</p>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Corridors Sub-Hub

```html
:: day-2_corridors
<h2>🏛 Palace Corridors</h2>
<p>Long stone hallways. Portraits of queens. Echoing footsteps.</p>

<<if not $d2_npc_maids>>
<div class="interaction-card side">
  <h4>🤫 Whispering Near the Tapestry</h4>
  <p>Two handmaidens pressed against the wall, speaking in urgent tones.</p>
  [[Pass by|day-2_npc_maids]]
</div>
<</if>>

<<if not $d2_npc_caedric>>
<div class="interaction-card side">
  <h4>🪑 The Alcove by the Portrait Gallery</h4>
  <p>An old knight on a worn bench. He's been sitting there since before you were born.</p>
  [[Sit with him|day-2_npc_caedric]]
</div>
<</if>>

<<if $d2_npc_maids and $d2_npc_caedric>>
  <p class="empty-note">The corridors are quiet. Just portraits and stone and the echoes of your boots.</p>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Servant Quarters Sub-Hub

```html
:: day-2_servants
<h2>🔑 Servant Quarters   Below Stairs</h2>
<p>Clean corridors beneath the palace. The machinery of royal life.</p>

<<if not $d2_npc_alva>>
<div class="interaction-card side">
  <h4>🗝 Mistress Alva</h4>
  <p>The Head Housekeeper. Iron-grey hair, ramrod posture. She doesn't curtsy. She never curtsies.</p>
  [[Speak with her|day-2_npc_alva]]
</div>
<</if>>

<<if $d2_npc_alva>>
  <p class="empty-note">The servants go about their work. You're not supposed to be here, and lingering would make them uncomfortable.</p>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

### Chambers Explore (post-wake)

```html
:: day-2_chambers_explore
<h2>🛏 Edrin's Chambers</h2>
<p>Your room. Bookshelves, maps, the training sword on the wall.</p>

<<if not $d2_npc_letter>>
<div class="interaction-card side">
  <h4>📜 The Half-Written Letter</h4>
  <p>Three weeks old. The ink has dried in the nib.</p>
  [[Read it|day-2_npc_letter]]
</div>
<</if>>

<<if not $d2_npc_brin and $timeSlot is "MORNING">>
<div class="interaction-card side">
  <h4>🧑 The Lingering Servant</h4>
  <p>The boy who brought breakfast is hovering near the door. New hire, clearly.</p>
  [[Speak with him|day-2_npc_brin]]
</div>
<</if>>

<div class="interaction-card">
  <h4>🪞 The Mirror</h4>
  <p>Polished silver in a dark wood frame.</p>
  <<if $timeSlot is "NIGHT">>
    [[Stand before it|day-2_night]]
  <<else>>
    <p class="flavor-dim">A quick glance. Dark hair, grey-blue eyes, sharp jaw. You don't linger   not yet.</p>
  <</if>>
</div>

<div class="nav-return">
  [[← Return to Palace Hub|day-2_hub]]
</div>
```

---

## SCENE END HANDLERS   STAT APPLICATION & ROUTING

Each main scene passage must end with stat changes and a return to hub. Example:

```html
:: day-2_training [nobr]
/* === FULL PROSE FROM CORE CONTENT FILE   SCENE 2 === */
/* ... paste first-person prose here ... */

/* --- STAT CHANGES --- */
<<set $statPRO += 1>>
<<set $stress += 5>>
<<set $d2_sparred to true>>
<<set $affAldric += 2>>

/* --- ADVANCE TIME --- */
<<set $timeSlot to "MIDDAY">>

/* --- UPDATE OBJECTIVES --- */
<<completeObjective "train_aldric">>
<<addObjective "queen_summons" "Answer the Queen's summons   Queen's Chambers, East Wing" "MAIN">>
<<addObjective "explore_corridors" "Explore the corridors" "SIDE">>
<<addObjective "visit_kitchen" "Visit the Kitchens" "SIDE">>

/* --- RETURN LINK --- */
<div class="scene-end">
  [[Continue → |day-2_hub]]
</div>
```

**Apply this pattern to ALL scene passages.** Each NPC encounter passage must similarly:
1. Set its flag to `true`
2. Apply stat changes per supplementary file
3. Return to the parent sub-hub (NOT the main hub   keep player in the location)

Example for an NPC:

```html
:: day-2_npc_marta [nobr]
/* === FULL PROSE FROM SUPPLEMENTARY NPC FILE === */
/* ... paste first-person prose here ... */

<<set $d2_npc_marta to true>>
<<set $energy += 10>>
<<set $stress -= 5>>
<<set $repStaff += 1>>

<div class="scene-end">
  [[Continue → |day-2_kitchen]]  /* Return to kitchen sub-hub, NOT main hub */
</div>
```

---

## CSS THEMING   DARK FANTASY HUB

```css
/* === AELINDRA HUB THEME === */

:root {
  --bg-primary: #1a1118;        /* Deep purple-black */
  --bg-card: #231a20;           /* Card background */
  --bg-card-hover: #2e2228;     /* Card hover */
  --text-primary: #d4c5a9;      /* Parchment gold */
  --text-dim: #8a7e6b;          /* Muted parchment */
  --accent-gold: #c9a84c;       /* Royal gold */
  --accent-red: #8b2d2d;        /* Blood red */
  --accent-purple: #5c3d6e;     /* Silverveil purple */
  --border-stone: #3a2e35;      /* Stone grey-purple */
  --font-heading: 'Cinzel', serif;
  --font-body: 'Cormorant Garamond', serif;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1.1em;
  line-height: 1.7;
}

h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--accent-gold);
}

/* --- LOCATION GRID --- */
.location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.loc-card {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.loc-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent-gold);
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.15);
}

.loc-card.visited {
  opacity: 0.7;
  border-left: 3px solid var(--accent-gold);
}

.loc-flavor {
  color: var(--text-dim);
  font-style: italic;
  font-size: 0.95em;
  margin: 8px 0;
}

/* --- BADGES --- */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 0.75em;
  letter-spacing: 0.05em;
  margin: 4px 4px 4px 0;
}

.badge.main {
  background: var(--accent-gold);
  color: var(--bg-primary);
}

.badge.side {
  background: var(--border-stone);
  color: var(--text-primary);
  border: 1px solid var(--text-dim);
}

/* --- INTERACTION CARDS (sub-hub) --- */
.interaction-card {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: 6px;
  padding: 14px;
  margin: 10px 0;
  transition: border-color 0.2s;
}

.interaction-card:hover {
  border-color: var(--accent-gold);
}

.interaction-card.main {
  border-left: 3px solid var(--accent-gold);
}

.interaction-card.side {
  border-left: 3px solid var(--text-dim);
}

/* --- OBJECTIVE PANEL --- */
.obj-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 16px;
}

.obj-header {
  font-family: var(--font-heading);
  color: var(--accent-gold);
  margin: 0 0 10px;
}

/* --- SCENE END --- */
.scene-end {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-stone);
  text-align: center;
}

.scene-end a {
  font-family: var(--font-heading);
  color: var(--accent-gold);
  text-decoration: none;
  padding: 8px 20px;
  border: 1px solid var(--accent-gold);
  border-radius: 4px;
}

.empty-note {
  color: var(--text-dim);
  font-style: italic;
  text-align: center;
  padding: 12px;
}

.nav-return {
  margin-top: 20px;
  text-align: center;
}

.nav-return a {
  color: var(--text-dim);
  font-size: 0.9em;
}

/* --- STAT DISPLAY --- */
.time-display, .energy-display {
  font-family: var(--font-heading);
  font-size: 0.85em;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}
```

---

## FONT LOADING

```html
<!-- Add to Story stylesheet or StoryInterface -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

---

## DAY -2 NEWLY AVAILABLE LOCATIONS

Day -2 is the first day. ALL palace locations listed below unlock progressively:

| Location | Available From | Unlock Condition |
|---|---|---|
| Edrin's Chambers | Game start | Always available |
| Training Yard | After waking (`d2_woke`) | Auto-unlock with first objective |
| Queen's Chambers | After sparring (`d2_sparred`) | Objective-gated   only appears when main quest points there |
| Palace Corridors | After waking | Always available once awake |
| Palace Kitchens | After waking | Always available once awake |
| Grand Library | After Queen scene (`d2_queen`) | Objective-gated |
| Servant Quarters | After Queen scene | Side objective   player must choose to explore |
| Royal Gardens | After Library (`d2_library`) | Objective-gated (music cue) |

**NOT YET AVAILABLE on Day -2:**
- Moonspire Tower (unlocks Day 0)
- Capital City / Aethermere Proper (unlocks Day 4+)
- The Greenwood (unlocks Day 15+)
- Ashborne Estate (unlocks Day 26+)
- Tournament Grounds (unlocks Day 36+)
- Port Auriel (unlocks Day 50+)

---

## NEW NPC REGISTRY   DAY -2

All NPCs introduced on Day -2 and their persistence:

| NPC | Location | Type | Persists? |
|---|---|---|---|
| **Sir Aldric Vane** | Training Yard | Main cast   Romance route | Yes   all 120 days |
| **Queen Seraphina** | Queen's Chambers | Main cast   Mentor | Yes   until death/salvation |
| **Librarian Haeth** | Grand Library | Recurring | Yes   library scenes |
| **Rowan Ashwood** | Royal Gardens → Guest Wing | Main cast   Romance route | Yes   all 120 days |
| Servant Brin | Edrin's Chambers | Recurring minor | Yes   becomes regular servant |
| Gossiping Maids | Corridors | Ambient | Rotate   different maids each day |
| Ser Caedric | Corridors (alcove) | Recurring minor | Yes   bench fixture, wisdom dispenser |
| Head Cook Marta | Kitchens | Recurring minor | Yes   kitchen scenes |
| Scullion Joss | Kitchens | Recurring minor | Yes   gossip source |
| Guardsman Keller | Training Yard | Recurring minor | Yes   guard intelligence |
| Recruit Tamsin | Training Yard | Recurring minor | Yes   training progression arc |
| Junior Librarian Elise | Grand Library | Recurring minor | Yes   restricted section access |
| Brother Vaelin | Grand Library | Recurring minor | Yes   theology subplot |
| Old Wynn | Royal Gardens | Recurring minor | Yes   garden wisdom |
| Lady Harwick | Gardens / Court | Recurring minor | Yes   court intelligence |
| Mistress Alva | Servant Quarters | Recurring minor | Yes   household intelligence |
| Night Guard Perrin | Edrin's Chambers (night) | Recurring minor | Yes   night conversations |

---

## QUALITY CHECKLIST   DAY -2

Before finalising Day -2 build, verify:

- [ ] **Hub renders all locations with correct unlock conditions**
- [ ] **No scene auto-chains to another scene**   every scene returns to a sub-hub or main hub
- [ ] **Time advances ONLY on main scene completion**, not on side encounters
- [ ] **Objective panel updates after each main scene**
- [ ] **All 6 core scenes use prose from `day-2_core_content.md`**
- [ ] **All 14 NPC encounters use prose from `day-2_supplementary_npc.md`**
- [ ] **Every passage sets its flag to true on completion**
- [ ] **Stats applied correctly per both content files**
- [ ] **All NPC encounters return to their parent sub-hub, not the main hub**
- [ ] **Night passage only available after Gardens/Rowan scene**
- [ ] **Sleep ends the day and transitions to Day -1 init**
- [ ] **CSS theme applied   dark fantasy palette, Cinzel/Cormorant fonts**
- [ ] **Badges display correctly   gold for main, silver for side**
- [ ] **Visited locations show visual distinction (opacity/border)**
- [ ] **Empty-state messages display when all interactions in a location are complete**
- [ ] **Image prompts from both content files logged for art pipeline**

---

## TRANSITION TO DAY -1

When the player selects "Sleep" in the Night chambers passage:

```html
:: day-2_sleep_transition
<<set $dayNumber to -1>>
<<set $dayLabel to "The Argument">>
<<set $timeSlot to "MORNING">>
<<set $energy to 80>>  /* Poor sleep   didn't rest well */
<<set $stress += 5>>   /* Overnight anxiety */

/* Reset daily NPC availability flags for Day -1 */
/* (Day -1 has its own flag set   don't reuse Day -2 flags) */

<div class="day-transition">
  <h2>Night passes. You don't sleep until the hour before dawn.</h2>
  <p>And in that single hour, you dream of water   a deep, warm pool, and you're sinking into it, and it's closing over your head, and you can't tell if you're drowning or being born.</p>
  [[Dawn breaks. → |day-1_hub]]
</div>
```

---

## FILE STRUCTURE   DAY -2 DELIVERABLES

```
AELINDRA/
├── story_bible/
│   └── days_-2_to_10_female.md          (existing)
├── production/
│   └── day_minus_2/
│       ├── day-2_core_content.md         ← THIS FILE (scenes 1-6, 7-9K words)
│       ├── day-2_supplementary_npc.md    ← NPC FILE (14 encounters, 7-8K words)
│       ├── day-2_code_agent_prompt.md    ← THIS FILE (integration logic)
│       └── day-2_image_prompts.md        ← (extracted from both content files)
├── engine/
│   ├── css/
│   │   └── aelindra-theme.css            ← Hub theme CSS
│   ├── js/
│   │   └── objective-system.js           ← Objective widget macros
│   └── passages/
│       ├── StoryInit.tw                  ← Global variable init
│       ├── StoryCaption.tw              ← Sidebar with stats + objectives
│       ├── day-2_hub.tw                 ← Main hub passage
│       ├── day-2_wake.tw                ← Scene 1
│       ├── day-2_training_hub.tw        ← Training Yard sub-hub
│       ├── day-2_training.tw            ← Scene 2 (Aldric spar)
│       ├── day-2_queen.tw              ← Scene 3
│       ├── day-2_library_hub.tw         ← Library sub-hub
│       ├── day-2_library.tw             ← Scene 4
│       ├── day-2_gardens_hub.tw         ← Gardens sub-hub
│       ├── day-2_gardens.tw             ← Scene 5 (Rowan)
│       ├── day-2_chambers_explore.tw     ← Chambers exploration
│       ├── day-2_night.tw               ← Scene 6
│       ├── day-2_corridors.tw           ← Corridors sub-hub
│       ├── day-2_kitchen.tw             ← Kitchen sub-hub
│       ├── day-2_servants.tw            ← Servant Quarters sub-hub
│       ├── day-2_sleep_transition.tw     ← Day end → Day -1
│       └── npc/
│           ├── day-2_npc_brin.tw
│           ├── day-2_npc_letter.tw
│           ├── day-2_npc_maids.tw
│           ├── day-2_npc_caedric.tw
│           ├── day-2_npc_marta.tw
│           ├── day-2_npc_joss.tw
│           ├── day-2_npc_keller.tw
│           ├── day-2_npc_tamsin.tw
│           ├── day-2_npc_elise.tw
│           ├── day-2_npc_vaelin.tw
│           ├── day-2_npc_wynn.tw
│           ├── day-2_npc_harwick.tw
│           ├── day-2_npc_alva.tw
│           └── day-2_npc_perrin.tw
```

---

## IMPLEMENTATION ORDER

1. **Set up `StoryInit`**   all global variables from the init block above
2. **Build CSS theme**   paste the CSS block into the Story Stylesheet
3. **Build the main hub passage** (`day-2_hub`)   the player's home base
4. **Build sub-hub passages**   one per location (Training, Library, Gardens, Kitchen, Corridors, Servants, Chambers)
5. **Paste core content prose** into the 6 main scene passages
6. **Paste NPC prose** into the 14 NPC passages
7. **Wire stat changes and flags** at the end of each passage
8. **Wire objective updates** after each main scene
9. **Build the day-end transition** passage
10. **Test the full loop**: Wake → Hub → Location → Scene → Hub → ... → Sleep → Day -1

---
