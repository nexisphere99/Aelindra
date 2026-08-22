# AELINDRA   Day -1 Code Agent Prompt
## Open-World Hub Integration | Objective-Driven Architecture
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day -1 ("The Arguments") is the second playable day and the final day before the Rite. Edrin exhausts every alternative, visits the Moonspire Tower for the first time, destroys a training dummy, and tells Rowan everything. The open-world hub expands: **Moonspire Tower** becomes a new explorable location with sub-locations.

**ARCHITECTURE REMINDER:** No scene-to-scene chains. Player navigates via the Location Hub → Sub-Hub → Interaction Card pattern established on Day -2. Main objectives advance the clock. Side encounters do not.

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day-1_core_content.md` | 5 main scenes (first-person prose) |
| `day-1_supplementary_npc.md` | 12 optional NPC encounters |
| This file | Integration logic, hub structure, unlock conditions |
| `day-2_code_agent_prompt.md` | Base architecture (do not rebuild   extend) |

---

## NEW VARIABLES   DAY -1

```javascript
// ===== DAY -1 INIT   Add to day transition passage =====

// --- Day -1 Scene Flags ---
<<set $d1_queen to false>>          // Morning argument
<<set $d1_moonspire to false>>      // Ilara meeting
<<set $d1_training to false>>       // Rage session
<<set $d1_rowan to false>>          // Evening confession
<<set $d1_night to false>>          // Last mirror

// --- Day -1 NPC Flags ---
<<set $d1_npc_aldwyn to false>>
<<set $d1_npc_messenger to false>>
<<set $d1_npc_nara to false>>
<<set $d1_npc_vael to false>>
<<set $d1_npc_tamsin2 to false>>
<<set $d1_npc_voss to false>>
<<set $d1_npc_marta2 to false>>
<<set $d1_npc_vaelin2 to false>>
<<set $d1_npc_haeth to false>>
<<set $d1_npc_wynn2 to false>>
<<set $d1_npc_perrin2 to false>>
<<set $d1_npc_alva2 to false>>

// --- New Trackers ---
<<set $ilaraFamiliarity to 0>>
<<set $silverveilFamiliarity to 0>>
<<set $ashborneThreat to 0>>
<<set $riteKnowledge to 0>>
<<set $guardLoyalty to 0>>
<<set $householdReady to 0>>
<<set $hasVelthamLetter to false>>
<<set $vaelinQuestActive to false>>

// --- Update Day ---
<<set $dayNumber to -1>>
<<set $dayLabel to "The Arguments">>
<<set $timeSlot to "MORNING">>
```

---

## TIME SYSTEM   DAY -1 SCHEDULE

```
MORNING    → Queen's Chambers (Round Two), Corridors, Kitchen access
MIDDAY     → Moonspire Tower (Ilara meeting)
AFTERNOON  → Training Yard (Rage), Library, Servant Quarters, Moonspire exploration
EVENING    → Gardens, Edrin's Chambers (Rowan visit)
NIGHT      → Mirror scene, Sleep
```

**Time Advancement Rules:**
| Action | Advances Time To |
|---|---|
| Complete Queen argument (`d1_queen`) | MIDDAY |
| Complete Moonspire (`d1_moonspire`) | AFTERNOON |
| Complete Training rage (`d1_training`) | EVENING |
| Complete Rowan scene (`d1_rowan`) | NIGHT |
| Sleep | END DAY -1 → Begin Day 0 |

---

## OBJECTIVE FLOW   DAY -1

```
[MORNING   On Wake]
  MAIN: "Confront the Queen   you have a list"
  SIDE: "A physician in the corridor   he's moving fast"
  SIDE: "Visit the Kitchens   Marta is baking at crisis tempo"

[AFTER QUEEN ARGUMENT]
  MAIN: "The Moonspire Tower   Archsorceress Ilara can explain the Rite"
  SIDE: "A palace messenger has an urgent letter"
  SIDE: "Explore the corridors"

[AFTER MOONSPIRE / ILARA]
  MAIN: "Burn it off   the Training Yard"
  SIDE: "Explore the Moonspire Tower   apprentice quarters, apothecary"
  SIDE: "Visit the Grand Library   Brother Vaelin may have found something"
  SIDE: "Below Stairs   Mistress Alva"

[AFTER TRAINING RAGE]
  MAIN: "Evening approaches   return to your chambers"
  SIDE: "The gardens   Old Wynn is covering the roses"
  SIDE: "Training Yard   Tamsin is practicing" (if met on Day -2)
  SIDE: "Sergeant Voss at the training perimeter"

[EVENING   CHAMBERS]
  MAIN: "A knock at the door   Rowan's knock" (auto-triggers on entering chambers in EVENING)

[AFTER ROWAN]
  MAIN: "The mirror. One last time."
  SIDE: "The corridor   Perrin is at his post"

[NIGHT]
  MAIN: "Sleep" → End Day
```

---

## LOCATION HUB   DAY -1

### Hub Passage: `day-1_hub`

```html
:: day-1_hub
<<set _slot to $timeSlot>>

<div class="hub-header">
  <h2>Crown's Rest   Day -1: The Arguments</h2>
  <p class="time-display">Time: <<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>></p>
</div>

<<include "objectivePanel">>

<div class="location-grid">

/* ========== EDRIN'S CHAMBERS ========== */
<div class="loc-card">
  <h3>🛏 Edrin's Chambers</h3>
  <p class="loc-flavor">Your room. The half-written letter is gone from the desk. The mirror waits.</p>
  <<if $timeSlot is "EVENING" and not $d1_rowan>>
    <span class="badge main">⚔ Someone is knocking</span>
    [[Enter → |day-1_rowan]]
  <<elseif $timeSlot is "NIGHT" and not $d1_night>>
    <span class="badge main">⚔ The mirror. One last time.</span>
    [[Enter → |day-1_night]]
  <<else>>
    [[Enter → |day-1_chambers_explore]]
  <</if>>
</div>

/* ========== QUEEN'S CHAMBERS ========== */
<<if not $d1_queen>>
<div class="loc-card">
  <h3>👑 Queen's Chambers   East Wing</h3>
  <p class="loc-flavor">You have a list. She'll have answers. You already know you won't like them.</p>
  <span class="badge main">⚔ Confront the Queen</span>
  [[Enter → |day-1_queen]]
</div>
<</if>>

/* ========== PALACE CORRIDORS ========== */
<div class="loc-card">
  <h3>🏛 Palace Corridors</h3>
  <p class="loc-flavor">Stone hallways. Portraits of queens. The usual traffic   plus some unusual faces.</p>
  <<if not $d1_npc_aldwyn>>
    <span class="badge side">🗡 A physician in a hurry</span>
  <</if>>
  <<if not $d1_npc_messenger>>
    <span class="badge side">🗡 A messenger with a sealed letter</span>
  <</if>>
  [[Explore → |day-1_corridors]]
</div>

/* ========== MOONSPIRE TOWER (NEW) ========== */
<<if $d1_queen>>
<div class="loc-card" @class="'loc-card' + ($d1_moonspire ? ' visited' : '') + ' loc-new'">
  <h3>🌙 Moonspire Tower</h3>
  <p class="loc-flavor">White stone. Faint moonlight glow. The covered bridge howls with wind.</p>
  <<if not $d1_moonspire>>
    <span class="badge main">⚔ Meet Archsorceress Ilara</span>
  <<else>>
    <<if not $d1_npc_nara>>
      <span class="badge side">🗡 Voices on the lower level</span>
    <</if>>
    <<if not $d1_npc_vael>>
      <span class="badge side">🗡 The Apothecary is open</span>
    <</if>>
  <</if>>
  [[Cross the bridge → |day-1_moonspire_hub]]
</div>
<</if>>

/* ========== TRAINING YARD ========== */
<<if $d1_moonspire>>
<div class="loc-card" @class="'loc-card' + ($d1_training ? ' visited' : '')">
  <h3>⚔ Training Yard</h3>
  <p class="loc-flavor">Practice dummies. Weapon racks. The smell of chalk and iron. Right now, iron sounds good.</p>
  <<if not $d1_training>>
    <span class="badge main">⚔ Burn it off</span>
  <</if>>
  <<if $d1_training and $d2_npc_tamsin and not $d1_npc_tamsin2>>
    <span class="badge side">🗡 Tamsin is at the dummies</span>
  <</if>>
  <<if $d1_training and not $d1_npc_voss>>
    <span class="badge side">🗡 An officer watching drills</span>
  <</if>>
  [[Enter → |day-1_training_hub]]
</div>
<</if>>

/* ========== KITCHENS ========== */
<div class="loc-card">
  <h3>🍞 Palace Kitchens</h3>
  <p class="loc-flavor">The output is staggering. Marta is baking like the world is ending. She might not be wrong.</p>
  <<if $d2_npc_marta and not $d1_npc_marta2>>
    <span class="badge side">🗡 Crisis tempo</span>
  <</if>>
  [[Enter → |day-1_kitchen]]
</div>

/* ========== GRAND LIBRARY ========== */
<<if $d1_moonspire>>
<div class="loc-card">
  <h3>📚 Grand Library</h3>
  <p class="loc-flavor">Three stories of answers. Some of them might even be useful today.</p>
  <<if $d2_npc_vaelin and not $d1_npc_vaelin2>>
    <span class="badge side">🗡 Brother Vaelin's book fortress has grown</span>
  <</if>>
  <<if not $d1_npc_haeth>>
    <span class="badge side">🗡 Haeth at his desk</span>
  <</if>>
  [[Enter → |day-1_library_hub]]
</div>
<</if>>

/* ========== SERVANT QUARTERS ========== */
<<if $d1_moonspire>>
<div class="loc-card">
  <h3>🔑 Servant Quarters   Below Stairs</h3>
  <p class="loc-flavor">Alva's intelligence network. The machinery runs. It sees everything.</p>
  <<if $d2_npc_alva and not $d1_npc_alva2>>
    <span class="badge side">🗡 "I have three items"</span>
  <</if>>
  [[Enter → |day-1_servants]]
</div>
<</if>>

/* ========== ROYAL GARDENS ========== */
<<if $d1_training and ($timeSlot is "EVENING" or $timeSlot is "AFTERNOON")>>
<div class="loc-card">
  <h3>🌿 Royal Gardens</h3>
  <p class="loc-flavor">Dusk again. The jasmine is covered tonight   frost warning.</p>
  <<if $d2_npc_wynn and not $d1_npc_wynn2>>
    <span class="badge side">🗡 Old Wynn covering the roses</span>
  <</if>>
  [[Enter → |day-1_gardens_hub]]
</div>
<</if>>

</div>
```

---

## NEW LOCATION: MOONSPIRE TOWER   SUB-HUB

```html
:: day-1_moonspire_hub
<h2>🌙 Moonspire Tower</h2>
<p>White stone walls. Enchanted candles. Tapestries that shift when you're not looking. The air tastes electric.</p>

<<if not $d1_moonspire>>
  <div class="interaction-card main">
    <h4>🔮 The Ritual Chamber   Archsorceress Ilara</h4>
    <p>She's waiting at the top of the stairs. She knew you'd come.</p>
    [[Climb the stairs|day-1_moonspire]]
  </div>
<</if>>

<<if $d1_moonspire>>
  <<if not $d1_npc_nara>>
  <div class="interaction-card side">
    <h4>🎵 Apprentice Quarters   Lower Level</h4>
    <p>A wrong turn leads down. A painted door is open. Something mechanical is playing music, badly.</p>
    [[Investigate|day-1_npc_nara]]
  </div>
  <</if>>

  <<if not $d1_npc_vael>>
  <div class="interaction-card side">
    <h4>⚗ The Apothecary   Third Level</h4>
    <p>A circular room of glass bottles and competing scents. Someone is grinding something with unnecessary force.</p>
    [[Enter|day-1_npc_vael]]
  </div>
  <</if>>

  <div class="interaction-card">
    <h4>📜 Tapestry Gallery   Stairwell</h4>
    <p class="flavor-dim">The serpent becoming a river. The tree becoming a woman. The bird becoming a song. They shift when you blink.</p>
  </div>
<</if>>

<div class="nav-return">
  [[← Cross the bridge back|day-1_hub]]
</div>
```

---

## OTHER SUB-HUBS   DAY -1

### Training Yard Sub-Hub

```html
:: day-1_training_hub
<h2>⚔ Training Yard</h2>
<p>Chalk and iron. The weapon rack. The training dummies stand like silent witnesses.</p>

<<if not $d1_training>>
  <div class="interaction-card main">
    <h4>🗡 The Heavy Practice Sword</h4>
    <p>The weighted one. Lead in the pommel. Too heavy for finesse. Perfect for what you need.</p>
    [[Take it|day-1_training]]
  </div>
<</if>>

<<if $d1_training>>
  <<if $d2_npc_tamsin and not $d1_npc_tamsin2>>
  <div class="interaction-card side">
    <h4>🗡 Tamsin at the Dummies</h4>
    <p>She's back. Her form is better. The short backswing took root.</p>
    [[Watch|day-1_npc_tamsin2]]
  </div>
  <</if>>

  <<if not $d1_npc_voss>>
  <div class="interaction-card side">
    <h4>🛡 Sergeant Voss   Drill Perimeter</h4>
    <p>A compact, broad woman watching junior guards with the stillness of a predator.</p>
    [[Approach|day-1_npc_voss]]
  </div>
  <</if>>

  <div class="interaction-card">
    <h4>⚔ The Destroyed Dummy</h4>
    <p class="flavor-dim">A skeleton of post and nails. Straw scattered across ten feet of flagstones. One arm missing entirely. Your work.</p>
  </div>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-1_hub]]
</div>
```

### Corridors Sub-Hub

```html
:: day-1_corridors
<h2>🏛 Palace Corridors</h2>
<p>The usual traffic   servants, guards, courtiers   and an unusual tension beneath it all.</p>

<<if not $d1_npc_aldwyn>>
<div class="interaction-card side">
  <h4>⚕ A Physician in a Hurry</h4>
  <p>Master Aldwyn rounds the corner at speed, satchel clinking with glass vials.</p>
  [[Intercept|day-1_npc_aldwyn]]
</div>
<</if>>

<<if not $d1_npc_messenger>>
<div class="interaction-card side">
  <h4>📨 Palace Runner with a Sealed Letter</h4>
  <p>A breathless boy holds out a parchment. Green wax seal   Lord Veltham's sigil.</p>
  [[Take the letter|day-1_npc_messenger]]
</div>
<</if>>

<<if $d1_npc_aldwyn and $d1_npc_messenger>>
  <p class="empty-note">The corridors hum with the ordinary business of a palace that senses something extraordinary approaching.</p>
<</if>>

<div class="nav-return">
  [[← Return to Palace Hub|day-1_hub]]
</div>
```

### Library, Kitchen, Servants, Gardens   follow Day -2 sub-hub pattern with Day -1 NPC flags. Build each using the same `interaction-card` structure: check flag → show card → on complete, return to sub-hub.

---

## SCENE END HANDLERS   DAY -1

Each main scene applies stats and advances time. Pattern:

```html
:: day-1_queen [nobr]
/* === PASTE PROSE FROM day-1_core_content.md   SCENE 1 === */

<<set $d1_queen to true>>
<<set $stress += 25>>
<<set $statRES += 3>>
<<set $affSeraphina += 2>>
<<set $timeSlot to "MIDDAY">>

<<completeObjective "queen_round2">>
<<addObjective "moonspire_ilara" "The Moonspire Tower   Archsorceress Ilara can explain the Rite" "MAIN">>
<<addObjective "corridor_messenger" "A messenger has a sealed letter" "SIDE">>

<div class="scene-end">
  [[Continue → |day-1_hub]]
</div>
```

```html
:: day-1_moonspire [nobr]
/* === PASTE PROSE   SCENE 2 === */

<<set $d1_moonspire to true>>
<<set $statWIS += 3>>
<<set $stress += 5>>
<<set $ilaraFamiliarity += 5>>
<<set $riteKnowledge += 3>>
<<set $timeSlot to "AFTERNOON">>

<<completeObjective "moonspire_ilara">>
<<addObjective "training_rage" "Burn it off   the Training Yard" "MAIN">>
<<addObjective "moonspire_explore" "Explore the Moonspire Tower" "SIDE">>
<<addObjective "library_vaelin" "Brother Vaelin may have found something" "SIDE">>
<<addObjective "servants_alva" "Below Stairs   Mistress Alva" "SIDE">>

<div class="scene-end">
  [[Continue → |day-1_moonspire_hub]]  /* Return to Moonspire sub-hub so player can explore */
</div>
```

```html
:: day-1_training [nobr]
/* === PASTE PROSE   SCENE 3 === */

<<set $d1_training to true>>
<<set $statPRO += 2>>
<<set $stress -= 10>>
<<set $affAldric += 3>>
<<set $timeSlot to "EVENING">>

<<completeObjective "training_rage">>
<<addObjective "chambers_rowan" "Evening approaches   return to your chambers" "MAIN">>
<<addObjective "gardens_wynn" "The gardens   Old Wynn is covering the roses" "SIDE">>

<div class="scene-end">
  [[Continue → |day-1_training_hub]]
</div>
```

```html
:: day-1_rowan [nobr]
/* === PASTE PROSE   SCENE 4 === */

<<set $d1_rowan to true>>
<<set $stress -= 20>>
<<set $statRES += 2>>
<<set $affRowan += 10>>
<<set $timeSlot to "NIGHT">>

<<completeObjective "chambers_rowan">>
<<addObjective "mirror_last" "The mirror. One last time." "MAIN">>
<<addObjective "perrin_night" "The corridor   Perrin is at his post" "SIDE">>

<div class="scene-end">
  [[Continue → |day-1_hub]]
</div>
```

```html
:: day-1_night [nobr]
/* === PASTE PROSE   SCENE 5 === */

<<set $d1_night to true>>
<<set $energy to 0>>

<<completeObjective "mirror_last">>
<<addObjective "sleep" "Sleep" "MAIN">>

<div class="scene-end">
  [[Sleep → |day-1_sleep_transition]]
</div>
```

---

## NPC PASSAGE PATTERN

Each NPC passage sets its flag, applies stats, and returns to its parent sub-hub:

```html
:: day-1_npc_nara [nobr]
/* === PASTE PROSE FROM supplementary NPC file === */

<<set $d1_npc_nara to true>>
<<set $stress -= 5>>
<<set $silverveilFamiliarity += 2>>

<div class="scene-end">
  [[Continue → |day-1_moonspire_hub]]
</div>
```

**Apply this pattern for ALL 12 NPC passages.** Each returns to its PARENT sub-hub, NOT the main hub.

---

## DAY TRANSITION   DAY -1 → DAY 0

```html
:: day-1_sleep_transition

<div class="day-transition">
  <h2>Night. The last night.</h2>
  <p>You dream of the tapestries in the Moonspire. The serpent becoming the river. The tree becoming the woman. The bird becoming the song.</p>
  <p>In the dream, the bird is you and the song is beautiful and you can't remember what wings felt like.</p>
  <hr>
  <p class="transition-morning">Dawn comes. The morning of Day Zero.</p>
  <p class="transition-morning"><em>Today you walk to the tower. Today the Rite begins.</em></p>
  [[Dawn → |day0_hub]]
</div>
```

```javascript
// Day 0 Init (in transition passage)
<<set $dayNumber to 0>>
<<set $dayLabel to "The Rite">>
<<set $timeSlot to "MORNING">>
<<set $energy to 60>>  /* Slept, but poorly   wine and dread */
<<set $stress += 10>>  /* Morning-of anxiety */
```

---

## NEWLY AVAILABLE LOCATIONS   DAY -1

| Location | Status | Notes |
|---|---|---|
| Edrin's Chambers | Available | Rowan visit (evening), mirror (night) |
| Queen's Chambers | Available MORNING | Closes after argument scene |
| Palace Corridors | Available | Aldwyn, messenger |
| Kitchens | Available | Marta return visit |
| **Moonspire Tower** | **NEW   unlocks after Queen scene** | Ilara main scene + 2 sub-locations (Nara, Vael) |
| Training Yard | Available AFTERNOON+ | Rage session + Tamsin return + Voss |
| Grand Library | Available AFTERNOON+ | Vaelin return, Haeth |
| Servant Quarters | Available AFTERNOON+ | Alva return |
| Royal Gardens | Available EVENING | Wynn return |

**STILL LOCKED:**
- Capital City (Day 4+)
- Greenwood (Day 15+)
- Ashborne Estate (Day 26+)
- Tournament Grounds (Day 36+)
- Port Auriel (Day 50+)

---

## NEW NPC REGISTRY   DAY -1

| NPC | Location | Type | New? | Persists? |
|---|---|---|---|---|
| **Archsorceress Ilara** | Moonspire Tower | Main cast   Mentor | **NEW (main)** | Yes   all 120 days |
| Master Aldwyn | Corridors | Recurring minor | **NEW** | Yes   medical updates |
| Apprentice Nara | Moonspire Tower | Recurring minor | **NEW** | Yes   magical subplot |
| Mistress Vael | Moonspire Apothecary | Recurring minor | **NEW** | Yes   potion/alchemy |
| Sergeant Voss | Training Yard | Recurring minor | **NEW** | Yes   guard subplot |
| Marta | Kitchen | Return visit | No | Continues |
| Brother Vaelin | Library | Return visit   quest update | No | Continues   compilation quest |
| Librarian Haeth | Library | Return visit | No | Continues |
| Recruit Tamsin | Training Yard | Return visit | No | Continues   training arc |
| Old Wynn | Gardens | Return visit | No | Continues |
| Night Guard Perrin | Chambers (night) | Return visit | No | Continues |
| Mistress Alva | Servant Quarters | Return visit | No | Continues |

---

## CONTINUITY CHECKS   RECURRING NPCs

Several Day -1 encounters are GATED by Day -2 flags. The code agent must check:

| Day -1 NPC | Requires Day -2 Flag |
|---|---|
| `d1_npc_tamsin2` | `d2_npc_tamsin = true` |
| `d1_npc_marta2` | `d2_npc_marta = true` |
| `d1_npc_vaelin2` | `d2_npc_vaelin = true` |
| `d1_npc_wynn2` | `d2_npc_wynn = true` |
| `d1_npc_perrin2` | `d2_npc_perrin = true` |
| `d1_npc_alva2` | `d2_npc_alva = true` |

If the player didn't meet an NPC on Day -2, their Day -1 return scene is NOT available. This rewards exploration and creates different playthroughs.

---

## CSS ADDITIONS   MOONSPIRE TOWER THEME

```css
/* --- New location visual distinction --- */
.loc-new {
  border-left: 3px solid var(--accent-purple);
}

.loc-new h3 {
  color: var(--accent-purple);
}

/* Moonspire-specific sub-hub styling */
.moonspire-flavor {
  color: #9b8ec4;
  font-style: italic;
}
```

---

## UPDATED FILE STRUCTURE

```
AELINDRA/
├── production/
│   ├── day_minus_2/
│   │   ├── day-2_core_content.md
│   │   ├── day-2_supplementary_npc.md
│   │   └── day-2_code_agent_prompt.md
│   └── day_minus_1/                          ← NEW
│       ├── day-1_core_content.md             ← THIS FILE
│       ├── day-1_supplementary_npc.md        ← NPC FILE
│       └── day-1_code_agent_prompt.md        ← THIS FILE
├── engine/
│   └── passages/
│       ├── day-1_hub.tw                      ← NEW
│       ├── day-1_queen.tw                    ← Scene 1
│       ├── day-1_moonspire_hub.tw            ← NEW sub-hub
│       ├── day-1_moonspire.tw                ← Scene 2
│       ├── day-1_training_hub.tw             ← Extends Day -2
│       ├── day-1_training.tw                 ← Scene 3
│       ├── day-1_rowan.tw                    ← Scene 4
│       ├── day-1_night.tw                    ← Scene 5
│       ├── day-1_corridors.tw                ← Sub-hub
│       ├── day-1_library_hub.tw              ← Sub-hub
│       ├── day-1_kitchen.tw                  ← Sub-hub
│       ├── day-1_servants.tw                 ← Sub-hub
│       ├── day-1_gardens_hub.tw              ← Sub-hub
│       ├── day-1_chambers_explore.tw         ← Sub-hub
│       ├── day-1_sleep_transition.tw         ← Day end
│       └── npc/
│           ├── day-1_npc_aldwyn.tw
│           ├── day-1_npc_messenger.tw
│           ├── day-1_npc_nara.tw
│           ├── day-1_npc_vael.tw
│           ├── day-1_npc_tamsin2.tw
│           ├── day-1_npc_voss.tw
│           ├── day-1_npc_marta2.tw
│           ├── day-1_npc_vaelin2.tw
│           ├── day-1_npc_haeth.tw
│           ├── day-1_npc_wynn2.tw
│           ├── day-1_npc_perrin2.tw
│           └── day-1_npc_alva2.tw
```

---

## QUALITY CHECKLIST   DAY -1

- [ ] **Moonspire Tower renders as NEW location with purple accent border**
- [ ] **Moonspire sub-hub has 3 interactions: Ilara (main), Nara (side), Vael (side)**
- [ ] **Ilara main scene returns to Moonspire sub-hub, NOT main hub** (player can explore tower)
- [ ] **Queen scene only available in MORNING   disappears after completion**
- [ ] **Rowan scene auto-triggers when entering Chambers in EVENING slot**
- [ ] **Return NPCs (Tamsin, Marta, Vaelin, Wynn, Perrin, Alva) gated by Day -2 flags**
- [ ] **Veltham letter adds `$hasVelthamLetter = true` and optional inventory item**
- [ ] **Vaelin encounter updates quest flag: `$vaelinQuestActive = true`**
- [ ] **All 5 core scenes use prose from `day-1_core_content.md`**
- [ ] **All 12 NPC encounters use prose from `day-1_supplementary_npc.md`**
- [ ] **Night mirror scene transitions to Day 0 via sleep passage**
- [ ] **Day 0 init sets new variables including Rite anticipation**
- [ ] **CSS includes `.loc-new` purple accent for Moonspire**
- [ ] **Time advancement only on main scene completion**
- [ ] **Each NPC returns to parent sub-hub, not main hub**
- [ ] **Objective panel updates correctly after each main scene**

---

## IMPLEMENTATION ORDER

1. Add Day -1 variables to the transition passage from Day -2
2. Build `day-1_hub`   extend the Day -2 hub pattern with Moonspire Tower
3. Build `day-1_moonspire_hub`   new sub-hub for the tower
4. Build remaining sub-hubs (corridors, training, library, kitchen, servants, gardens, chambers)
5. Paste core content prose into 5 main scene passages
6. Paste NPC prose into 12 NPC passages
7. Wire all stat changes, flags, time advancement, and objective updates
8. Wire continuity gates (Day -2 flag checks for return NPCs)
9. Build Day 0 transition passage
10. Test full loop: Wake → Hub → Explore → Scene → Hub → ... → Sleep → Day 0
