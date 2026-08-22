# Day -2   Scene Images

Same fail-silently behaviour as `assets/images/locations/`, via the sibling
`<<sceneImage>>` native macro (`src/ui/script.js`)   identical mechanics to
`<<locationImage>>`, different folder. This directory holds single-passage
narrative-beat art (a specific story moment, often character-specific or
abstract) rather than reusable physical places; see the top of
`assets/images/locations/day_minus_2_manifest.md` for the location/scene
split rationale.

| Filename | Used by | Prompt |
|---|---|---|
| `royal_gardens_ash_male.png` | day-2_gardens banner (male Ash / default) | Same garden as `locations/royal_gardens.png`, same fountain and jasmine and first stars. Two figures on the stone bench   a dark-haired prince and a half-elf bard (male presentation, soft features, silver rings, travel-worn leather) with a lute, pointed ears, honey-coloured eyes. |
| `royal_gardens_ash_female.png` | day-2_gardens banner, only if the player chose a female Ash | Same scene, same composition   the bard on the bench is the female presentation instead: sharper/angular features, same dark copper-toned hair, same honey-coloured eyes, pointed ears, same travel-worn leather and lute. Everything else identical to royal_gardens_ash_male.png. |

Selected via `<<set _gardensImg to ($bardGender is "female") ? "royal_gardens_ash_female" : "royal_gardens_ash_male">>`
then `<<sceneImage _gardensImg "Royal Gardens">>` in `day-2_gardens.tw`.
