# AELINDRA — Day 1 Code Agent Prompt (FEMALE ROUTE)
## Confined Open-World Hub | Moonspire Tower Recovery
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day 1 ("Wrong") takes place entirely within the Moonspire Tower. Aelindra does NOT leave. The open-world hub is dramatically reduced to the **Recovery Room** and its immediate surroundings. Instead of navigating between palace locations, the player interacts with objects in the room, responds to visitors who come to the door, and makes small exploratory choices within a constrained space.

This is **intentional claustrophobia**. The reduced hub mirrors Aelindra's psychological state — the world has shrunk to four walls and a body she doesn't recognise.

**ARCHITECTURE:** The hub is a SINGLE ROOM with interactive objects, timed visitor events, and body-awareness encounters that unlock throughout the day. The "locations" are areas within the room, objects, and the door.

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day1_core_content_female.md` | 5 main scenes |
| `day1_supplementary_npc_female.md` | 9 optional encounters |
| This file | Integration logic, room-hub, visitor system |

---

## NEW VARIABLES — DAY 1

```javascript
// ===== DAY 1 INIT — Set in Day 0 void transition =====

<<set $dayNumber to 1>>
<<set $dayLabel to "Wrong">>
<<set $timeSlot to "MORNING">>

// MC identity updated in Day 0 void passage:
// $mcName = "Aelindra", $mcTitle = "Princess of Aethermere"
// $mcPortrait = "aelindra_day1", $bodyStatusVisible = true
// Body measurements set

// --- Day 1 Scene Flags ---
<<set $d1f_wake to true>>             // Auto-true from transition
<<set $d1f_exam to false>>            // Ilara's examination
<<set $d1f_alone to false>>           // Alone time
<<set $d1f_rowan to false>>           // Rowan's visit
<<set $d1f_night to false>>           // First night

// --- Day 1 NPC/Object Flags ---
<<set $d1f_npc_items to false>>
<<set $d1f_npc_nightgown to false>>
<<set $d1f_npc_queen_message to false>>
<<set $d1f_npc_aldric_door to false>>
<<set $d1f_npc_nara3 to false>>
<<set $d1f_npc_vael3 to false>>
<<set $d1f_npc_window to false>>
<<set $d1f_npc_body to false>>
<<set $d1f_npc_marta_tray to false>>

// --- Body Exploration (optional) ---
<<set $d1f_touched to false>>          // Did player choose to touch?
<<set $d1f_explored_vulva to false>>   // Clinical self-exam

// --- New Stat ---
<<set $statFEM to 0>>                 // Femininity awareness (involuntary tracker)
```

---

## TIME SYSTEM — DAY 1

Day 1 uses a simplified time system. Main scenes advance the clock. Side encounters DON'T advance time (they're available within the current time window).

```
MORNING    → Wake (auto), Exam (main), Room objects
AFTERNOON  → Alone (main), Aldric door, Vael, Body discoveries
EVENING    → Queen's message, Rowan visit (main), Marta tray
NIGHT      → First night (main), Sleep
```

| Action | Advances Time To |
|---|---|
| Complete Exam (`d1f_exam`) | AFTERNOON |
| Complete Alone (`d1f_alone`) | EVENING |
| Complete Rowan (`d1f_rowan`) | NIGHT |
| Sleep | END DAY 1 → Day 2 |

---

## ROOM HUB — THE RECOVERY ROOM

Instead of a location grid, Day 1 uses a **room layout** — interactive objects and zones within a single space.

### Hub Passage: `day1_hub`

```html
:: day1_hub

<div class="hub-header room-header">
  <h2>Moonspire Tower — Recovery Room</h2>
  <p class="time-display"><<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>></p>
</div>

<<include "objectivePanel">>

<div class="room-layout">

  /* ========== THE BED ========== */
  <div class="room-zone">
    <h3>🛏 The Bed</h3>
    <p class="loc-flavor">Soft linens, white stone walls, sunlight through narrow windows. This is where you woke up.</p>
    <<if $timeSlot is "NIGHT" and $d1f_rowan and not $d1f_night>>
      <span class="badge main">⚔ Try to sleep</span>
      [[Lie down → |day1_night]]
    <</if>>
  </div>

  /* ========== THE MIRROR ========== */
  <<if not $d1f_exam>>
  <div class="room-zone">
    <h3>🪞 The Mirror</h3>
    <p class="loc-flavor">Full-length polished silver. You haven't looked. Not properly. Ilara says you should.</p>
    <span class="badge main">⚔ Ilara is waiting to examine you</span>
    [[Face the mirror → |day1_exam]]
  </div>
  <</if>>

  /* ========== THE WINDOW ========== */
  <div class="room-zone">
    <h3>🪟 The Window</h3>
    <p class="loc-flavor">Narrow. A slice of sky and the distant sounds of the palace below.</p>
    <<if not $d1f_npc_window>>
      <span class="badge side">🗡 Listen to the world outside</span>
    <</if>>
    [[Approach → |day1_window_hub]]
  </div>

  /* ========== THE DOOR ========== */
  <div class="room-zone">
    <h3>🚪 The Door</h3>
    <p class="loc-flavor">Heavy oak. The corridor beyond. The outside world — held at bay.</p>
    <<if $d1f_exam and not $d1f_npc_aldric_door and $timeSlot is "AFTERNOON">>
      <span class="badge side">🗡 Footsteps outside — familiar ones</span>
    <</if>>
    <<if $d1f_alone and not $d1f_npc_nara3 and $d1_npc_nara>>
      <span class="badge side">🗡 Three notes repeating — a music box</span>
    <</if>>
    <<if $timeSlot is "EVENING" and not $d1f_npc_queen_message>>
      <span class="badge side">🗡 A soft knock — and a sealed note</span>
    <</if>>
    <<if $timeSlot is "EVENING" and $d1f_npc_queen_message and not $d1f_rowan>>
      <span class="badge main">⚔ Three taps, pause, two more — Rowan</span>
    <</if>>
    <<if $d1f_rowan and not $d1f_npc_marta_tray>>
      <span class="badge side">🗡 A tray on the floor outside</span>
    <</if>>
    [[Check the door → |day1_door_hub]]
  </div>

  /* ========== BEDSIDE TABLE ========== */
  <div class="room-zone">
    <h3>📦 Bedside Table</h3>
    <p class="loc-flavor">Items from yesterday. Someone placed them here while you slept.</p>
    <<if not $d1f_npc_items>>
      <span class="badge side">🗡 The things you carried</span>
    <</if>>
    <<if $d1f_exam and not $d1f_npc_vael3>>
      <span class="badge side">🗡 Vael left prescriptions</span>
    <</if>>
    [[Examine → |day1_table_hub]]
  </div>

  /* ========== THE NIGHTGOWN ========== */
  <<if not $d1f_npc_nightgown>>
  <div class="room-zone">
    <h3>👗 The Nightgown</h3>
    <p class="loc-flavor">White linen. Someone dressed you while you were unconscious.</p>
    <span class="badge side">🗡 Who put this on me?</span>
    [[Examine → |day1_npc_nightgown]]
  </div>
  <</if>>

  /* ========== YOUR BODY ========== */
  <<if $d1f_exam>>
  <div class="room-zone">
    <h3>🫀 Yourself</h3>
    <p class="loc-flavor">This body. These hands. This skin. There are discoveries waiting.</p>
    <<if not $d1f_npc_body>>
      <span class="badge side">🗡 Notice things</span>
    <</if>>
    [[Examine → |day1_npc_body_discoveries]]
  </div>
  <</if>>

  /* ========== ALONE TIME (Main Scene) ========== */
  <<if $d1f_exam and not $d1f_alone>>
  <div class="room-zone">
    <h3>🕯 Be Alone</h3>
    <p class="loc-flavor">Ilara left. The room is yours. The body is yours. You need to sit with both.</p>
    <span class="badge main">⚔ Process</span>
    [[Sit with it → |day1_alone]]
  </div>
  <</if>>

</div>
```

---

## SUB-HUBS — ROOM ZONES

### Door Sub-Hub

```html
:: day1_door_hub
<h2>🚪 The Door</h2>
<p>Heavy oak. Corridor sounds filter through.</p>

<<if $d1f_exam and not $d1f_npc_aldric_door and $timeSlot is "AFTERNOON">>
<div class="interaction-card side">
  <h4>🗡 Familiar Footsteps</h4>
  <p>Heavy. Even. The cadence of a man who has never been in a hurry. He stops outside.</p>
  [[Listen → |day1_npc_aldric_door]]
</div>
<</if>>

<<if $d1f_alone and not $d1f_npc_nara3 and $d1_npc_nara>>
<div class="interaction-card side">
  <h4>🎵 Three Notes Repeating</h4>
  <p>A music box. A tentative knock. "I brought tea because tea helps everything..."</p>
  [[Open the door → |day1_npc_nara3]]
</div>
<</if>>

<<if $timeSlot is "EVENING" and not $d1f_npc_queen_message>>
<div class="interaction-card side">
  <h4>📜 A Soft Knock — Sealed Note</h4>
  <p>Not Rowan's knock. Formal. A hand extends through the gap. The royal seal.</p>
  [[Take the note → |day1_npc_queen_message]]
</div>
<</if>>

<<if $timeSlot is "EVENING" and $d1f_npc_queen_message and not $d1f_rowan>>
<div class="interaction-card main">
  <h4>🎵 Three Taps. Pause. Two More.</h4>
  <p>Rowan. Playing softly through the door. Not forcing entry. Just... there.</p>
  [[Open the door → |day1_rowan]]
</div>
<</if>>

<<if $d1f_rowan and not $d1f_npc_marta_tray>>
<div class="interaction-card side">
  <h4>🍞 A Tray on the Floor</h4>
  <p>It wasn't there before. Covered with a clean cloth. The smell of Marta's soup.</p>
  [[Pick it up → |day1_npc_marta_tray]]
</div>
<</if>>

<<if ($d1f_npc_aldric_door or $timeSlot is "MORNING") and ($d1f_npc_queen_message or $timeSlot isnt "EVENING") and ($d1f_rowan or $timeSlot isnt "EVENING")>>
  <<if $d1f_npc_marta_tray or not $d1f_rowan>>
    <p class="empty-note">The corridor is quiet. No footsteps. No knocks. Just stone and silence.</p>
  <</if>>
<</if>>

<div class="nav-return">
  [[← Back to room → |day1_hub]]
</div>
```

### Window Sub-Hub

```html
:: day1_window_hub
<h2>🪟 The Window</h2>
<p>Narrow. A hand's breadth of sky. The world beyond the tower.</p>

<<if not $d1f_npc_window>>
<div class="interaction-card side">
  <h4>👂 Listen</h4>
  <p>The palace continues. Hammers, horses, laughter, children. A bread vendor's song.</p>
  [[Listen → |day1_npc_window]]
</div>
<</if>>

<<if $d1f_npc_window>>
  <p class="loc-flavor">A slice of sky. The bridge railing. The far palace wall. The sound of a world that doesn't know you've changed.</p>
<</if>>

<div class="nav-return">
  [[← Back to room → |day1_hub]]
</div>
```

### Table Sub-Hub

```html
:: day1_table_hub
<h2>📦 Bedside Table</h2>
<p>Items and prescriptions. The material evidence of being cared for.</p>

<<if not $d1f_npc_items>>
<div class="interaction-card side">
  <h4>🌸 The Things You Carried</h4>
  <p>Moonflower. Jasmine. A letter. A handkerchief. A ginger root. Five gifts from five people.</p>
  [[Examine → |day1_npc_items]]
</div>
<</if>>

<<if $d1f_exam and not $d1f_npc_vael3>>
<div class="interaction-card side">
  <h4>⚗ Vael's Prescriptions</h4>
  <p>Four vials in a wooden case. A knock, three raps, no patience.</p>
  [[Answer → |day1_npc_vael3]]
</div>
<</if>>

<div class="nav-return">
  [[← Back to room → |day1_hub]]
</div>
```

---

## SCENE END HANDLERS

```html
:: day1_exam [nobr]
/* === Paste exam prose from core content === */

<<set $d1f_exam to true>>
<<set $statWIS += 2>>
<<set $stress += 10>>
<<set $statFEM += 2>>
<<set $ilaraFamiliarity += 3>>
<<set $timeSlot to "AFTERNOON">>

<<completeObjective "exam">>
<<addObjective "alone" "You need time. Be alone with it." "MAIN">>
<<addObjective "aldric_door" "Footsteps in the corridor" "SIDE">>
<<addObjective "body_explore" "This body — notice things" "SIDE">>

<div class="scene-end">[[Continue → |day1_hub]]</div>
```

```html
:: day1_alone [nobr]
/* === Paste alone prose === */

<<set $d1f_alone to true>>
<<set $statFEM += 1>>
<<set $stress -= 5>>
<<set $timeSlot to "EVENING">>

<<completeObjective "alone">>
<<addObjective "rowan_evening" "Wait for evening — someone will come" "MAIN">>

<div class="scene-end">[[Continue → |day1_hub]]</div>
```

```html
:: day1_rowan [nobr]
/* === Paste Rowan prose === */

<<set $d1f_rowan to true>>
<<set $stress -= 15>>
<<set $affRowan += 5>>
<<set $statRES += 2>>
<<set $timeSlot to "NIGHT">>

<<completeObjective "rowan_evening">>
<<addObjective "night" "Try to sleep" "MAIN">>

<div class="scene-end">[[Continue → |day1_hub]]</div>
```

```html
:: day1_night [nobr]
/* === Paste night prose === */

<<set $d1f_night to true>>
<<set $statFEM += 1>>
<<set $energy to 30>>

<div class="scene-end">
  [[Sleep → |day1_sleep_transition]]
</div>
```

---

## DAY 1 → DAY 2 TRANSITION

```html
:: day1_sleep_transition

<<set $dayNumber to 2>>
<<set $dayLabel to "Body">>
<<set $timeSlot to "MORNING">>
<<set $energy to 50>>
<<set $stress -= 5>>

<div class="day-transition">
  <h2>Night passes. You dream of the mirror.</h2>
  <p>In the dream, your reflection smiles. You don't smile back. She reaches through the glass and her fingers are warm.</p>
  <p>You wake. The chipped canine is still there. The grey-blue eyes are still yours.</p>
  <p class="transition-morning"><em>Day 2. The body is still here. So are you.</em></p>
  [[Dawn → |day2_hub]]
</div>
```

---

## CSS ADDITIONS — ROOM LAYOUT

```css
/* Room layout replaces location grid for confined days */
.room-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
}

.room-zone {
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: var(--border-radius);
  padding: 14px 16px;
  transition: all 0.2s ease;
}

.room-zone:hover {
  border-color: var(--gold-dim);
  background: var(--bg-card-hover);
}

.room-zone h3 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--text-bright);
  margin: 0 0 4px;
}

.room-header h2 {
  font-size: 1.2rem;
}
```

---

## UPDATED FILE STRUCTURE

```
AELINDRA/
├── production/
│   ├── day_minus_2/
│   ├── day_minus_1/
│   ├── day_0/
│   └── day_1/                                    ← NEW
│       ├── day1_core_content_female.md           ← Female route scenes
│       ├── day1_core_content_futa.md             ← (FUTURE — futa route)
│       ├── day1_supplementary_npc_female.md      ← Female route encounters
│       ├── day1_supplementary_npc_futa.md        ← (FUTURE — futa route)
│       └── day1_code_agent_prompt_female.md      ← This file
├── engine/
│   └── passages/
│       └── days/
│           └── day_1/
│               ├── day1_hub.tw                    ← Room hub
│               ├── day1_exam.tw                   ← Mirror/exam scene
│               ├── day1_alone.tw                  ← Alone scene
│               ├── day1_rowan.tw                  ← Rowan visit
│               ├── day1_night.tw                  ← First night
│               ├── day1_door_hub.tw               ← Door sub-hub
│               ├── day1_window_hub.tw             ← Window sub-hub
│               ├── day1_table_hub.tw              ← Table sub-hub
│               ├── day1_sleep_transition.tw       ← → Day 2
│               └── npc/
│                   ├── day1_npc_items.tw
│                   ├── day1_npc_nightgown.tw
│                   ├── day1_npc_queen_message.tw
│                   ├── day1_npc_aldric_door.tw
│                   ├── day1_npc_nara3.tw
│                   ├── day1_npc_vael3.tw
│                   ├── day1_npc_window.tw
│                   ├── day1_npc_body.tw
│                   └── day1_npc_marta_tray.tw
```

---

## QUALITY CHECKLIST — DAY 1

- [ ] **Hub is a ROOM layout, not a location grid** — vertical list of room zones
- [ ] **No location grid** — player stays in one room all day
- [ ] **MC portrait shows `aelindra_day1`** — first female portrait
- [ ] **Right sidebar body stats are NOW VISIBLE** (`bodyStatusVisible = true`)
- [ ] **MC name shows "Aelindra"** in right sidebar
- [ ] **MC title shows "Princess of Aethermere"**
- [ ] **Visitors arrive at the DOOR at specific time slots** — Aldric (afternoon), Queen message (evening), Rowan (evening), Marta tray (after Rowan)
- [ ] **Nara only appears if met on Day -1** (continuity gate)
- [ ] **Items from Day 0 inventory appear on bedside table**
- [ ] **Body discoveries encounter is available after exam**
- [ ] **Exam scene returns to room hub, not a different location**
- [ ] **FEM stat introduced and increments involuntarily**
- [ ] **Time advances only on main scenes (exam → alone → Rowan → night)**
- [ ] **Queen's message must arrive BEFORE Rowan** (evening sequencing)
- [ ] **Marta's tray appears AFTER Rowan leaves** (post-visit discovery)
- [ ] **CSS uses `.room-layout` instead of `.location-grid`**
- [ ] **No palace locations accessible** — tower only
