# Day 1   Location Images

Same `<<locationImage>>` native macro as prior days. No new characters are
introduced on Day 1 (either route)   every NPC portrait reuses an existing
file (Aldric, Rowan, Ilara, Nara, Vael, Marta), so there's no
`npcs/day_1_manifest.md`; this is the only Day 1 art file.

## Female route

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_recovery_room.png` | day1_hub, and every sub-hub (door, window, table) | A round tower room, walls of luminous white stone that hold a faint glow even in daylight. A simple bed with white linens, narrow arrow-slit windows letting in sunlight, a full-length polished silver mirror on one wall, a heavy oak door, a small bedside table. No decoration beyond function   this is a recovery room, not a bedroom. Atmosphere: clinical warmth, a space built for healing, four walls that have become the entire world. |

Day 1 stays inside this one room all day (the architecture is intentionally
claustrophobic   see the code prompt's own note), so the room image above
covers the hub and every sub-hub. The images below   the four scenes both
routes share (waking, the mirror, Rowan's visit, the first night) plus
Vael's prescriptions   each get their own dedicated scene banner, matching
the futa route's set. `day1f_clothes` is the one addition without a futa
equivalent: the female route has no concealment-problem scene to match
the futa smallclothes image, but day1_exam.tw does have its own parallel
beat   getting dressed in clothes that no longer fit   so that gets an
inline mid-scene image instead of a passage-top banner.
covers the hub and every sub-hub. The scenes below each get their own
dedicated scene banner instead.

| Filename | Used by | Prompt |
|---|---|---|
| `day1f_waking.png` | day1_wake scene banner | A young woman sitting up in a white-stone tower bed, dark wavy hair cascading over her shoulders, staring down at her own hands with an expression of dawning disorientation. The nightgown drapes over a body clearly different from the one that lay down the night before. Morning light through a narrow window. Atmosphere: the first minutes of a body that isn't the one you fell asleep in, shock too total for tears yet. |
| `day1f_mirror.png` | day1_exam scene banner | A young woman standing naked before a tall silver mirror. 5'6", dark wavy hair, grey-blue eyes, small breasts, narrow waist, flared hips   fully, unambiguously feminine. Her expression is caught between an involuntary, unwanted awe and outright refusal. Behind her, a composed woman in Silverveil robes watches with quiet, careful attention. White stone room, steady candlelight. Atmosphere: the first full look, beauty she didn't ask for, the argument between "that's not me" and "that is." |
| `day1f_rowan.png` | day1_rowan scene banner | Two figures in a dim tower room. A half-elf bard with honey-coloured eyes sits cross-legged on the floor, lute in lap, playing something soft, looking up with open warmth. On the bed above, a young woman with dark wavy hair sits wrapped in a blanket, guarded but leaning toward the sound. Candlelight, warm shadows. Atmosphere: the one person who doesn't flinch, presence offered as permission rather than obligation. |
| `day1f_night.png` | day1_night scene banner | A young woman lying on her back in a dim tower bed, eyes open, staring at the ceiling. White silk nightgown, one hand resting still at her side. Her expression is quiet and unreadable   not distress, not peace, something in between. Candlelight dying low. Atmosphere: the first night in a body still being learned, an anchor held onto in the dark. |
| `day1f_vials.png` | day1_npc_vael3 | A wooden case on a bedside table, open, containing four glass vials: blue, green, clear, and amber, each labelled in precise handwriting. A woman's hand (Vael) gestures over them, mid-explanation. Behind: a young woman on a bed, listening. Tower room, afternoon light. Atmosphere: brisk, unsentimental medical care, a body being looked after by someone who refuses to make it a tragedy. |
| `day1f_clothes.png` | day1_exam (mid-scene, getting dressed) | A young woman standing in a white stone tower room, wearing a loose shirt and trousers that visibly don't fit   shoulders too wide, fabric gaping open across a chest it wasn't cut for, the waistband loose at the hips. A breast band and folded dress lie discarded on the bed behind her. Her expression is flat, resigned, arms slightly away from her body as if unsure what to do with it. Overcast light through a narrow window. Atmosphere: a body outgrowing its own wardrobe overnight, no crisis, just a quiet, practical wrongness. |

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
| `day1f_clothes.png` | day1_exam (mid-scene, getting dressed) | A young woman standing in a white stone tower room, wearing a loose shirt and trousers that visibly don't fit   shoulders too wide, fabric gaping open across a chest it wasn't cut for, the waistband loose at the hips. A breast band and folded dress lie discarded on the bed behind her. Her expression is flat, resigned, arms slightly away from her body as if unsure what to do with it. Overcast light through a narrow window. Atmosphere: a body outgrowing its own wardrobe overnight, no crisis, just a quiet, practical wrongness. |
| `day1f_rowan.png` | day1_rowan scene banner | Two figures in a dim tower room. A half-elf bard with honey-coloured eyes sits cross-legged on the floor, lute in lap, playing something soft, looking up with open warmth. On the bed above, a young woman with dark wavy hair sits wrapped in a blanket, guarded but leaning toward the sound. Candlelight, warm shadows. Atmosphere: the one person who doesn't flinch, presence offered as permission rather than obligation. |
| `day1f_night.png` | day1_night scene banner | A young woman lying on her back in a dim tower bed, eyes open, staring at the ceiling. White silk nightgown, one hand resting still at her side. Her expression is quiet and unreadable   not distress, not peace, something in between. Candlelight dying low. Atmosphere: the first night in a body still being learned, an anchor held onto in the dark. |
| `day1f_vials.png` | day1_npc_vael3 | A wooden case on a bedside table, open, containing four glass vials: blue, green, clear, and amber, each labelled in precise handwriting. A woman's hand (Vael) gestures over them, mid-explanation. Behind: a young woman on a bed, listening. Tower room, afternoon light. Atmosphere: brisk, unsentimental medical care, a body being looked after by someone who refuses to make it a tragedy. |
