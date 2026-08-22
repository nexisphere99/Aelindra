# AELINDRA   Day 0 Code Agent Prompt
## Open-World Hub → Point of No Return → Linear Ritual Sequence
### SugarCube 2.37+ | Twine Implementation

---

## OVERVIEW

Day 0 ("The Rite") has a **split architecture**: the morning is open-world exploration (farewell encounters), then crossing the bridge LOCKS the hub and triggers a linear sequence (bridge → path choice → ritual → void → Day 1). This is the first time the open-world closes mid-day, and the player must be warned clearly.

**CRITICAL DESIGN PATTERN:** The bridge objective is ALWAYS visible from the start of Day 0 but marked with a warning. The player chooses when to cross. All side encounters are available only BEFORE crossing. This creates a natural "say your goodbyes" mechanic   the player knows the clock is ticking and explores accordingly.

---

## FILE DEPENDENCIES

| File | Purpose |
|---|---|
| `day0_core_content.md` | 5 main scenes + void transition |
| `day0_supplementary_npc.md` | 11 optional NPC encounters (morning only) |
| This file | Integration logic, hub, path choice UI, point-of-no-return gate |

---

## NEW VARIABLES   DAY 0

```javascript
// ===== DAY 0 INIT   Set in Day -1 sleep transition =====

<<set $dayNumber to 0>>
<<set $dayLabel to "The Rite">>
<<set $timeSlot to "MORNING">>
<<set $energy to 60>>
<<set $stress += 10>>

// --- Day 0 Scene Flags ---
<<set $d0_wake to true>>              // Auto-true   waking is the transition
<<set $d0_queen to false>>            // Queen goodbye
<<set $d0_bridge to false>>           // Crossed the bridge (POINT OF NO RETURN)
<<set $d0_pathChosen to false>>       // Path selection made
<<set $d0_ritual to false>>           // Ritual completed
<<set $d0_void to false>>             // Unconscious transition

// --- Day 0 NPC Flags ---
<<set $d0_npc_brin to false>>
<<set $d0_npc_sword to false>>
<<set $d0_npc_caedric to false>>
<<set $d0_npc_maids2 to false>>
<<set $d0_npc_aldric_gift to false>>
<<set $d0_npc_marta3 to false>>
<<set $d0_npc_haeth to false>>
<<set $d0_npc_wynn3 to false>>
<<set $d0_npc_alva3 to false>>
<<set $d0_npc_nara2 to false>>
<<set $d0_npc_vael2 to false>>

// --- Items ---
<<set $hasAldricSword to false>>
<<set $hasMoonflower to false>>
<<set $hasJasmine to false>>
<<set $hasGingerRoot to false>>
<<set $hasHandkerchief to false>>
<<set $hasAldricLetter to false>>

// --- Bridge Warning Seen ---
<<set $bridgeWarningAcknowledged to false>>
```

---

## TIME SYSTEM   DAY 0

Day 0 has only TWO effective time slots:

```
MORNING (open-world) → Player explores, says goodbyes
MIDDAY+ (linear)     → Bridge → Path Choice → Ritual → Void
```

**Time does NOT advance from side encounters.** The player stays in MORNING for the entire explorable period. Time only advances when the player enters `day0_bridge`.

---

## OBJECTIVE FLOW   DAY 0

```
[MORNING   On Wake / Transition In]
  MAIN: "When you're ready   cross the bridge to the Moonspire Tower" ⚠
  MAIN: "Say goodbye   the Queen's Chambers"
  SIDE: "Your chambers   one last look"
  SIDE: "The corridors   familiar faces"
  SIDE: "The Training Yard   empty, but something was left for you"
  SIDE: "The Kitchens   Marta has been baking since midnight"
  SIDE: "The Grand Library   Haeth is waiting"
  SIDE: "The Royal Gardens   the jasmine survived"
  SIDE: "Below Stairs   Alva has a report"
  SIDE: "The Moonspire   preparations underway"

[AFTER CROSSING BRIDGE]
  All objectives clear
  MAIN: "The Rite begins" (auto-advances through linear sequence)
```

---

## LOCATION HUB   DAY 0

### Hub Passage: `day0_hub`

```html
:: day0_hub

<div class="hub-header">
  <h2>Crown's Rest   Day 0: The Rite</h2>
  <p class="time-display"><<print $timeSlot>></p>
  <p class="energy-display">Energy: <<print $energy>> | Stress: <<print $stress>></p>
</div>

<<include "objectivePanel">>

<div class="location-grid">

/* ========== THE BRIDGE   POINT OF NO RETURN ========== */
<div class="loc-card loc-final">
  <h3>🌙 The Bridge   Moonspire Tower</h3>
  <p class="loc-flavor">The covered bridge. Thirty paces between who you are and who you're about to become. Rowan is waiting at the near end.</p>
  <span class="badge main">⚔ Cross the Bridge   When You're Ready</span>
  <p class="loc-warning">⚠ <em>Once you cross, you cannot return. Complete any remaining business first.</em></p>
  <<link "Cross the Bridge">>
    <<if not $bridgeWarningAcknowledged>>
      <<goto "day0_bridge_confirm">>
    <<else>>
      <<goto "day0_bridge">>
    <</if>>
  <</link>>
</div>

/* ========== EDRIN'S CHAMBERS ========== */
<div class="loc-card">
  <h3>🛏 Edrin's Chambers</h3>
  <p class="loc-flavor">Your room. For the last time as this person.</p>
  <<if not $d0_npc_brin>>
    <span class="badge side">🗡 Brin brought breakfast</span>
  <</if>>
  <<if not $d0_npc_sword>>
    <span class="badge side">🗡 The training sword on the wall</span>
  <</if>>
  [[Enter → |day0_chambers]]
</div>

/* ========== QUEEN'S CHAMBERS ========== */
<<if not $d0_queen>>
<div class="loc-card">
  <h3>👑 Queen's Chambers</h3>
  <p class="loc-flavor">She's waiting. She didn't know if you'd come. She hoped.</p>
  <span class="badge main">⚔ Say goodbye   as a son</span>
  [[Enter → |day0_queen]]
</div>
<</if>>

/* ========== CORRIDORS ========== */
<div class="loc-card">
  <h3>🏛 Palace Corridors</h3>
  <p class="loc-flavor">Portraits of queens. The smell of stone and centuries.</p>
  <<if $d2_npc_caedric and not $d0_npc_caedric>>
    <span class="badge side">🗡 Ser Caedric on his bench</span>
  <</if>>
  <<if not $d0_npc_maids2>>
    <span class="badge side">🗡 Senior staff near the east wing</span>
  <</if>>
  [[Explore → |day0_corridors]]
</div>

/* ========== TRAINING YARD ========== */
<div class="loc-card">
  <h3>⚔ Training Yard</h3>
  <p class="loc-flavor">Empty this morning. But something was left on the weapon rack.</p>
  <<if not $d0_npc_aldric_gift>>
    <span class="badge side">🗡 Something new on the rack</span>
  <</if>>
  [[Enter → |day0_training]]
</div>

/* ========== KITCHENS ========== */
<<if $d2_npc_marta>>
<div class="loc-card">
  <h3>🍞 Palace Kitchens</h3>
  <p class="loc-flavor">Every surface covered. She's been baking since midnight.</p>
  <<if not $d0_npc_marta3>>
    <span class="badge side">🗡 Marta made your favourite</span>
  <</if>>
  [[Enter → |day0_kitchen]]
</div>
<</if>>

/* ========== LIBRARY ========== */
<div class="loc-card">
  <h3>📚 Grand Library</h3>
  <p class="loc-flavor">Empty. Dawn light. The constellations turn in silence. Haeth is at his desk.</p>
  <<if not $d0_npc_haeth>>
    <span class="badge side">🗡 The librarian is waiting</span>
  <</if>>
  [[Enter → |day0_library]]
</div>

/* ========== GARDENS ========== */
<<if $d2_npc_wynn>>
<div class="loc-card">
  <h3>🌿 Royal Gardens</h3>
  <p class="loc-flavor">Morning light. The jasmine has been uncovered. New growth.</p>
  <<if not $d0_npc_wynn3>>
    <span class="badge side">🗡 Old Wynn by the jasmine</span>
  <</if>>
  [[Enter → |day0_gardens]]
</div>
<</if>>

/* ========== SERVANT QUARTERS ========== */
<<if $d2_npc_alva>>
<div class="loc-card">
  <h3>🔑 Servant Quarters</h3>
  <p class="loc-flavor">Alva is standing at her desk. Not sitting. Standing.</p>
  <<if not $d0_npc_alva3>>
    <span class="badge side">🗡 "I have a report"</span>
  <</if>>
  [[Enter → |day0_servants]]
</div>
<</if>>

/* ========== MOONSPIRE TOWER (PRE-BRIDGE) ========== */
<div class="loc-card loc-new">
  <h3>🌙 Moonspire Tower   Lower Levels</h3>
  <p class="loc-flavor">Accessible via the service stair, not the bridge. The preparations are underway.</p>
  <<if $d1_npc_nara and not $d0_npc_nara2>>
    <span class="badge side">🗡 Nara on the stairs, carrying candles</span>
  <</if>>
  <<if not $d0_npc_vael2>>
    <span class="badge side">🗡 The Apothecary   the potion is ready</span>
  <</if>>
  [[Enter → |day0_moonspire_lower]]
</div>

</div>
```

---

## BRIDGE CONFIRMATION   POINT OF NO RETURN

```html
:: day0_bridge_confirm

<div class="bridge-confirm">
  <h2>⚠ Point of No Return</h2>
  <p>Once you cross the bridge, the Rite will begin. You will not be able to return to the palace until it's over.</p>
  <p>Any encounters you haven't completed will be unavailable.</p>

  <div class="confirm-checklist">
    <h4>Farewells</h4>
    <ul>
      <li class="<<if $d0_queen>>done<<else>>pending<</if>>">Queen Seraphina <<if $d0_queen>>✓<<else>> <</if>></li>
      <li class="<<if $d0_npc_caedric>>done<<else>>pending<</if>>">Ser Caedric <<if $d0_npc_caedric>>✓<<else>> <</if>></li>
      <li class="<<if $d0_npc_marta3>>done<<else>>pending<</if>>">Head Cook Marta <<if $d0_npc_marta3>>✓<<else>> <</if>></li>
      <li class="<<if $d0_npc_aldric_gift>>done<<else>>pending<</if>>">Aldric's gift <<if $d0_npc_aldric_gift>>✓<<else>> <</if>></li>
      <li class="<<if $d0_npc_haeth>>done<<else>>pending<</if>>">Librarian Haeth <<if $d0_npc_haeth>>✓<<else>> <</if>></li>
      <li class="<<if $d0_npc_wynn3>>done<<else>>pending<</if>>">Old Wynn <<if $d0_npc_wynn3>>✓<<else>> <</if>></li>
    </ul>
  </div>

  <div class="confirm-buttons">
    <<link "I'm ready. Cross the bridge.">>
      <<set $bridgeWarningAcknowledged to true>>
      <<goto "day0_bridge">>
    <</link>>

    <<link "Not yet. Go back.">>
      <<goto "day0_hub">>
    <</link>>
  </div>
</div>
```

**CSS for confirmation:**

```css
.bridge-confirm {
  text-align: center;
  padding: 40px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.bridge-confirm h2 {
  color: var(--red-bright);
}

.confirm-checklist {
  text-align: left;
  background: var(--bg-card);
  border: 1px solid var(--border-stone);
  border-radius: var(--border-radius);
  padding: 16px 20px;
  margin: 20px 0;
}

.confirm-checklist li {
  padding: 4px 0;
  font-size: 0.9rem;
}

.confirm-checklist li.done {
  color: var(--gold);
}

.confirm-checklist li.pending {
  color: var(--text-faint);
}

.confirm-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.confirm-buttons a {
  padding: 10px 24px;
  border: 1px solid var(--border-stone);
  border-radius: var(--border-radius);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.loc-final {
  border: 1px solid var(--red);
  background: rgba(139, 45, 45, 0.08);
}

.loc-final:hover {
  border-color: var(--red-bright);
  box-shadow: 0 0 12px rgba(179, 58, 58, 0.15);
}

.loc-warning {
  font-size: 0.8rem;
  color: var(--red-bright);
  margin-top: 8px;
}
```

---

## LINEAR SEQUENCE   POST-BRIDGE

Once `day0_bridge` is entered, the game becomes linear:

```
day0_bridge → day0_path_choice → day0_ritual_female (or _futa) → day0_void → day1_hub
```

### Path Choice Passage

```html
:: day0_path_choice

/* === Prose from core content   Scene 3.5 === */

<div class="path-choice-ritual">
  <h2>The Rite Has Two Forms</h2>
  <p>Ilara's voice is formal. Clinical. The voice of the Archsorceress.</p>

  <div class="path-cards">
    <div class="path-card">
      <h3>🌙 Complete Transformation</h3>
      <p>Every aspect changed. Total biological conversion. Female in every sense.</p>
      <<link "\"Complete. All of it.\"">>
        <<set $gamePath to "female">>
        <<set $d0_pathChosen to true>>
        <<goto "day0_ritual_female">>
      <</link>>
    </div>

    <div class="path-card">
      <h3>⚔ Partial Transformation</h3>
      <p>Female body, but certain male aspects remain alongside the new. Something unprecedented.</p>
      <<link "\"Both. I want to be... both.\"">>
        <<set $gamePath to "futa">>
        <<set $d0_pathChosen to true>>
        <<goto "day0_ritual_futa">>
      <</link>>
    </div>
  </div>
</div>
```

**NOTE:** If the player already chose a path on the title screen (`path-select.tw`), skip this passage and go directly to the appropriate ritual scene. Check `$gamePath !== "none"`:

```html
:: day0_bridge [nobr]
/* === Bridge prose from core content === */

<<set $d0_bridge to true>>
<<set $timeSlot to "MIDDAY">>
<<clearObjectives>>

/* After bridge prose: */
<<if $gamePath is "none">>
  /* Player didn't choose on title screen   choose now */
  <div class="scene-end">[[Continue → |day0_path_choice]]</div>
<<elseif $gamePath is "female">>
  <div class="scene-end">[[Continue → |day0_ritual_female]]</div>
<<else>>
  <div class="scene-end">[[Continue → |day0_ritual_futa]]</div>
<</if>>
```

### Ritual End → Void → Day 1

```html
:: day0_ritual_female [nobr]
/* === Full ritual prose from core content === */

<<set $d0_ritual to true>>
<<set $statRES += 5>>
<<set $stress to 80>>
<<set $energy to 0>>
<<set $ilaraFamiliarity += 3>>
<<set $riteKnowledge += 5>>

<div class="scene-end">
  [[Darkness. → |day0_void]]
</div>
```

```html
:: day0_void [nobr]
/* === Void prose from core content === */

<<set $d0_void to true>>

/* === PRE-SET DAY 1 VARIABLES === */
<<set $mcName to "Aelindra">>
<<set $mcTitle to "Princess of Aethermere">>
<<set $mcHeight to "5'6\"">>
<<set $mcBust to "A-B cup">>
<<set $mcWaist to "26\"">>
<<set $mcHips to "34\"">>
<<set $mcSensitivity to "Extreme (new body)">>
<<set $mcBreastSize to "A-B">>
<<set $mcPortrait to "aelindra_day1">>
<<set $bodyStatusVisible to true>>

<div class="day-transition">
  <p>The darkness holds. The heartbeat strengthens. Light gathers at the edges.</p>
  <p class="transition-morning"><em>Tomorrow, someone new opens her eyes.</em></p>
  [[Wake → |day1_hub]]
</div>
```

---

## MC PORTRAIT UPDATE   DAY 0

The right sidebar portrait should update during Day 0:

| Moment | Portrait |
|---|---|
| Morning hub (pre-bridge) | `edrin_stressed` (stress is high) |
| Bridge passage | `edrin_default` (last look) |
| Ritual | No portrait visible (or abstract silhouette) |
| Void → Day 1 | `aelindra_day1` |

Add portrait-hide logic for ritual passage:

```javascript
// In day0_ritual_female passage, add:
<<run document.getElementById('mc-portrait-frame').style.opacity = '0.3'>>
<<run document.getElementById('mc-name').textContent = '...'>>
<<run document.getElementById('mc-title').textContent = 'Transforming'>>
```

---

## UPDATED FILE STRUCTURE

```
AELINDRA/
├── production/
│   ├── day_minus_2/
│   ├── day_minus_1/
│   └── day_0/                                ← NEW
│       ├── day0_core_content.md              ← Core scenes (shared + female path)
│       ├── day0_core_content_futa.md         ← (FUTURE   futa ritual variant)
│       ├── day0_supplementary_npc.md         ← Morning encounters
│       └── day0_code_agent_prompt.md         ← This file
├── engine/
│   └── passages/
│       ├── day0_hub.tw                       ← Morning hub
│       ├── day0_chambers.tw                  ← Chambers sub-hub
│       ├── day0_queen.tw                     ← Queen goodbye
│       ├── day0_corridors.tw                 ← Corridors sub-hub
│       ├── day0_training.tw                  ← Training yard sub-hub
│       ├── day0_kitchen.tw                   ← Kitchen sub-hub
│       ├── day0_library.tw                   ← Library sub-hub
│       ├── day0_gardens.tw                   ← Gardens sub-hub
│       ├── day0_servants.tw                  ← Servants sub-hub
│       ├── day0_moonspire_lower.tw           ← Moonspire pre-bridge sub-hub
│       ├── day0_bridge_confirm.tw            ← Point of no return confirmation
│       ├── day0_bridge.tw                    ← Bridge scene (LINEAR from here)
│       ├── day0_path_choice.tw               ← Path selection (if not pre-selected)
│       ├── day0_ritual_female.tw             ← Full female ritual scene
│       ├── day0_ritual_futa.tw               ← (FUTURE   futa ritual)
│       ├── day0_void.tw                      ← Unconscious transition → Day 1
│       └── npc/
│           ├── day0_npc_brin.tw
│           ├── day0_npc_sword.tw
│           ├── day0_npc_caedric.tw
│           ├── day0_npc_maids2.tw
│           ├── day0_npc_aldric_gift.tw
│           ├── day0_npc_marta3.tw
│           ├── day0_npc_haeth.tw
│           ├── day0_npc_wynn3.tw
│           ├── day0_npc_alva3.tw
│           ├── day0_npc_nara2.tw
│           └── day0_npc_vael2.tw
```

---

## CONTINUITY GATES   DAY 0

| Day 0 NPC | Requires |
|---|---|
| `d0_npc_caedric` | `d2_npc_caedric = true` |
| `d0_npc_marta3` | `d2_npc_marta = true` |
| `d0_npc_wynn3` | `d2_npc_wynn = true` |
| `d0_npc_alva3` | `d2_npc_alva = true` |
| `d0_npc_nara2` | `d1_npc_nara = true` |
| `d0_npc_brin` | No gate (always available) |
| `d0_npc_aldric_gift` | No gate (always available) |
| `d0_npc_haeth` | No gate (always available) |
| `d0_npc_vael2` | No gate (always available) |

Players who explored more on Days -2 and -1 get MORE farewell encounters on Day 0. This rewards exploration and creates emotional payoff   the NPCs you invested time in are the ones who say goodbye.

---

## QUALITY CHECKLIST   DAY 0

- [ ] **Bridge card renders with red border and warning text**
- [ ] **Bridge confirmation passage shows farewell checklist**
- [ ] **Crossing bridge LOCKS all other locations**   hub is inaccessible after
- [ ] **Path choice only appears if `$gamePath` is still "none"** (skip if pre-selected)
- [ ] **Ritual passage dims the MC portrait and changes name to "..."**
- [ ] **Void passage sets ALL Day 1 body variables** (name, title, height, bust, etc.)
- [ ] **Void passage sets `$bodyStatusVisible to true`**   right sidebar body stats appear on Day 1
- [ ] **Portrait updates to `aelindra_day1` on Day 1 transition**
- [ ] **All 11 NPC encounters available ONLY in morning before bridge**
- [ ] **Continuity-gated NPCs only appear if player met them on Days -2/-1**
- [ ] **Items collected (moonflower, jasmine, ginger, letter, handkerchief) persist into Day 1**
- [ ] **Queen goodbye scene is MAIN objective but not required**   player can cross bridge without it (emotional consequence, not mechanical gate)
- [ ] **Stress and energy values carry correctly into ritual**
- [ ] **Post-ritual stats: RES +5, Stress → 80, Energy → 0**
- [ ] **Day 1 hub loads correctly from void transition**

---

## IMPLEMENTATION ORDER

1. Add Day 0 variables to Day -1 sleep transition
2. Build `day0_hub` with the red-bordered bridge card and farewell locations
3. Build `day0_bridge_confirm`   the point-of-no-return checklist
4. Build all sub-hubs (chambers, corridors, training, kitchen, library, gardens, servants, moonspire-lower)
5. Paste core content into main scene passages (queen, bridge, path choice, ritual, void)
6. Paste NPC content into 11 NPC passages
7. Wire the linear sequence: bridge → path choice → ritual → void → Day 1
8. Wire portrait updates (stressed Edrin → dim during ritual → Aelindra on Day 1)
9. Wire body stat variables in void passage
10. Test: full Day 0 loop including confirmation screen and linear lock-out
