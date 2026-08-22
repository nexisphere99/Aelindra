# AELINDRA — Day 1 Code Agent Prompt (FUTANARI ROUTE)
## Confined Open-World Hub | Moonspire Tower Recovery
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day 1 Futa ("Both") uses the **identical room-hub architecture** as Day 1 Female — same CSS, same layout, same zone-based interaction pattern. The CONTENT is entirely different. Every passage contains futa-specific prose, body references, and emotional texture.

**KEY MECHANICAL DIFFERENCES FROM FEMALE ROUTE:**
1. **Arousal stat is ACTIVE from Day 1** — dual anatomy creates baseline arousal
2. **Concealment system introduced** — hidden stat tracking concealment awareness/skill
3. **Loneliness stat introduced** — futa-only hidden tracker
4. **Gold vial (dual-arousal modulator)** — unique inventory item
5. **Smallclothes problem** — practical concealment challenge seeded
6. **Nara's knowledge** — she suspects the partial form; her trust is a futa-specific relationship tracker

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day1_core_content_futa.md` | 5 main scenes (futa-specific prose) |
| `day1_supplementary_npc_futa.md` | 9 optional encounters (futa-specific) |
| This file | Integration logic |
| `day1_code_agent_prompt_female.md` | Shared architecture (CSS, room layout structure) — DO NOT duplicate, extend |

---

## NEW VARIABLES — DAY 1 FUTA

```javascript
// ===== DAY 1 FUTA INIT — Set in day0_void_futa transition =====

// --- Shared with female route ---
<<set $dayNumber to 1>>
<<set $dayLabel to "Both">>            // Different label from female ("Wrong")
<<set $timeSlot to "MORNING">>
<<set $statFEM to 0>>

// --- Scene flags (futa-specific passage names) ---
<<set $d1ft_wake to true>>
<<set $d1ft_exam to false>>
<<set $d1ft_alone to false>>
<<set $d1ft_rowan to false>>
<<set $d1ft_night to false>>

// --- NPC flags ---
<<set $d1ft_npc_items to false>>
<<set $d1ft_npc_smallclothes to false>>
<<set $d1ft_npc_queen_message to false>>
<<set $d1ft_npc_aldric_door to false>>
<<set $d1ft_npc_nara3 to false>>
<<set $d1ft_npc_vael3 to false>>
<<set $d1ft_npc_window to false>>
<<set $d1ft_npc_body to false>>
<<set $d1ft_npc_marta_tray to false>>

// --- Futa-specific stats ---
<<set $loneliness to 5>>               // Futa-only hidden stat
<<set $concealmentAwareness to false>>  // Activated by smallclothes encounter
<<set $concealmentSkill to 0>>         // Grows over time
<<set $concealmentDifficulty to 30>>   // Set in Day 0 void
<<set $dualArousalModulator to false>> // Gold vial obtained
<<set $naraTrust to 0>>                // Futa-specific — Nara's knowledge
<<set $feedbackLoopActive to true>>    // Dual arousal feedback
<<set $arousal to 25>>                 // Elevated baseline from Day 1
```

---

## HUB PASSAGE — FUTA DAY 1

The hub is IDENTICAL in structure to the female route's room hub but uses futa passage names and has one additional zone: "The Smallclothes."

```html
:: day1_hub_futa

<div class="hub-header room-header">
  <h2>Moonspire Tower — Recovery Room</h2>
  <p class="time-display"><<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>> | Arousal: <<print $arousal>></p>
</div>

<<include "objectivePanel">>

<div class="room-layout">

  /* --- THE BED --- */
  <div class="room-zone">
    <h3>🛏 The Bed</h3>
    <p class="loc-flavor">Soft linens. White stone walls. A body that won't stop talking to itself.</p>
    <<if $timeSlot is "NIGHT" and $d1ft_rowan and not $d1ft_night>>
      <span class="badge main">⚔ Try to sleep — if the body allows it</span>
      [[Lie down → |day1_night_futa]]
    <</if>>
  </div>

  /* --- THE MIRROR --- */
  <<if not $d1ft_exam>>
  <div class="room-zone">
    <h3>🪞 The Mirror</h3>
    <p class="loc-flavor">Full-length silver. The reflection holds everything — breasts, hips, and between your legs, both.</p>
    <span class="badge main">⚔ Ilara is waiting — the examination is more complex for you</span>
    [[Face it → |day1_exam_futa]]
  </div>
  <</if>>

  /* --- THE WINDOW --- */
  <div class="room-zone">
    <h3>🪟 The Window</h3>
    <p class="loc-flavor">The world in two columns. Male and female. You fit in neither.</p>
    <<if not $d1ft_npc_window>>
      <span class="badge side">🗡 Listen to the world you don't fit into</span>
    <</if>>
    [[Approach → |day1f_window_hub]]
  </div>

  /* --- THE DOOR --- */
  <div class="room-zone">
    <h3>🚪 The Door</h3>
    <p class="loc-flavor">Heavy oak. The corridor beyond. Visitors who don't know your secret.</p>
    <<if $d1ft_exam and not $d1ft_npc_aldric_door and $timeSlot is "AFTERNOON">>
      <span class="badge side">🗡 Familiar footsteps — and a question you can't ask him</span>
    <</if>>
    <<if $d1ft_alone and not $d1ft_npc_nara3 and $d1_npc_nara>>
      <span class="badge side">🗡 Three notes — someone who might know</span>
    <</if>>
    <<if $timeSlot is "EVENING" and not $d1ft_npc_queen_message>>
      <span class="badge side">🗡 A sealed note — from someone who doesn't know what you kept</span>
    <</if>>
    <<if $timeSlot is "EVENING" and $d1ft_npc_queen_message and not $d1ft_rowan>>
      <span class="badge main">⚔ Three taps, pause, two more — the one person you can tell</span>
    <</if>>
    <<if $d1ft_rowan and not $d1ft_npc_marta_tray>>
      <span class="badge side">🗡 A tray — from someone who doesn't need to know</span>
    <</if>>
    [[Check → |day1f_door_hub]]
  </div>

  /* --- BEDSIDE TABLE --- */
  <div class="room-zone">
    <h3>📦 Bedside Table</h3>
    <p class="loc-flavor">Items from yesterday. Gifts given to a prince. Received by something else.</p>
    <<if not $d1ft_npc_items>>
      <span class="badge side">🗡 The things you carried</span>
    <</if>>
    <<if $d1ft_exam and not $d1ft_npc_vael3>>
      <span class="badge side">🗡 Five vials — one you won't find in any apothecary</span>
    <</if>>
    [[Examine → |day1f_table_hub]]
  </div>

  /* --- THE SMALLCLOTHES (FUTA-ONLY ZONE) --- */
  <<if $d1ft_exam and not $d1ft_npc_smallclothes>>
  <div class="room-zone">
    <h3>👗 The Clothing Problem</h3>
    <p class="loc-flavor">Modified smallclothes. A visible bulge. The first of many concealment challenges.</p>
    <span class="badge side">🗡 This isn't going to work</span>
    [[Examine → |day1f_npc_smallclothes]]
  </div>
  <</if>>

  /* --- YOUR BODY (DUAL) --- */
  <<if $d1ft_exam>>
  <div class="room-zone">
    <h3>🫀 Both of You</h3>
    <p class="loc-flavor">Two systems. One body. Connected in ways you're still discovering.</p>
    <<if not $d1ft_npc_body>>
      <span class="badge side">🗡 Notice things — in pairs</span>
    <</if>>
    [[Examine → |day1f_npc_body_discoveries]]
  </div>
  <</if>>

  /* --- ALONE TIME (MAIN) --- */
  <<if $d1ft_exam and not $d1ft_alone>>
  <div class="room-zone">
    <h3>🕯 Be Alone — With Both</h3>
    <p class="loc-flavor">Ilara left. Two sets of nerve endings and no instruction manual.</p>
    <span class="badge main">⚔ Sit with the complexity</span>
    [[Be alone → |day1_alone_futa]]
  </div>
  <</if>>

</div>
```

---

## SCENE END HANDLERS — FUTA ROUTE

```html
:: day1_exam_futa [nobr]
/* === Paste futa exam prose === */

<<set $d1ft_exam to true>>
<<set $statWIS += 2>>
<<set $stress += 10>>
<<set $statFEM += 2>>
<<set $ilaraFamiliarity += 3>>
<<set $timeSlot to "AFTERNOON">>

<<completeObjective "exam_futa">>
<<addObjective "alone_futa" "Sit with the complexity" "MAIN">>
<<addObjective "smallclothes" "The clothing problem" "SIDE">>
<<addObjective "body_dual" "Both of you — notice things" "SIDE">>

<div class="scene-end">[[Continue → |day1_hub_futa]]</div>
```

```html
:: day1_alone_futa [nobr]
/* === Paste futa alone prose === */

<<set $d1ft_alone to true>>
<<set $statFEM += 1>>
<<set $stress -= 5>>
<<set $arousal += 15>>         // The feedback loop during alone time
<<set $timeSlot to "EVENING">>

<<completeObjective "alone_futa">>
<<addObjective "rowan_futa" "Wait for evening — the one person you can tell" "MAIN">>

<div class="scene-end">[[Continue → |day1_hub_futa]]</div>
```

```html
:: day1_rowan_futa [nobr]
/* === Paste futa Rowan prose === */

<<set $d1ft_rowan to true>>
<<set $stress -= 15>>
<<set $affRowan += 8>>          // +8 not +5 — acceptance of futa body is more significant
<<set $statRES += 2>>
<<set $timeSlot to "NIGHT">>

<<completeObjective "rowan_futa">>
<<addObjective "night_futa" "Try to sleep — the body will make it difficult" "MAIN">>

<div class="scene-end">[[Continue → |day1_hub_futa]]</div>
```

```html
:: day1_night_futa [nobr]
/* === Paste futa night prose === */

<<set $d1ft_night to true>>
<<set $statFEM += 1>>
<<set $energy to 25>>
<<set $arousal to 25>>         // Doesn't reset to 0 — elevated baseline is permanent in futa route

/* If player has the gold modulator and took it: */
<<if $dualArousalModulator>>
  <<set $arousal to 10>>       // Modulator reduces but doesn't eliminate
<</if>>

<div class="scene-end">
  [[Sleep — eventually → |day1f_sleep_transition]]
</div>
```

---

## FUTA-SPECIFIC: AROUSAL DISPLAY IN LEFT SIDEBAR

The arousal bar is VISIBLE from Day 1 in the futa route (vs hidden until later in the female route):

```javascript
// In updateSidebars() — modify arousal visibility check:
var arousalWrap = document.getElementById('arousal-bar-container');
if (arousalWrap) {
  // Futa: visible from Day 1. Female: visible from Day 7+
  if (sv.dualAnatomy) {
    arousalWrap.style.display = '';
  } else {
    arousalWrap.style.display = sv.dayNumber >= 7 ? '' : 'none';
  }
}
```

---

## FUTA-SPECIFIC: RIGHT SIDEBAR ADDITIONS

Add a concealment indicator to the right sidebar body stats block:

```html
<!-- Add to #body-stats in StoryInterface.tw -->
<div id="concealment-row" class="body-stat-row" style="display:none;">
  <span class="body-label">Concealment</span>
  <span id="bs-concealment" class="body-value"></span>
</div>
```

```javascript
// In updateSidebars():
var concRow = document.getElementById('concealment-row');
if (concRow) {
  concRow.style.display = sv.dualAnatomy ? '' : 'none';
  setTextById('bs-concealment',
    sv.concealmentDifficulty <= 20 ? 'Secure' :
    sv.concealmentDifficulty <= 50 ? 'Manageable' :
    sv.concealmentDifficulty <= 75 ? 'Risky' : 'Exposed');
}
```

---

## DAY 1 FUTA → DAY 2 TRANSITION

```html
:: day1f_sleep_transition

<<set $dayNumber to 2>>
<<set $dayLabel to "Both (still)">>
<<set $timeSlot to "MORNING">>
<<set $energy to 45>>
<<set $stress -= 5>>

/* Morning wood — futa-specific */
<<set $arousal to 30>>

<div class="day-transition">
  <h2>Night passes. You dream of being split in two.</h2>
  <p>One half male. One half female. Both reaching across a mirror. In the dream, they touch. Their fingers interlace. They merge back together.</p>
  <p>You wake with morning wood and morning wet. Both. As always now. Both.</p>
  <p class="transition-morning"><em>Day 2. The body is still here. All of it. So are you.</em></p>
  [[Dawn → |day2_hub_futa]]
</div>
```

---

## UPDATED FILE STRUCTURE — DAY 1 (BOTH ROUTES)

```
AELINDRA/
├── production/
│   └── day_1/
│       ├── day1_core_content_female.md
│       ├── day1_core_content_futa.md              ← THIS
│       ├── day1_supplementary_npc_female.md
│       ├── day1_supplementary_npc_futa.md          ← THIS
│       ├── day1_code_agent_prompt_female.md
│       └── day1_code_agent_prompt_futa.md          ← THIS
├── engine/
│   └── passages/
│       └── days/
│           └── day_1/
│               ├── day1_hub.tw                     ← Female route hub
│               ├── day1_hub_futa.tw                ← Futa route hub
│               ├── day1_exam.tw / day1_exam_futa.tw
│               ├── day1_alone.tw / day1_alone_futa.tw
│               ├── day1_rowan.tw / day1_rowan_futa.tw
│               ├── day1_night.tw / day1_night_futa.tw
│               ├── day1_sleep_transition.tw / day1f_sleep_transition.tw
│               └── npc/
│                   ├── female/                     ← Female NPC passages
│                   └── futa/                       ← Futa NPC passages
│                       ├── day1f_npc_items.tw
│                       ├── day1f_npc_smallclothes.tw
│                       ├── day1f_npc_queen_message.tw
│                       ├── day1f_npc_aldric_door.tw
│                       ├── day1f_npc_nara3.tw
│                       ├── day1f_npc_vael3.tw
│                       ├── day1f_npc_window.tw
│                       ├── day1f_npc_body.tw
│                       └── day1f_npc_marta_tray.tw
```

---

## QUALITY CHECKLIST — DAY 1 FUTA

- [ ] **Hub uses futa passage names** — all `_futa` suffixed
- [ ] **Arousal bar VISIBLE from Day 1** in futa route (not Day 7+)
- [ ] **Arousal starts at 25** — elevated baseline
- [ ] **Concealment row appears in right sidebar** body stats
- [ ] **"The Clothing Problem" zone** appears in hub after exam (futa-only)
- [ ] **Gold vial (dual-arousal modulator)** in Vael's prescription set
- [ ] **Nara encounter seeds the "she suspects" subplot** with futa-specific trust tracker
- [ ] **Queen's message carries different emotional weight** — she doesn't know about the cock
- [ ] **Aldric's door scene carries concealment anxiety** — "would you still say that if you knew?"
- [ ] **Night scene references feedback loop explicitly** — cock hard because pussy wet, loop
- [ ] **Gold modulator reduces arousal if taken** before sleep (conditional in night passage)
- [ ] **Day label is "Both"** not "Wrong" (different from female route)
- [ ] **Rowan affinity +8** (not +5) — acceptance of futa body is more significant
- [ ] **Loneliness stat activates** — futa-only hidden tracker
- [ ] **All prose is ORIGINAL** — not find-and-replace from female route
- [ ] **Day 2 transition references morning wood AND morning wet** — both systems active on wake
