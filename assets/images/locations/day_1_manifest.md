# Day 1   Location Images

Same `<<locationImage>>` native macro as prior days. No new characters are
introduced on Day 1   every NPC portrait reuses an existing file (Aldric,
Ash, Ilara, Nara, Vael, Marta), so there's no `npcs/day_1_manifest.md`;
this is the only Day 1 location art file. Ash's portrait resolves via
`$bardPortraitSlug` (`ash_male.png`/`ash_female.png`)   see
`npcs/day_minus_2_manifest.md`.

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_recovery_room.png` | day1_hub, and every sub-hub (door, window, table) | A round tower room, walls of luminous white stone that hold a faint glow even in daylight. A simple bed with white linens, narrow arrow-slit windows letting in sunlight, a full-length polished silver mirror on one wall, a heavy oak door, a small bedside table. No decoration beyond function   this is a recovery room, not a bedroom. Atmosphere: clinical warmth, a space built for healing, four walls that have become the entire world. |

Day 1 stays inside this one room all day (the architecture is intentionally
claustrophobic   see the code prompt's own note), so the room image above
covers the hub and every sub-hub. Every other Day 1 image is a
single-passage narrative beat, not a reusable place   see
`assets/images/scenes/day_1_manifest.md` for the wake/mirror/clothes/night/
vials/Ash-visit scene banners.
