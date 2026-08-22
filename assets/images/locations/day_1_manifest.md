# Day 1   Location Images

Same `<<locationImage>>` native macro as prior days. No new characters are
introduced on Day 1 (either route)   every NPC portrait reuses an existing
file (Aldric, Rowan, Ilara, Nara, Vael, Marta), so there's no
`npcs/day_1_manifest.md`; this is the only Day 1 art file.

## Female route

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_recovery_room.png` | day1_hub, day1_wake scene banner | A round tower room, walls of luminous white stone that hold a faint glow even in daylight. A simple bed with white linens, narrow arrow-slit windows letting in sunlight, a full-length polished silver mirror on one wall, a heavy oak door, a small bedside table. No decoration beyond function   this is a recovery room, not a bedroom. Atmosphere: clinical warmth, a space built for healing, four walls that have become the entire world. |

Day 1 stays inside this one room all day (the architecture is intentionally
claustrophobic   see the code prompt's own note) so this single image
covers the hub, the wake scene, and implicitly every sub-hub (door, window,
table) rather than needing separate art per zone.

## Futa route (v0.3)

Same recovery room (`moonspire_recovery_room.png`, reused, not duplicated)
covers the futa hub and sub-hubs the same way. The six entries below are
scene-anchor images specific to the futa route's emotional beats, each
wired to a single passage rather than the whole-day reuse above.

| Filename | Used by | Prompt |
|---|---|---|
| `day1ft_waking_both.png` | day1_wake_futa scene banner | A young woman sitting up in a white-stone tower bed, dark wavy hair cascading, staring down at her own body with an expression caught between relief and horror. One hand reaches between her legs   not sexual, possessive, confirming something survived. Small breasts visible through white nightgown. Morning light. Atmosphere: the discovery that something was preserved, relief wrapped in confusion, a body holding two truths. |
| `day1ft_mirror_dual.png` | day1_exam_futa scene banner | A young woman standing naked before a silver mirror. 5'6", dark wavy hair, grey-blue eyes, small breasts, narrow waist, wide hips, fully feminine from the waist up. Between her legs, the silhouette suggests dual anatomy   feminine curves alongside a visible male element. She stares at the reflection with an expression of stunned incomprehension. Behind her, a calm woman in Silverveil robes watches with controlled fascination. White stone room, enchanted candles. Atmosphere: seeing the impossible for the first time, a body that has no precedent, beauty that defies category. |
| `day1ft_rowan_paradox.png` | day1_rowan_futa scene banner | Two figures in a dim tower room. A half-elf bard with honey eyes sits cross-legged on the floor, lute in lap, looking up with an expression of tender recognition. On the bed above, a young woman in a white nightgown sits with knees drawn up, dark hair falling around her face, expression guarded but cracking toward trust. Candlelight. Warm shadows. Atmosphere: the first person to hear the truth, choosing fascination over judgment, a friend who understands between. |
| `day1ft_night_circuit.png` | day1_night_futa scene banner | A young woman lying on her back in a dim tower bed, eyes open, staring at the ceiling. White silk nightgown. Her body is rigid   controlled stillness. One hand grips the sheet. Her expression is the careful blankness of someone managing overwhelming sensation through force of will. Candlelight dying. Atmosphere: a body in dialogue with itself, arousal managed through discipline, the loneliness of being the only one. |
| `day1ft_smallclothes.png` | day1ft_npc_smallclothes | Close-up of modified linen undergarments laid on a bed   standard female smallclothes with a hastily added front pouch of gathered fabric. Beside them: a breast band. Behind: the blurred silhouette of a woman examining them with an expression of dismay and dark humour. White stone tower room. Atmosphere: the daily engineering problem of a body that doesn't fit any pattern, function over form, the first practical challenge of dual anatomy. |
| `day1ft_vials.png` | day1ft_npc_vael3 | A wooden case on a bedside table, open, containing five glass vials: blue, green, clear, amber, and a small vial of pale gold liquid that catches the light differently from the others. A red-haired woman's hand (Vael) points at the gold vial. Behind: a young woman on a bed, listening intently. Tower room, afternoon light. Atmosphere: medicine for a body no pharmacopoeia has ever addressed, the gold vial as the key to manageable nights. |
