# Day -2   NPC Portraits

Small inline portraits shown beside a character's first line of dialogue in
their scene (`<<npcPortrait "slug" "Name">>` in `src/ui/widgets.tw`). Same
graceful-failure behaviour as the location images   missing files just don't
render, nothing breaks. Drop a same-named `.png` in here and it appears.

## Characters with full reference sheets already written

These three already have detailed, face-consistent prompts in
`story_files/characters/AELINDRA_AllCharacter_ImagePrompts.md`   use the
**Casual/Off-Duty** or **current** variant so the portrait matches how they
look in Day -2 (training yard / sickbed / travel-worn), not their formal or
nude reference variants:

| Filename | Character | Source prompt |
|---|---|---|
| `aldric.png` | Sir Aldric Vane | PROMPT AV-02   Aldric, Casual/Off-Duty |
| `seraphina.png` | Queen Seraphina | PROMPT QS-02   Seraphina, Current/Ill (Bedchamber) |
| `ash_male.png` | Ash Ashwood (male presentation, default) | PROMPT RA-02   Rowan, Casual (same character, renamed   Ash's gender is player-selected at day-2_gardens.tw; every `<<npcPortrait>>` call for Ash uses `$bardPortraitSlug`, which resolves to this file unless the female option was chosen) |
| `ash_female.png` | Ash Ashwood (female presentation) | Same reference as ash_male.png, adapted per the selectable-gender proposal's comparison table   sharper/angular rather than soft features, same dark copper-toned hair, same honey-coloured eyes, half-elf ears, same travel-worn leather and performance outfit. Not yet produced   `$bardPortraitSlug` fails gracefully (no art shown) if the player picks this option before the file exists. |

## Day -2 minor cast (no existing reference sheet)

Prompts below are condensed directly from the physical descriptions already
written in `day_minus2_core_content.md` and `day_minus2_supplementary_npc.md`
  nothing invented, just excerpted into image-prompt form. Head-and-shoulders
framing is enough since these render small (56px circular inline portrait).

| Filename | Character | Prompt |
|---|---|---|
| `haeth.png` | Librarian Haeth | Elderly man, 70s–80s, hunched like a question mark, sharp intelligent eyes, in librarian's robes. Grand medieval library setting. Face: dry, watchful, unreadable. |
| `brin.png` | Servant Brin | Young man, 16–17, sandy hair sticking up on one side, palace livery slightly too large, nervous earnest expression. New-hire energy. |
| `caedric.png` | Ser Caedric | Elderly retired knight, 73, seated, worn armor with a sword rusted into its scabbard, gnarled hands, fond gruff expression. Portrait-gallery corridor background. |
| `marta.png` | Head Cook Marta | Woman, 50s, stout barrel-shaped build, flour in her hair, grease-stained apron, wooden spoon in hand, warm but formidable expression. Palace kitchen background, warm firelight. |
| `joss.png` | Scullion Joss | Boy, 14, gap-toothed grin, soot-smudged face, kitchen scullion clothes. Mischievous, energetic. |
| `keller.png` | Guardsman Keller | Man, 40, weathered stone-carved face, Royal Guard uniform, sharpening a real sword. Stoic, watchful, loyal. |
| `tamsin.png` | Recruit Tamsin | Young woman, new recruit, clean well-pressed uniform, quarterstaff in hand, intense focused expression. Training yard background. |
| `elise_librarian.png` | Junior Librarian Elise | Woman, mid-20s, ink-stained fingers, spectacles sliding down her nose, nervous but eager expression. Library stacks background. *(Named distinctly from the unrelated palace handmaiden "Elise" in the main character-prompt doc   do not reuse that file.)* |
| `vaelin.png` | Brother Vaelin | Young man, pallid, temple theology robes, surrounded by open books, flustered/embarrassed expression, thousand-yard scholar stare. |
| `wynn.png` | Old Wynn | Elderly bent gardener, weathered soil-worn hands, pruning shears, calm unsentimental gaze. Garden background, dusk light. |
| `harwick.png` | Lady Harwick | Woman, 60s, elaborately perfumed and bejeweled, court gown, knowing performative smile. Garden topiary background. |
| `alva.png` | Mistress Alva | Woman, 50, iron-grey hair in a severe bun under a white cap, ramrod posture, stern composed expression. Below-stairs servant corridor background. |
| `perrin.png` | Night Guard Perrin | Young man, earnest, Royal Guard night-shift uniform, standing at rigid attention. Dim corridor, torchlight. |
| `lissara.png` | Handmaiden Lissara | Woman, 26, blonde hair pinned up with damp curls escaping, blue eyes, full-figured, strong-shouldered. Bathing uniform. Royal Baths background, steam and torchlight. (Added later, for the pre-transformation sexual content   `pre_transformation_sexual_content.md`.) |

Not needed: the gossiping maids (ambient/unnamed) and the half-written letter
(an object, not a character).
