# Day 0   Location Images

Same `<<locationImage>>` native macro as prior days (see
`day_minus_2_manifest.md`)   fails silently if missing, appears
automatically once dropped in.

Every returning Day 0 location reuses its existing asset unchanged:
`palace_chambers.png`, `palace_chambers_night.png`, `queen_chambers.png`,
`corridors.png`, `training_yard.png`, `kitchens.png`, `grand_library.png`,
`royal_gardens.png`, `servant_quarters.png`, `moonspire_tower.png` (all from
`day_minus_2_manifest.md` / `day_minus_1_manifest.md`).

## New for Day 0

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_bridge.png` | day0_hub card (generic reuse, no Ash in frame) | A narrow stone bridge spanning a deep gorge. Wind howls through, spray rising from the river far below. Empty railing, no figures. Behind, a vast stone palace. Ahead, a white glowing tower. The sky shows the first blush of dawn. Atmosphere: the walk between two worlds, the point of no return. |
| `moonspire_ritual_chamber_prepared.png` | day0_path_choice | A circular chamber at the top of a white tower. Domed ceiling painted with slowly spinning enchanted stars. A stone altar at center, carved with silver-glowing runes, draped in translucent silvery cloth. Hundreds of white candles in iron holders ring the room. Five robed sorceresses stand at cardinal points. Atmosphere: sacred dread, the moment before transformation, power held in check. |

The rest of Day 0's art moved to `assets/images/scenes/day_0/day_0_manifest.md`  
the bridge-crossing Ash banner (male/female), both transformation-moment
illustrations, and both void banners are all single-passage narrative beats
wired via `<<sceneImage>>`, not reusable places.
