# AELINDRA — Day 2 Code Agent Prompt (FEMALE ROUTE)
## Palace Reopens | Expanded Hub Architecture
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day 2 ("The Body Speaks") is the TRANSITION day — Aelindra leaves the Moonspire Tower and returns to the palace. The hub architecture EXPANDS from Day 1's single-room layout back to the multi-location grid used in the prologue. But everything is different — the same locations experienced in a new body.

**KEY ARCHITECTURAL CHANGE:** Day 1 used a room-layout (`.room-layout`). Day 2 returns to the location-grid (`.location-grid`). The CSS switch signals the world opening up.

**MORNING:** Moonspire Tower (last tower interaction, Ilara exam)
**MIDDAY:** Bridge crossing → Palace Corridors gauntlet (semi-linear — the walk IS the scene)
**AFTERNOON:** Chambers (wardrobe confrontation, Maren, clothing) → Gardens (cry scene, Aldric)
**EVENING:** Bath, chamber exploration, visitors
**NIGHT:** Bed, sleep

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day2_core_content_female.md` | 8 main scenes |
| `day2_supplementary_npc_female.md` | 9 optional encounters |
| This file | Integration logic, expanded hub, location grid return |

---

## NEW VARIABLES — DAY 2

```javascript
// ===== DAY 2 INIT — Set in Day 1 sleep transition =====

<<set $dayNumber to 2>>
<<set $dayLabel to "The Body Speaks">>
<<set $timeSlot to "MORNING">>
<<set $energy to 70>>

// --- Body Update ---
<<set $mcBust to "B cup">>
<<set $mcBreastSize to "B">>
// Portrait stays aelindra_day1 until Day 3

// --- Scene Flags ---
<<set $d2f_wake to true>>
<<set $d2f_bridge to false>>
<<set $d2f_gauntlet to false>>
<<set $d2f_chambers to false>>       // Wardrobe confrontation + Maren clothing
<<set $d2f_gardens to false>>        // Cry scene
<<set $d2f_aldric to false>>         // Garden encounter
<<set $d2f_bath to false>>           // Bath scene
<<set $d2f_bath_explored to false>>  // Player chose to explore in bath
<<set $d2f_night to false>>

// --- NPC Flags ---
<<set $d2f_npc_nara_farewell to false>>
<<set $d2f_npc_pageboy to false>>
<<set $d2f_npc_harwick to false>>
<<set $d2f_npc_caedric to false>>
<<set $d2f_npc_marta to false>>
<<set $d2f_npc_maren to false>>
<<set $d2f_npc_queen_note to false>>
<<set $d2f_npc_perrin to false>>
<<set $d2f_npc_wynn to false>>

// --- New NPC ---
<<set $marenFamiliarity to 0>>

// --- Elder Council Presentation ---
<<set $councilPresentationDay to 7>>
<<set $councilPresentationKnown to false>>

// --- New Items ---
<<set $hasResonanceCrystal to false>>
```

---

## TIME SYSTEM — DAY 2

```
MORNING    → Tower (exam, Nara farewell), Bridge crossing
MIDDAY     → Gauntlet (corridor walk — semi-linear), Chambers (wardrobe)
AFTERNOON  → Gardens (cry + Aldric), Kitchens, Corridors (Harwick, Caedric)
EVENING    → Bath, Maren conversation, Queen's note, Perrin
NIGHT      → Bed, Sleep
```

| Action | Advances Time |
|---|---|
| Cross bridge (`d2f_bridge`) | MIDDAY |
| Complete chambers/wardrobe (`d2f_chambers`) | AFTERNOON |
| Complete gardens (`d2f_gardens`) | EVENING |
| Complete bath (`d2f_bath`) | NIGHT |
| Sleep | END DAY 2 → Day 3 |

---

## LOCATION HUB — DAY 2

```html
:: day2_hub

<div class="hub-header">
  <h2><<if $timeSlot is "MORNING">>Moonspire Tower<<else>>Crown's Rest<</if>> — Day 2: The Body Speaks</h2>
  <p class="time-display"><<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>></p>
</div>

<<include "objectivePanel">>

<div class="location-grid">

/* ===== MORNING: TOWER & BRIDGE ===== */

<<if $timeSlot is "MORNING">>

  /* TOWER — Last morning */
  <div class="loc-card">
    <h3>🌙 Moonspire Tower</h3>
    <p class="loc-flavor">Your last morning here. The tower held you. Now it lets go.</p>
    <<if $d1_npc_nara and not $d2f_npc_nara_farewell>>
      <span class="badge side">🗡 Three notes at the bottom of the stairs</span>
    <</if>>
    [[Explore → |day2_tower_hub]]
  </div>

  /* BRIDGE — Return */
  <div class="loc-card loc-final">
    <h3>🌉 The Bridge — Return to the Palace</h3>
    <p class="loc-flavor">Thirty paces back. The same bridge. A different person crossing it.</p>
    <span class="badge main">⚔ Cross back — go home</span>
    [[Cross → |day2_bridge]]
  </div>

<</if>>

/* ===== MIDDAY+: PALACE LOCATIONS ===== */

<<if $d2f_bridge>>

  /* CHAMBERS */
  <div class="loc-card" @class="'loc-card' + ($d2f_chambers ? ' visited' : '')">
    <h3>🛏 Your Chambers</h3>
    <p class="loc-flavor">Everything is the same. The crack in the ceiling. The sword on the wall. The wardrobe full of a dead man's clothes.</p>
    <<if not $d2f_chambers>>
      <span class="badge main">⚔ Confront the old life</span>
    <</if>>
    <<if $d2f_chambers and not $d2f_npc_maren>>
      <span class="badge side">🗡 Maren is tidying</span>
    <</if>>
    <<if $timeSlot is "EVENING" and not $d2f_bath>>
      <span class="badge main">⚔ The bath</span>
    <</if>>
    <<if $timeSlot is "EVENING" and not $d2f_npc_queen_note>>
      <span class="badge side">🗡 A note under the door</span>
    <</if>>
    <<if $timeSlot is "NIGHT" and not $d2f_night>>
      <span class="badge main">⚔ Sleep — in your own bed</span>
    <</if>>
    [[Enter → |day2_chambers_hub]]
  </div>

  /* CORRIDORS */
  <div class="loc-card">
    <h3>🏛 Palace Corridors</h3>
    <p class="loc-flavor">The same corridors. Different height. Different everything.</p>
    <<if not $d2f_npc_harwick>>
      <span class="badge side">🗡 A perfumed ambush — politics</span>
    <</if>>
    <<if $d2_npc_caedric and not $d2f_npc_caedric>>
      <span class="badge side">🗡 "There she is"</span>
    <</if>>
    [[Explore → |day2_corridors]]
  </div>

  /* GARDENS */
  <<if $d2f_chambers>>
  <div class="loc-card" @class="'loc-card' + ($d2f_gardens ? ' visited' : '')">
    <h3>🌿 Royal Gardens</h3>
    <p class="loc-flavor">The same bench. Six inches lower. A cat that doesn't care about succession law.</p>
    <<if not $d2f_gardens>>
      <span class="badge main">⚔ You need air</span>
    <</if>>
    <<if $d2_npc_wynn and not $d2f_npc_wynn>>
      <span class="badge side">🗡 Old Wynn at the jasmine — new growth</span>
    <</if>>
    [[Enter → |day2_gardens_hub]]
  </div>
  <</if>>

  /* KITCHENS */
  <<if $d2_npc_marta>>
  <div class="loc-card">
    <h3>🍞 Palace Kitchens</h3>
    <p class="loc-flavor">Normal tempo. The crisis is manageable. The stool is waiting.</p>
    <<if not $d2f_npc_marta>>
      <span class="badge side">🗡 Same stool</span>
    <</if>>
    [[Enter → |day2_kitchen]]
  </div>
  <</if>>

<</if>>

</div>
```

---

## KEY PASSAGES — SCENE END HANDLERS

```html
:: day2_bridge [nobr]
/* === Bridge prose === */

<<set $d2f_bridge to true>>
<<set $timeSlot to "MIDDAY">>

<<completeObjective "bridge_return">>
<<addObjective "chambers" "Confront the old life — your chambers" "MAIN">>

/* Gauntlet is embedded in the bridge → chambers walk */
<div class="scene-end">[[Enter the palace → |day2_gauntlet]]</div>
```

```html
:: day2_gauntlet [nobr]
/* === Gauntlet prose — corridor walk === */

<<set $d2f_gauntlet to true>>
<<set $stress += 10>>
<<set $d2f_npc_pageboy to true>>  /* Page boy encounter embedded */

<div class="scene-end">[[Your chambers → |day2_chambers]]</div>
```

```html
:: day2_chambers [nobr]
/* === Chambers/wardrobe scene + Maren clothing === */

<<set $d2f_chambers to true>>
<<set $statFEM += 5>>
<<set $statGRA += 3>>
<<set $statALL += 2>>
<<set $stress += 5>>
<<set $timeSlot to "AFTERNOON">>

<<completeObjective "chambers">>
<<addObjective "gardens" "You need air" "MAIN">>

<div class="scene-end">[[Continue → |day2_hub]]</div>
```

```html
:: day2_gardens [nobr]
/* === Cry scene === */

<<set $d2f_gardens to true>>
<<set $stress -= 20>>
<<set $statRES += 2>>

/* Aldric arrives after cry — embedded or separate interaction */
<<addObjective "aldric_garden" "Aldric found you" "SIDE">>

<div class="scene-end">[[Continue → |day2_gardens_hub]]</div>
```

```html
:: day2_aldric [nobr]
/* === Aldric garden scene === */

<<set $d2f_aldric to true>>
<<set $affAldric += 5>>
<<set $stress -= 5>>
<<set $timeSlot to "EVENING">>

<<completeObjective "aldric_garden">>
<<addObjective "bath" "The bath — you haven't properly bathed" "MAIN">>

<div class="scene-end">[[Continue → |day2_hub]]</div>
```

```html
:: day2_bath [nobr]
/* === Bath scene — includes player choice for exploration === */

<<set $d2f_bath to true>>
<<set $stress -= 10>>
<<set $statFEM += 3>>
<<set $timeSlot to "NIGHT">>

/* Player choice embedded in prose */
/* If explored: $d2f_bath_explored = true, $arousal += 20, ALL +1 */

<div class="scene-end">[[Continue → |day2_hub]]</div>
```

---

## BATH CHOICE — IMPLEMENTATION

The bath scene contains an in-passage player choice:

```html
/* Inside day2_bath passage, after initial bath prose: */

<div class="choice-cards">
  <div class="interaction-card">
    <h4>Wash clinically</h4>
    <p>Scrub. Rinse. Exit. The body is a task, not a discovery.</p>
    <<link "Clinical">>
      <<set $d2f_bath_explored to false>>
      <<set $stress -= 10>>
      <<replace "#bath-continuation">>
        /* Clinical wash prose — brief, functional */
        She gets out. Wraps the towel. The body is clean. That's enough.
      <</replace>>
    <</link>>
  </div>

  <div class="interaction-card">
    <h4>Explore</h4>
    <p>Carefully. Quietly. In the privacy of the water. Your hands want to know what's there.</p>
    <<link "Explore">>
      <<set $d2f_bath_explored to true>>
      <<set $arousal += 20>>
      <<set $statALL += 1>>
      <<set $statFEM += 2>>
      <<replace "#bath-continuation">>
        /* Full exploration prose from core content */
      <</replace>>
    <</link>>
  </div>
</div>

<div id="bath-continuation"></div>
```

---

## UPDATED FILE STRUCTURE — DAY 2

```
AELINDRA/
├── production/
│   └── day_2/
│       ├── day2_core_content_female.md
│       ├── day2_core_content_futa.md           ← (FUTURE)
│       ├── day2_supplementary_npc_female.md
│       ├── day2_supplementary_npc_futa.md      ← (FUTURE)
│       └── day2_code_agent_prompt_female.md    ← THIS
├── engine/
│   └── passages/
│       └── days/
│           └── day_2/
│               ├── day2_hub.tw
│               ├── day2_tower_hub.tw        ← Morning tower sub-hub
│               ├── day2_bridge.tw           ← Bridge return
│               ├── day2_gauntlet.tw         ← Corridor walk (semi-linear)
│               ├── day2_chambers.tw         ← Wardrobe scene
│               ├── day2_chambers_hub.tw     ← Chambers sub-hub
│               ├── day2_gardens.tw          ← Cry scene
│               ├── day2_gardens_hub.tw      ← Garden sub-hub
│               ├── day2_aldric.tw           ← Garden Aldric
│               ├── day2_bath.tw             ← Bath with choice
│               ├── day2_night.tw            ← First night own bed
│               ├── day2_corridors.tw        ← Corridor sub-hub
│               ├── day2_kitchen.tw          ← Kitchen sub-hub
│               ├── day2_sleep_transition.tw
│               └── npc/
│                   ├── day2_npc_nara_farewell.tw
│                   ├── day2_npc_harwick.tw
│                   ├── day2_npc_caedric.tw
│                   ├── day2_npc_marta.tw
│                   ├── day2_npc_maren.tw
│                   ├── day2_npc_queen_note.tw
│                   ├── day2_npc_perrin.tw
│                   └── day2_npc_wynn.tw
```

---

## CONTINUITY GATES

| Day 2 NPC | Requires |
|---|---|
| Nara farewell | Previous Nara encounters |
| Caedric | `$d2_npc_caedric = true` (Day -2) |
| Marta | `$d2_npc_marta = true` (Day -2) |
| Wynn | `$d2_npc_wynn = true` (Day -2) |
| Perrin | `$d2_npc_perrin = true` (Day -2) |
| Harwick | No gate — always available |
| Maren | No gate — new NPC, always available |
| Page boy | No gate — embedded in gauntlet |
| Queen note | No gate — always available |

---

## DAY 2 → DAY 3 TRANSITION

```html
:: day2_sleep_transition

<<set $dayNumber to 3>>
<<set $dayLabel to "Learning">>
<<set $timeSlot to "MORNING">>
<<set $energy to 65>>
<<set $stress -= 5>>

/* Body update */
<<set $mcBust to "B cup (growing)">>
<<set $mcPortrait to "aelindra_day3">>

<div class="day-transition">
  <h2>Night passes. You dream of riding a horse.</h2>
  <p>In the dream, you're male. The saddle presses against cock and balls. The rhythm is familiar. The day is bright. Everything makes sense.</p>
  <p>You wake at dawn, disoriented, reaching between your legs for something that isn't there.</p>
  <p>The crack in the ceiling. The grey-blue eyes. The breasts on your chest — slightly larger than yesterday.</p>
  <p class="transition-morning"><em>Day 3. The Queen visits today. The lessons begin.</em></p>
  [[Dawn → |day3_hub]]
</div>
```

---

## QUALITY CHECKLIST — DAY 2

- [ ] **Hub switches from `.room-layout` (Day 1) to `.location-grid` (Day 2)** — world expands
- [ ] **Morning hub shows Moonspire + Bridge ONLY** — palace not accessible until bridge crossed
- [ ] **Bridge crossing adds all palace locations to hub**
- [ ] **Gauntlet is semi-linear** — embedded between bridge and chambers, not skippable
- [ ] **Wardrobe scene sets FEM +5, GRA +3** — clothing acknowledgment is a major stat event
- [ ] **Garden cry scene reduces Stress -20** — emotional release is mechanically significant
- [ ] **Bath has in-passage player choice** — clinical vs explore, with different stat outcomes
- [ ] **Bath exploration sets arousal +20 and ALL +1** — body awareness as stat
- [ ] **Towel-wrap moment sets FEM +2** — involuntary feminine gesture
- [ ] **Elder Council presentation date (Day 7) established** via Harwick encounter
- [ ] **Maren introduced** — new recurring NPC with familiarity tracker
- [ ] **Nara's resonance crystal** — item that plays three notes, symbolic of tower connection
- [ ] **Body stats updated** — bust B-cup in right sidebar
- [ ] **Portrait stays `aelindra_day1` until Day 3 transition** where it updates to `aelindra_day3`
- [ ] **Queen's second note establishes Day 3 visit** — tomorrow's main event seeded
- [ ] **All NPC return encounters gated by prologue flags**
