# AELINDRA — Day 2 Code Agent Prompt (FUTANARI ROUTE)
## Palace Reopens | Concealment System Active
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day 2 Futa ("Two of Everything") uses the same expanded hub architecture as Day 2 Female — location grid, palace locations reopened. The KEY differences are mechanical:

1. **Concealment system is ACTIVE** — every location encounter tracks concealment
2. **Three-way masturbation choice** — the afternoon scene branches into Resist / Cock Only / Both
3. **Arousal bar visible and active** — dual arousal tracked visibly
4. **Queen's note has futa-specific content** — she knows about the cock
5. **Maren is an informed ally** — her relationship tracker is higher than female route

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day2_core_content_futa.md` | 6 main scenes + 3 branching options |
| `day2_supplementary_npc_futa.md` | 10 optional encounters |
| `day2_code_agent_prompt_female.md` | Base architecture — reuse CSS, hub structure |
| This file | Futa-specific logic, branching, concealment mechanics |

---

## NEW VARIABLES — DAY 2 FUTA

```javascript
<<set $dayNumber to 2>>
<<set $dayLabel to "Two of Everything">>
<<set $timeSlot to "MORNING">>
<<set $energy to 65>>

// Body
<<set $mcBust to "B cup">>
<<set $mcBreastSize to "B">>

// Scene flags
<<set $d2ft_wake to true>>
<<set $d2ft_bridge to false>>
<<set $d2ft_chambers to false>>
<<set $d2ft_discovery to false>>
<<set $d2ft_discovery_choice to "none">>   // "resist", "cock", "both"
<<set $d2ft_rowan to false>>
<<set $d2ft_night to false>>

// NPC flags
<<set $d2ft_npc_nara to false>>
<<set $d2ft_npc_pageboy to false>>
<<set $d2ft_npc_harwick to false>>
<<set $d2ft_npc_caedric to false>>
<<set $d2ft_npc_marta to false>>
<<set $d2ft_npc_maren to false>>
<<set $d2ft_npc_queen_note to false>>
<<set $d2ft_npc_perrin to false>>
<<set $d2ft_npc_wynn to false>>
<<set $d2ft_npc_garden_test to false>>

// Concealment
<<set $concealmentConfidence to 0>>

// Achievement
<<set $dualOrgasmDiscovered to false>>

// Seamstress
<<set $taelaEncountered to false>>
<<set $customGarmentsOrdered to true>>
```

---

## THE THREE-WAY CHOICE — CRITICAL IMPLEMENTATION

The afternoon discovery scene presents THREE options. This is the most significant branching moment in Day 2 Futa. Each option produces DIFFERENT stat outcomes and DIFFERENT narrative consequences for Days 3+.

### Hub Integration

The choice appears as the main afternoon objective:

```html
<<if $d2ft_chambers and not $d2ft_discovery and $timeSlot is "AFTERNOON">>
<div class="loc-card">
  <h3>🔥 Your Chambers — Locked Door</h3>
  <p class="loc-flavor">The body demands. The dual arousal has been building all day. Behind a locked door, alone, you have a decision.</p>
  <span class="badge main">⚔ The body won't wait</span>
  [[Enter → |day2_discovery_futa]]
</div>
<</if>>
```

### Choice Passage

```html
:: day2_discovery_futa [nobr]
/* === Intro prose — arousal description === */

<div class="choice-cards triple-choice">
  <div class="interaction-card">
    <h4>🧊 Resist</h4>
    <p>Cold water. Reports. Force it down. The body can wait. You are not its servant.</p>
    <<link "Deny">>
      <<set $d2ft_discovery to true>>
      <<set $d2ft_discovery_choice to "resist">>
      <<goto "day2_resist_futa">>
    <</link>>
  </div>

  <div class="interaction-card">
    <h4>🔥 The Cock — Familiar Ground</h4>
    <p>The grip you've known for seven years. The stroke. The build. The release. The one thing you know how to do in this body.</p>
    <<link "The familiar">>
      <<set $d2ft_discovery to true>>
      <<set $d2ft_discovery_choice to "cock">>
      <<goto "day2_cock_futa">>
    <</link>>
  </div>

  <div class="interaction-card">
    <h4>⚡ Both — Everything at Once</h4>
    <p>One hand on the cock. One hand on the clit. Both systems at once. You don't know what happens. The body might.</p>
    <<link "The discovery">>
      <<set $d2ft_discovery to true>>
      <<set $d2ft_discovery_choice to "both">>
      <<goto "day2_both_futa">>
    <</link>>
  </div>
</div>
```

### Stat Outcomes by Choice

```html
:: day2_resist_futa [nobr]
/* === Resist prose === */
<<set $statRES += 3>>
<<set $arousal to 40>>
<<set $stress += 5>>
<<set $timeSlot to "EVENING">>
<div class="scene-end">[[Continue → |day2_hub_futa]]</div>

:: day2_cock_futa [nobr]
/* === Cock-only prose === */
<<set $statFEM += 2>>
<<set $statALL += 2>>
<<set $arousal to 30>>
<<set $stress -= 10>>
<<set $timeSlot to "EVENING">>
<div class="scene-end">[[Continue → |day2_hub_futa]]</div>

:: day2_both_futa [nobr]
/* === Both prose === */
<<set $statFEM += 5>>
<<set $statALL += 4>>
<<set $corruption += 2>>
<<set $arousal to 0>>
<<set $stress -= 25>>
<<set $dualOrgasmDiscovered to true>>
<<set $timeSlot to "EVENING">>
<div class="scene-end">[[Continue → |day2_hub_futa]]</div>
```

### CSS for Triple Choice

```css
.triple-choice {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .triple-choice {
    grid-template-columns: 1fr;
  }
}
```

---

## CONCEALMENT UI — RIGHT SIDEBAR

The concealment indicator should update based on daily encounters:

```javascript
// In updateSidebars():
if (sv.dualAnatomy) {
  var concLevel = sv.concealmentDifficulty - sv.concealmentSkill;
  var concText = concLevel <= 10 ? 'Secure' :
                 concLevel <= 30 ? 'Manageable' :
                 concLevel <= 50 ? 'Risky' : 'Exposed';
  setTextById('bs-concealment', concText);

  // Confidence sub-text
  if (sv.concealmentConfidence >= 5) {
    setTextById('bs-concealment', concText + ' ✓');
  }
}
```

---

## HUB — DAY 2 FUTA

Uses the same location-grid layout as female route but with futa passage names and the addition of the "Locked Door" afternoon card.

```html
:: day2_hub_futa

<div class="hub-header">
  <h2><<if $timeSlot is "MORNING">>Moonspire Tower<<else>>Crown's Rest<</if>> — Day 2: Two of Everything</h2>
  <p class="time-display"><<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>> | Arousal: <<print $arousal>></p>
</div>

<<include "objectivePanel">>

<div class="location-grid">

/* Morning: Tower + Bridge (same as female) */
<<if $timeSlot is "MORNING">>
  /* Tower card with Nara farewell */
  /* Bridge card */
<</if>>

/* Post-bridge: Palace locations */
<<if $d2ft_bridge>>

  /* Chambers — with wardrobe + discovery */
  <div class="loc-card">
    <h3>🛏 Your Chambers</h3>
    <p class="loc-flavor">The wardrobe. The concealment problem. The seamstress. And later — the locked door.</p>
    <<if not $d2ft_chambers>>
      <span class="badge main">⚔ Old wardrobe, new problem</span>
    <</if>>
    <<if $d2ft_chambers and not $d2ft_discovery and $timeSlot is "AFTERNOON">>
      <span class="badge main">⚔ The body demands — locked door</span>
    <</if>>
    <<if $d2ft_discovery and not $d2ft_npc_maren>>
      <span class="badge side">🗡 Maren — the informed professional</span>
    <</if>>
    <<if $timeSlot is "EVENING" and not $d2ft_npc_queen_note>>
      <span class="badge side">🗡 A note — she knows</span>
    <</if>>
    <<if $timeSlot is "NIGHT" and $d2ft_rowan and not $d2ft_night>>
      <span class="badge main">⚔ Sleep — holding on</span>
    <</if>>
    [[Enter → |day2f_chambers_hub]]
  </div>

  /* Corridors */
  <div class="loc-card">
    <h3>🏛 Corridors</h3>
    <p class="loc-flavor">Every glance is a question: can they see?</p>
    <<if not $d2ft_npc_harwick>>
      <span class="badge side">🗡 Perfumed ambush — Council presentation</span>
    <</if>>
    <<if $d2_npc_caedric and not $d2ft_npc_caedric>>
      <span class="badge side">🗡 "There she is" — does the bench know?</span>
    <</if>>
    [[Explore → |day2f_corridors]]
  </div>

  /* Gardens */
  <<if $d2ft_chambers>>
  <div class="loc-card">
    <h3>🌿 Gardens</h3>
    <p class="loc-flavor">The bench. The cat. The concealment test.</p>
    <<if not $d2ft_npc_garden_test>>
      <span class="badge side">🗡 Walk the paths — does anyone see?</span>
    <</if>>
    <<if $d2_npc_wynn and not $d2ft_npc_wynn>>
      <span class="badge side">🗡 The sideways branch</span>
    <</if>>
    [[Enter → |day2f_gardens_hub]]
  </div>
  <</if>>

  /* Kitchens */
  <<if $d2_npc_marta>>
  <div class="loc-card">
    <h3>🍞 Kitchens</h3>
    <p class="loc-flavor">Same stool. Same Marta. If she knew about the cock, she'd make it a sandwich.</p>
    <<if not $d2ft_npc_marta>>
      <span class="badge side">🗡 The stool doesn't check between your legs</span>
    <</if>>
    [[Enter → |day2f_kitchen]]
  </div>
  <</if>>

<</if>>

</div>
```

---

## DAY 2 FUTA → DAY 3 TRANSITION

```html
:: day2f_sleep_transition

<<set $dayNumber to 3>>
<<set $dayLabel to "Learning (Both)">>
<<set $timeSlot to "MORNING">>
<<set $energy to 60>>

/* Morning arousal — futa baseline */
<<set $arousal to 25>>

/* Body update */
<<set $mcPortrait to "aelindra_futa_day3">>

/* Choice consequences carry forward */
<<if $d2ft_discovery_choice is "resist">>
  <<set $arousal to 45>>  /* Banked arousal from yesterday spikes */
  <<set $stress += 5>>
<<elseif $d2ft_discovery_choice is "both">>
  <<set $arousal to 15>>  /* Post-discovery baseline lower */
<</if>>

<div class="day-transition">
  <h2>Night passes. You sleep holding on.</h2>
  <p>The cock warm in your hand. The vulva warm against silk. The breasts rising and falling. Three systems at rest.</p>
  <<if $d2ft_discovery_choice is "both">>
    <p>You dream of light — two colours merging. Silver and gold. The sound they make is your own voice, screaming in pleasure.</p>
  <<elseif $d2ft_discovery_choice is "cock">>
    <p>You dream of the old body and the new. One hand familiar, the other unknown. The dream doesn't resolve.</p>
  <<else>>
    <p>You dream of pressure — building, denied, persistent. The body remembers what you refused it.</p>
  <</if>>
  <p class="transition-morning"><em>Day 3. The Queen visits today. She knows what you are. All of it.</em></p>
  [[Dawn → |day3_hub_futa]]
</div>
```

---

## FILE STRUCTURE — DAY 2 FUTA

```
AELINDRA/
├── production/
│   └── day_2/
│       ├── day2_core_content_female.md
│       ├── day2_core_content_futa.md           ← THIS
│       ├── day2_supplementary_npc_female.md
│       ├── day2_supplementary_npc_futa.md      ← THIS
│       ├── day2_code_agent_prompt_female.md
│       └── day2_code_agent_prompt_futa.md      ← THIS
├── engine/
│   └── passages/
│       └── days/
│           └── day_2/
│               └── futa/
│                   ├── day2_hub_futa.tw
│                   ├── day2f_bridge.tw
│                   ├── day2f_chambers.tw
│                   ├── day2f_chambers_hub.tw
│                   ├── day2_discovery_futa.tw   ← Choice passage
│                   ├── day2_resist_futa.tw      ← Branch A
│                   ├── day2_cock_futa.tw        ← Branch B
│                   ├── day2_both_futa.tw        ← Branch C
│                   ├── day2f_rowan.tw
│                   ├── day2f_night.tw
│                   ├── day2f_corridors.tw
│                   ├── day2f_gardens_hub.tw
│                   ├── day2f_kitchen.tw
│                   ├── day2f_sleep_transition.tw
│                   └── npc/
│                       ├── day2f_npc_nara.tw
│                       ├── day2f_npc_harwick.tw
│                       ├── day2f_npc_caedric.tw
│                       ├── day2f_npc_marta.tw
│                       ├── day2f_npc_maren.tw
│                       ├── day2f_npc_queen_note.tw
│                       ├── day2f_npc_perrin.tw
│                       ├── day2f_npc_wynn.tw
│                       └── day2f_npc_garden_test.tw
```

---

## QUALITY CHECKLIST — DAY 2 FUTA

- [ ] **Three-way choice renders as grid** (triple-choice CSS)
- [ ] **Each choice sets `$d2ft_discovery_choice`** to different string
- [ ] **Stat outcomes differ significantly** between the three branches
- [ ] **"Both" branch sets `$dualOrgasmDiscovered = true`** — flags for future content
- [ ] **Day 3 transition references the choice** — different dream text per branch
- [ ] **Resist path banks arousal** — Day 3 morning arousal is 45 instead of 25
- [ ] **Concealment confidence updates** from garden test encounter
- [ ] **Arousal bar visible throughout** — reflects current state
- [ ] **Queen's note has futa-specific text** — "architectural detail," father's stubbornness
- [ ] **Maren familiarity +5** (vs +3 in female route) — informed ally bond
- [ ] **Nara trust +5** — dual-frequency ally confirmed
- [ ] **Harwick encounter seeds Council anxiety** — Day 7 presentation
- [ ] **Cock is always 7 inches** in all prose references
- [ ] **Seamstress Taela** — new NPC introduced, measured cock + bra
- [ ] **All NPC encounters filtered through concealment** — secondary layer present
