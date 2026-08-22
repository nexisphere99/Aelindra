# Day 0   Scene Images

Same `<<sceneImage>>` native macro as Day -2 (see
`../day_minus_2/day_minus_2_manifest.md`)   fails silently if missing, one
subfolder per day, slug includes the day folder:
`<<sceneImage "day_0/void" "...">>`. Day 0 is where this split earns its
keep: five of seven Day 0 art pieces are single-passage narrative beats,
not reusable rooms.

| Filename | Used by | Prompt |
|---|---|---|
| `moonspire_bridge_ash_male.png` | day0_bridge scene banner (male Ash / default) | Same bridge as `locations/moonspire_bridge.png`, same chasm and dawn light. A half-elf bard (male presentation, soft features, silver rings) with honey-coloured eyes leans against the railing at the near end, lute notably absent for the first time, watching a dark-haired prince approach. |
| `moonspire_bridge_ash_female.png` | day0_bridge scene banner, only if the player chose a female Ash | Same scene, same composition   the bard leaning against the railing is the female presentation instead: sharper/angular features, same dark copper-toned hair, same honey-coloured eyes, pointed ears, lute equally absent. Everything else identical to moonspire_bridge_ash_male.png. |
| `transformation_abstract.png` | day0_ritual_female (mid-scene, right as the pain begins) | Abstract/impressionistic: a human figure on a stone altar, body wreathed in silver-white magical energy, mid-transformation, the silhouette blurring between masculine and feminine. The dome above blazes with spinning stars merged into a ring of light. Five hooded figures channel beams of silver energy inward. Atmosphere: agony and creation, the moment between identities. |
| `transformation_abstract_futa.png` | day0_ritual_futa (mid-scene, right as the pain begins) | Abstract/impressionistic: the same altar scene, but the energy is two intertwining colours   silver and amber-gold   with a thread of the original form preserved at the center, glowing amber against the silver. Atmosphere: painful creation, the preservation of self within transformation, dual identity being forged. |
| `void.png` | day0_void | Pure darkness with a single point of light at the center   a heartbeat rendered as a faint pulse of warm gold in infinite black. At the very edge of hearing (visually implied by thin luminous threads), the ghost of lute strings. Atmosphere: the space between, total absence, the mercy of unconsciousness before waking to a new body. |
| `void_futa.png` | day0_void_futa | Darkness with two parallel threads of light   one silver, one amber   running through infinite black space, not merging but flowing alongside each other. A faint pulse of gold at their convergence point. Atmosphere: dual identity suspended, the body holding both. |

Selected via `<<set _bridgeImg to ($bardGender is "female") ? "day_0/moonspire_bridge_ash_female" : "day_0/moonspire_bridge_ash_male">>`
then `<<sceneImage _bridgeImg "The Bridge">>` in `day0_bridge.tw`; the rest
are plain `<<sceneImage "day_0/slug" "...">>` calls with no gender branching.

`moonspire_bridge.png` (the empty-bridge hub-card shot) and
`moonspire_ritual_chamber_prepared.png` (the prepared-but-empty altar room
at day0_path_choice) stay in `assets/images/locations/day_0_manifest.md`  
both are still fundamentally rooms, not narrative-moment illustrations.
