# Day -1   Location Images

Wired up the same way as Day -2 (see `day_minus_2_manifest.md`)   a native
`<<locationImage>>` JS macro (`src/ui/script.js`) builds the `<img>` directly
via the DOM, fails silently if the file is missing. Drop a same-named `.png`
in here and it appears automatically.

Every Day -1 location reuses a Day -2 asset **except** the Moonspire Tower,
which is new this day. See `day_minus_2_manifest.md` for `palace_chambers.png`,
`palace_chambers_night.png`, `queen_chambers.png`, `corridors.png`,
`training_yard.png`, `kitchens.png`, `grand_library.png`, `servant_quarters.png`,
and `royal_gardens.png`   all reused unchanged on Day -1.

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_tower.png` | day-1_hub card, day-1_moonspire_hub, day-1_moonspire scene banner | A narrow covered stone bridge spanning a deep chasm with a river far below, wind-blown spray. On the far side, a tall white tower quarried from stone that seems to hold its own faint moonlight glow, even under an overcast sky. Spiralling symbols carved into an arched door. Atmosphere: crossing a threshold, a place that holds answers the palace cannot, the point of no return. |

Two more Moonspire interior beats appear in the source material but aren't
wired to any passage   add `<<locationImage "moonspire_ritual_chamber" "...">>`
to `day-1_moonspire.tw` or `<<locationImage "moonspire_apothecary" "...">>` to
`npc/day-1_npc_vael.tw` if/when this art exists:

| Filename | Would be used by | Prompt |
|---|---|---|
| `moonspire_ritual_chamber.png` | day-1_moonspire (optional, not yet wired) | A round chamber with a domed ceiling painted in enchanted stars. A stone altar at center, draped in silvery cloth. A woman (late 30s, sharp features, silver-streaked dark hair, rain-grey eyes, purple and silver Silverveil robes) sits across a small table from a young man, teacups between them. Candles burn without flickering. Tapestries of transformation myths line the walls. Atmosphere: clinical intimacy, the calm before a storm. |
| `moonspire_apothecary.png` | day-1_npc_vael (optional, not yet wired) | A circular chamber lined floor to ceiling with shelves of glass bottles, dried plants, mineral samples. A red-haired woman (45, broad-shouldered, no-nonsense) grinds something in a stone mortar. A young man sits across from her, listening intently. The air is visibly thick with competing scents. Atmosphere: clinical, blunt, the smell of ingredients and truth. |
