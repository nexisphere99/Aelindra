# AELINDRA   Pre-Transformation Sexual Content
## Days -2 and -1 | Side Quest Additions
### First Person, Present Tense | SHARED PROLOGUE (Both Paths)

---

## PURPOSE

These scenes establish Edrin's MALE sexual baseline   how pleasure works in his current body, his relationship with his own anatomy, his sexual experience level. This baseline makes the post-transformation body discovery (Day 1+) dramatically richer. The player knows what he's losing because they experienced what he had.

---

# DAY -2 ADDITION: MASTURBATION   "The Last Familiar Thing"

## Integration Guide

- **Location:** Edrin's Chambers
- **Time Window:** NIGHT (available after returning to chambers, before sleep)
- **Trigger:** Player selects "The Body   one last time" from the Night chambers hub
- **Unlock Condition:** `$d2_woke = true` (always available on night of Day -2)
- **Player Choice:** This is OPTIONAL. The interaction card should read suggestively but not explicitly   the player opts in.

### Add to `day-2_chambers_explore` (Night version):

```html
<<if $timeSlot is "NIGHT" and not $d2_npc_masturbation>>
<div class="interaction-card side">
  <h4>🔥 The Body   Restless</h4>
  <p>You can't sleep. The sheets are warm. Your body is wound tight with stress and something else   something familiar, something the body wants when the mind won't quiet.</p>
  [[Give in → |day-2_scene_masturbation]]
</div>
<</if>>
```

### New Variable:
```javascript
<<set $d2_npc_masturbation to false>>
<<set $maleBaselineEstablished to false>>
```

---

### SCENE: `day-2_scene_masturbation`
### Day -2 Night   Edrin's Chambers

I can't sleep. The ceiling and I have exhausted our conversation. My mother's words loop in my skull   *become my daughter, become the heir, two days*   and the loop tightens with every repetition until my jaw aches from clenching and my shoulders are granite and my body is so wound with tension that the sheets feel like restraints.

I roll onto my back. Stare at nothing. Breathe.

My cock is half-hard.

Not from arousal   from stress. The body doesn't distinguish, sometimes. Tension is tension, and blood flows where blood flows, and the physiological machinery of erection doesn't consult the emotional context before engaging. I've been clenching every muscle for sixteen hours and the one set of muscles I wasn't consciously controlling has made its own decision about how to process the surplus energy.

I ignore it. For ten minutes I ignore it   lie still, breathe, think about nothing. The nothing fills with my mother's voice and the smell of her sickroom and the phrase *in totality* from the Silverveil Compendium and the crack in the ceiling and the fact that in two days this cock, this half-hard cock pressing against my thigh, might not exist anymore.

The thought lands differently than the others. Not in my head   in my body. A sharp, physical awareness of what's between my legs. The weight. The warmth. The way it stiffens further as blood responds to attention, not desire but attention, the body saying *I'm here, I'm here, notice me before it's too late.*

I reach down.

My hand finds it through the linen of my smallclothes. The familiar shape   thick, warm, the shaft hardening under my palm. I grip it through the fabric. Not stroking yet. Just holding. The way you'd hold someone's hand before they leave on a long journey.

Then I push the smallclothes down. Free it. The air is cool on the exposed skin and the contrast makes me hiss   warm flesh meeting cold room, nerve endings firing the ancient signal that says *touched, you are being touched.* My fingers wrap around the shaft. Full grip. The calluses of my sword hand rough against the smooth skin of the shaft, a texture I've known since I was thirteen and discovered what the body does when the mind is bored and the door is locked.

I stroke. Slow. Not chasing orgasm   not yet. Cataloguing. My thumb traces the underside of the head, where the frenulum dips and the sensitivity concentrates, and the sensation blooms outward from that point like heat from a coal. The shaft is fully hard now   thick in my hand, rigid, the veins standing under the skin. Six inches of blood-flushed tissue that has been mine for twenty years and knows my hand and responds to my rhythm the way a horse responds to a familiar rider.

I tighten my grip. The stroke lengthens   base to head, the foreskin sliding over the glans, the wet click of precum easing the friction. The pleasure builds in the familiar way: a warmth behind my navel, a tightening in my balls, a drawing-up sensation as the testes pull close to the body in preparation for what's coming. I know this sequence. I've performed it a thousand times. The rising arc. The plateau where you hold the pace and let the tension accumulate. The edge where one more stroke, one more twist of the wrist, will tip the balance.

My hips flex. Pushing into my own fist. The mattress creaks. My breath is shorter   through my nose, controlled, because I learned early that palace walls are thin and servants have ears and a prince who moans audibly at midnight becomes the subject of kitchen gossip by dawn.

I think about nothing. That's the lie I tell myself   I'm thinking about nothing, this is mechanical, stress relief, the body needs release the way a bow needs unstringing. But the body has its own imagination and it supplies images without consulting me: a mouth, warm and wet, on my cock. Hands   whose hands? Does it matter? Hands on my hips, my thighs, my chest. The press of a body against mine. The heat of skin on skin. The sound someone makes when they want you.

The edge arrives. My balls tighten   the familiar, unmistakable draw-up that means thirty seconds, maybe less. I stroke faster. The rhythm precise, practiced, the wrist doing the work while the arm stays steady. My cock swells in my hand   the final thickening, the head darkening, the slit weeping clear fluid.

I come.

The orgasm rolls through me in waves   the first spasm sharp and concentrated, centered in the cock, the semen pulsing out in thick ropes that land hot on my stomach, on my chest, on the hand that's still working the shaft through the aftershocks. The second wave is deeper, spreading outward from the groin into the thighs, the abdomen, the lower back   a full-body release that makes my spine arch and my toes curl and my jaw finally, FINALLY, unclench.

Three more pulses. Each weaker than the last. The semen pools on my stomach   white, warm, viscous, smelling of salt and something alkaline. The afterglow floods in behind the orgasm like a tide filling a harbour   warm, quiet, the absence of tension where tension has been living for sixteen hours.

I lie there. Breathing. The ceiling is the same. The crack is the same. The cum cooling on my stomach is the same composition it's always been   the same cells, the same chemistry, the same body producing the same evidence of its own pleasure.

In two days, this body might produce something different. Or nothing at all. The machinery that just performed this ancient, ordinary miracle   the erection, the stroke, the build, the edge, the release, the ropes of cum on my stomach   might be disassembled and rebuilt into something else. Something that doesn't get hard. Something that doesn't come in white pulses on a flat stomach.

I clean myself with the linen from the bedside pitcher. The cum wipes away. The body softens. The cock rests against my thigh, spent, warm, satisfied in the simple way that only physical release provides.

I sleep. Finally. The orgasm bought me four hours of unconsciousness, which is more than the ceiling was offering.

In the dream, I don't dream of water. I dream of hands   my own hands, holding myself, and the hands change, and the body changes, and the pleasure changes, and I wake at dawn not remembering what it felt like but knowing it felt different.

**[Stress -15, Energy -5 (exertion), Arousal reset to 0, $maleBaselineEstablished = true]**

---

# DAY -1 ADDITION 1: MASTURBATION   "The Last Time Knowing"

## Integration Guide

- **Location:** Edrin's Chambers
- **Time Window:** NIGHT (available AFTER Rowan leaves, before the mirror scene)
- **Trigger:** Player selects "The body   you know what this is" from Night chambers
- **Unlock Condition:** `$d1_rowan = true` (after Rowan's evening visit)
- **Narrative Context:** This is the LAST masturbation as a man. Edrin knows it. The scene carries the weight of farewell.

### Add to Night chambers hub (Day -1):

```html
<<if $d1_rowan and not $d1_night and not $d1_npc_lastjerk>>
<div class="interaction-card side">
  <h4>🔥 The Body   You Know What This Is</h4>
  <p>Tomorrow you walk to the tower. Tomorrow the body changes. Tonight, for the last time, you know exactly how this works.</p>
  [[One last time → |day-1_scene_masturbation]]
</div>
<</if>>
```

### New Variable:
```javascript
<<set $d1_npc_lastjerk to false>>
```

**NOTE:** This scene should appear BEFORE the mirror scene. If the player does this first, the mirror scene's emotional weight increases   he's just come, the orgasm is fading, and THEN he stands naked and catalogues the body. If the player goes to the mirror first and then comes back, the scene is still available but the internal monologue adjusts slightly.

---

### SCENE: `day-1_scene_masturbation`
### Day -1 Night   The Last Time

Rowan is gone. The wine is a warm ghost in my blood. The fire is embers. Tomorrow I walk to the tower. Tomorrow the Rite begins. Tomorrow this body   this specific body, with this specific cock and these specific hands and this specific way of feeling pleasure   will be rewritten.

This is the last time.

I know it the way I know the ceiling crack and the morning cold. This is the last time I will touch myself and feel what I feel. The last time my cock will harden under my own hand and the sensation will be the sensation I've known since I was thirteen and figured out what happens when you grip and stroke and don't stop. The last orgasm in this body. The last ropes of cum on this stomach. The last.

I don't undress. I push my trousers down enough   just enough. The urgency isn't sexual. It's ceremonial. I'm performing a rite of my own   not the Rite of Becoming but the rite of goodbye, the body's farewell to itself, pleasure as elegy.

My hand finds my cock. Soft. I'm not aroused   I'm terrified and exhausted and wine-blurred and the combination should kill any erection. But the body knows what's happening. The body, which has its own intelligence, its own understanding of last things, responds. Blood flows. The shaft thickens. Slowly   not the urgent hardening of lust but the gradual, deliberate swell of a body that is showing up for its own farewell.

I stroke. The calluses catch. The friction builds. The pleasure starts at the head   the frenulum, always, the most sensitive point, the place where every nerve ending congregates to report   and spirals downward through the shaft, through the balls tightening in their sac, through the pelvic floor where muscles I've never consciously controlled engage and release in the rhythm that is the body's oldest dance.

I go slow. Deliberately slow. Because this is the last time and I want to remember every second. The way the foreskin slides over the glans   that specific, slick glide, the tiny wet sound, the burst of sensation at the peak of each stroke. The way my balls move when my hand passes over them   heavy, warm, shifting in their sac, drawing closer to the body as arousal builds. The way my hips rock   involuntary, the pelvis tilting, the ancient thrust-motion that exists in every male body as deep code.

I think about the first time I did this. Thirteen. Lying in this same bed, in this same room, discovering with shocked delight that the body contained this capability   that touching yourself a certain way produced a feeling that escalated beyond control and ended in a mess on the sheets and a heartbeat so loud you could hear it in your ears. The discovery that the body is a pleasure instrument. That it plays itself.

I think about every time since. The quick, efficient ones   morning, before training, hand moving fast, the orgasm a punctuation mark before the day. The long, luxurious ones   evening, wine-warm, edging toward release and pulling back, building the wave higher, holding the crest. The desperate ones   stress, anger, grief, the body saying *let me help* and the hand saying *yes, fine, just this once* and the once becoming a thousand.

All of those. Every orgasm this body has ever produced. Every drop of cum, every clenched jaw, every muffled groan into a pillow. All of it ending tonight.

The edge comes faster than I expect. The pleasure has been building while I was busy remembering, and now it's HERE   cresting, the point of no return, the balls drawn tight and the shaft steel-rigid and the head swollen and dark and leaking.

I don't hold back. No edging tonight. No prolonging. Just   release. I stroke through the edge and the orgasm hits and it's GOOD, it's so good, the simple, overwhelming goodness of a body doing the thing it knows how to do. The first spasm sends cum arcing onto my stomach, my chest, the familiar hot trajectory of ejaculation. The second spasm is deeper   a convulsion that starts in the balls and radiates through the pelvis and up the spine. The third, the fourth   diminishing, the aftershocks of a quake, the body shuddering and releasing and shuddering again.

I lie in the aftermath. Cum on my stomach. Cock softening in my hand. The glow settling over me like a warm blanket   the oxytocin, the serotonin, the neurochemical cocktail of post-orgasm peace.

"Nnngh..." The groan is low, male, the vibration of a baritone throat. Tomorrow the throat will be higher. Tomorrow the moan will be different.

Tomorrow I won't have this. This cock. This hand around it. This exact formula of grip and stroke and build and release that has been my constant companion, my stress relief, my private pleasure, my proof that the body is good for something beyond fighting and statecraft.

I clean myself. The cum wipes away. The cock softens. The body cools.

I stand. I walk to the mirror and now   now, with the orgasm still fading, with the body wrung out and loose and temporary   I look at myself for the last time.

The mirror scene that follows hits differently now. The body in the glass is not just a body being catalogued. It's a body that just came for the last time. The cum is cleaned but the ghost of it remains   the flushed skin, the softened cock, the heavy-lidded eyes of a man who has just performed his own funeral rite in the language of pleasure.

**[Stress -20, Energy -5, Arousal reset to 0, $d1_npc_lastjerk = true, $maleBaselineEstablished = true]**

---

# DAY -1 ADDITION 2: SEX WITH A FEMALE NPC   "The Handmaiden"

## Integration Guide

- **Location:** Edrin's Chambers OR Guest Wing corridor
- **Time Window:** AFTERNOON (after training rage, before Rowan's evening visit)
- **NPC:** Handmaiden Sera   mid-20s, dark-haired, assigned to the royal wing. She's been bringing linens. She and Edrin have exchanged looks across corridors for months. Neither has acted on it.
- **Trigger:** Player explores corridors or returns to chambers in AFTERNOON
- **Narrative Context:** Edrin is raw from the rage session, wrung out, cracked open. He encounters Sera. The sexual tension that's been building for months detonates because he knows   this might be the last time he's a man, the last time this body can do this. She doesn't know why he's desperate. She just knows he is.
- **Player Choice:** This is FULLY OPTIONAL. The interaction card offers the encounter. The player can decline. If they engage, the scene plays. If they don't, the day continues unchanged.

### Add to Day -1 Corridors or Chambers hub (AFTERNOON):

```html
<<if $d1_training and $timeSlot is "AFTERNOON" and not $d1_npc_sera>>
<div class="interaction-card side">
  <h4>🌹 A Familiar Face   The Corridor</h4>
  <p>The handmaiden from the royal wing   dark hair, dark eyes, the one who lingers when she brings linens. She's here. She sees you. The look between you isn't new. But your desperation is.</p>
  [[Approach → |day-1_scene_sera_approach]]
</div>
<</if>>
```

### New Variables:
```javascript
<<set $d1_npc_sera to false>>
<<set $seraEncountered to false>>
<<set $seraIntimate to false>>
```

---

### SCENE PART 1: `day-1_scene_sera_approach`
### The Approach   Player Decision Point

She's in the corridor near the guest wing. Sera. Twenty-four. Dark hair braided and pinned under the white cap that all the senior handmaidens wear. Dark eyes that have been finding mine across rooms and corridors for six months   across the breakfast hall, across the laundry corridor, once across the throne room when she was replacing the cushions and I was pretending to review petitions and we held eye contact for four seconds too long and neither of us said anything afterward.

She's carrying linens. She always seems to be carrying linens when I see her. I've begun to suspect the linens are a prop   an excuse to be in corridors where a handmaiden might cross paths with a prince.

She sees me. Stops. The linens press against her chest. Her eyes take me in   the bandaged hands, the sweat-stained shirt from the training yard, the wild-eyed look of a man who has just spent two hours beating a training dummy to death and is still vibrating with undischarged energy.

"Your Highness." Her voice is low. Careful. The voice of a woman who is aware of rank and proximity and the distance between what is proper and what is desired. "You look like you've been fighting."

"The training dummy lost."

"I heard." A small smile. "The armoury is composing a eulogy."

We're standing three feet apart. The corridor is empty. The afternoon light slants through a window and catches the fine hairs at her temple, the curve of her collarbone above the neckline of her dress.

I should walk away. I should go to my chambers and stare at the ceiling and think about tomorrow and the tower and the Rite and the body that will be rewritten while I sleep.

Instead I say: "Sera."

Her name. I've never said her name directly to her face before. It changes the air between us. The distance of *Your Highness* and *Handmaiden* collapses, and what's left is a man and a woman standing in an empty corridor with six months of unspoken tension and the particular electricity of mutual want acknowledged for the first time.

"Yes?" Her voice is quieter now. The linens have lowered slightly. She's looking at me the way she's always looked at me   but now she's not hiding it.

**[PLAYER CHOICE:]**

```html
<div class="choice-cards">
  <div class="interaction-card">
    <h4>Stay</h4>
    <p>"Come with me."</p>
    [[→ |day-1_scene_sera_sex]]
  </div>
  <div class="interaction-card">
    <h4>Walk away</h4>
    <p>Not tonight. Not like this   desperate, terrified, using her body as an anchor.</p>
    [[→ |day-1_hub]]
    /* Sets $d1_npc_sera = true, $seraEncountered = true, $seraIntimate = false */
  </div>
</div>
```

---

### SCENE PART 2: `day-1_scene_sera_sex`
### The Encounter   Edrin's Chambers

"Come with me."

Three words. She sets the linens on the corridor bench   carefully, because she's a professional even when her pulse is visible in her throat   and follows me. Not as a handmaiden following a prince. As a woman following a man who asked.

My chambers. The door closes. The lock turns. The room is dim   afternoon light through arrow-slits, the fire unlit, the bed unmade from a night of ceiling-staring. Not romantic. Not prepared. Raw.

We stand facing each other. The distance is two feet.

"You don't have to " I start.

"I know." She closes the distance. Her hand finds my chest   palm flat against the linen shirt, over my heartbeat, which is hammering. Her fingers are warm. Her touch is deliberate. "I've been carrying linens past your door for six months hoping you'd say something. Don't take it back now."

I kiss her. Not gently   the gentleness has been burned out of me by three days of dread and a morning of destroying things. My mouth finds hers and the contact is electric, her lips soft and opening against mine, the taste of her mouth warm and faintly sweet and ALIVE. My hands find her waist   narrow under the dress, the fabric bunching under my grip, my thumbs pressing the ridge of her hipbones. She makes a sound   "mmmh"   against my lips and the sound vibrates through my mouth into my chest into my cock which is already hardening because the body is twenty years old and a woman is kissing it and the body doesn't know about the Rite or the tower or the two-day deadline. The body knows mouths and hands and heat.

She pushes my shirt up. Her palms on my bare stomach   flat, muscled, the trail of hair beneath her fingers. She traces the scar on my ribcage. Looks at me with a question.

"Sparring accident. Sixteen."

"Mmh." She presses her mouth to the scar. The sensation   wet lips on healed tissue, the sensitivity of scar skin under a warm tongue   makes my breath catch.

I undress her. Unlace the back of the dress   my fingers are clumsy, the fine work of laces difficult with bandaged hands and hands that are shaking. She helps. The dress falls. Underneath: a shift, linen, thin. Her body through it   breasts, full, the nipples dark and pressing against the fabric. The curve of her waist into her hips. The shadow between her thighs.

"You're shaking," she says.

"I know."

"We can stop."

"I don't want to stop. I need " I don't finish. What I need is too large for words. I need to be inside a woman's body while I still have the body that allows it. I need to feel pleasure the way I've always felt it   cock-first, straightforward, the ancient simplicity of male arousal and female warmth and the honest mechanics of two bodies fitting together. I need to do this one more time knowing what it is. Knowing what I am.

She pulls the shift over her head. She's naked. Dark hair loose on her shoulders. Breasts round, the nipples puckered from the cool air. A trim waist. Dark hair between her legs, dense and soft. She's beautiful in the way that real bodies are beautiful   not the sculpted perfection of art but the asymmetric, warm, breathing reality of a woman standing bare in afternoon light.

I strip. Shirt, trousers, smallclothes. Naked. My cock is hard   fully, achingly hard, standing at attention, the head flushed dark. She looks at it. Her eyes widen fractionally   not at the size (I'm not extraordinary) but at the urgency. The cock looks the way I feel: desperate, straining, reaching toward something it knows it's about to lose.

We fall onto the bed. Not gracefully   urgently, a tangle of limbs and mouths and hands. Her body is warm against mine and the FEEL of her   soft where I'm hard, curved where I'm flat, her breasts pressing against my chest, her thighs opening around my hip   is overwhelming. The full-body contact of skin on skin, male body against female body, the geometry that evolution designed for exactly this purpose.

I kiss her neck. She gasps   "aaah"   and her hands find my cock, wrapping around it, and her grip is different from mine. Smaller fingers. Softer palm. A rhythm I didn't set. She strokes me and I press my face against her throat and breathe in the smell of her   clean linen and soap and something underneath that is purely her, the musk of arousal, the biological signal that says *yes, here, now.*

"Sera "

"Shh."

She guides me. Her hand on my cock, positioning. The head finds her entrance   warm, wet, the lips parting around me. I push forward. Slowly. The sensation of entering a woman   the yielding heat, the tight grip of wet tissue, the way her body opens and closes around the shaft in pulses   fills my entire consciousness. There is nothing else. No tower, no Rite, no succession crisis. Just this: my cock inside her, her warmth around me, the sound she makes   "ohhh, oh..."   low and breathy and genuine.

I push deeper. She takes all of me   six inches, fully seated, my pelvis against hers, her legs wrapping around my lower back. The position is ancient. Simple. My weight on my elbows, her body beneath mine, the cock buried and the pleasure radiating outward from the point of connection like heat from a forge.

I move. The thrust is instinct   the hip-roll, the withdrawal and re-entry, the steady rhythm that builds friction and builds pleasure and builds the tension toward the peak. She moves with me   her hips rising to meet mine, the angle adjusting, her internal muscles gripping me in waves that make my vision narrow.

"Ah   ahh   mmhh " Her moans are quiet. Private. The sounds of a woman who's learned to be discreet in a palace with thin walls. But they're real, and each one travels through me like a vibration through a tuning fork.

Faster. The urgency takes over. I'm not making love   I'm printing a memory. Stamping this experience into my neural pathways so deep that no magic can erase it. The feel of my cock inside a woman. The grip. The heat. The wet sound of bodies meeting. The way her breasts shake with each thrust   a small, hypnotic motion that I watch with the intensity of a man studying a sunset he knows is his last.

"Edrin " She says my name. The name that will change. The name that belongs to the man who is inside her right now, the man whose cock is thick and hard and buried in her cunt, the man who will not exist in thirty-six hours.

I come.

The orgasm is enormous. Not because of technique or duration but because of weight   the weight of everything I'm about to lose, compressed into the spasms that are pumping cum into her in thick, hot pulses. My cock jerks inside her   once, twice, three times   and each pulse is a goodbye. Goodbye to this. Goodbye to the simple, uncomplicated pleasure of a male body inside a female body. Goodbye to the geometry that made sense.

She comes a moment after   triggered by the pulsing, by the heat of the cum, by the way I'm grinding against her clit with each spasm. Her orgasm is different from mine   a full-body clench, her thighs tightening around me, her back arching, her cunt gripping my cock in rhythmic contractions that milk the last drops. She moans   "nnnh, ahhh"   the sound muffled against my shoulder, her teeth grazing my skin.

We lie together. My cock softening inside her, the cum warm between us. Her heartbeat against my chest. The room is dim and the fire is cold and outside the world is continuing and inside this room a man just had sex for the last time knowing what he is.

"Stay," she murmurs. Her fingers in my hair.

"I can't."

"Tomorrow?"

The word hits like a blade. Tomorrow. When Edrin won't exist. When the man she just fucked will be gone, and something else   someone else   will be walking these corridors in a body she won't recognise.

"Tomorrow is complicated."

She accepts this. Handmaidens learn to accept cryptic answers from royalty. She dresses. She kisses me   gently this time, on the mouth, a goodbye neither of us names.

At the door: "Whatever's happening, Your Highness   you're a good man."

She leaves. The linens are still on the corridor bench. The room smells of sex. My cock is soft and wet and satisfied and has no idea what's coming tomorrow.

I lie in the wreckage of the bed. Spent. The cum drying on my stomach. The warmth of her body fading from the sheets.

Tomorrow I walk to the tower. Tomorrow this cock   this cock that just performed its oldest function inside the body of a woman who wanted it   will either disappear or be reshaped or be preserved alongside something new and the man who used it, the man who felt what he felt, will be gone.

I get up. I walk to the mirror. The mirror scene follows   and the body in the glass is flushed, post-coital, still carrying the evidence of its last act as a man.

**[Stress -20, Energy -10, Arousal reset to 0, $seraIntimate = true, $d1_npc_sera = true, $maleBaselineEstablished = true]**

---

## NPC PROFILE: HANDMAIDEN SERA

| Detail | Description |
|---|---|
| **Name** | Sera |
| **Age** | 24 |
| **Appearance** | Dark hair, dark eyes, olive skin, full-figured. Not conventionally beautiful   warm, real, approachable. |
| **Role** | Senior handmaiden, Royal Wing. Manages linens and chambers. |
| **Personality** | Quiet confidence. Professional warmth. Discreet   palace servants learn discretion or they don't survive. Perceptive. |
| **Relationship to Edrin** | Six months of mutual attraction, unacted upon. She's interested in the prince. The prince has been too preoccupied (or too principled) to act. Day -1 breaks the dam. |
| **Post-transformation** | Sera will encounter Aelindra. She'll recognise the grey-blue eyes. She'll be confused, then (possibly) understanding. She becomes a potential recurring NPC   one of the few who knew Edrin's body intimately and must reconcile that with Aelindra's new form. |
| **Persists?** | Yes   becomes a recurring minor NPC with unique perspective on the transformation |

---

## IMAGE PROMPTS   SEXUAL CONTENT

### IMG_PRE_001: Day -2 Masturbation
**Prompt:** A dark bedchamber lit only by dying embers. A young man lies on rumpled sheets, one arm behind his head, eyes closed, expression of relief-approaching-sadness. The composition implies post-orgasm without explicit content. Bare chest, sheets at waist level. The crack in the ceiling visible above. Atmosphere: the body's oldest comfort, pleasure as temporary escape, the quiet after release.

### IMG_PRE_002: Day -1 Sera   The Corridor
**Prompt:** A dim palace corridor, afternoon light through one window. A young dark-haired man with bandaged hands faces a dark-haired woman (24, olive skin, handmaiden's dress) who holds folded linens against her chest. The distance between them is closing. The tension is visible in their postures   leaning toward each other, the linens the only barrier. Atmosphere: six months of tension breaking, the urgency of last chances.

### IMG_PRE_003: Day -1 Sera   After
**Prompt:** Two figures in a dim bedchamber. A young man lies on his back on rumpled sheets, arm across his eyes. A dark-haired woman sits at the edge of the bed, pulling her dress back on, looking over her shoulder at him with tender concern. The room is disordered   clothes on the floor. Afternoon light. Atmosphere: the aftermath, tenderness and secrets, the last intimacy before transformation.

---

## CODE AGENT INTEGRATION SUMMARY

### Day -2 Additions:

| Item | Details |
|---|---|
| **New passage** | `day-2_scene_masturbation` |
| **New variable** | `$d2_npc_masturbation`, `$maleBaselineEstablished` |
| **Hub location** | Add to `day-2_chambers_explore`   NIGHT time slot |
| **Interaction card** | "The Body   Restless" |
| **Stats** | Stress -15, Energy -5, Arousal → 0 |
| **Flag** | Sets `$maleBaselineEstablished = true` |

### Day -1 Additions:

| Item | Details |
|---|---|
| **New passages** | `day-1_scene_sera_approach`, `day-1_scene_sera_sex`, `day-1_scene_masturbation` |
| **New variables** | `$d1_npc_sera`, `$seraEncountered`, `$seraIntimate`, `$d1_npc_lastjerk` |
| **New NPC** | Handmaiden Sera   add to NPC registry |
| **Sera hub location** | Add to `day-1_corridors` or `day-1_chambers_explore`   AFTERNOON |
| **Masturbation hub location** | Add to Night chambers   AFTER Rowan leaves, BEFORE mirror |
| **Sera stats** | Stress -20, Energy -10, Arousal → 0 |
| **Masturbation stats** | Stress -20, Energy -5, Arousal → 0 |
| **Ordering** | Sera (AFTERNOON) → Rowan visit (EVENING) → Masturbation OR Mirror (NIGHT). Both night options available; player picks order. |

### Updated File Structure:

```
AELINDRA/
├── engine/
│   └── passages/
│       └── npc/
│           ├── day-2_scene_masturbation.tw      ← NEW
│           ├── day-1_scene_sera_approach.tw      ← NEW
│           ├── day-1_scene_sera_sex.tw           ← NEW
│           └── day-1_scene_masturbation.tw       ← NEW
```

### Narrative Payoff:

If `$maleBaselineEstablished = true` AND/OR `$seraIntimate = true` on Day 1+, the post-transformation body discovery scenes can reference the baseline:

```html
/* In Day 1 body discovery passages: */
<<if $maleBaselineEstablished>>
  /* The narrative references how pleasure USED to feel   grip, stroke, build, edge, release */
  /* Creating contrast with the new body's unfamiliar arousal patterns */
<</if>>

<<if $seraIntimate>>
  /* The narrative references penetrating Sera   the memory of being INSIDE someone */
  /* Creating contrast with the new body's capacity to BE penetrated */
<</if>>
```

This transforms Day 1 from "discovering a new body" to "discovering a new body while remembering exactly what the old one could do." The contrast is the engine.
