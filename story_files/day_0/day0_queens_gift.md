# AELINDRA   Day 0 Main Scene Addition
## "The Queen's Gift"   Two Women, One Last Time
### First Person, Present Tense | Main Story Scene

---

## FILE METADATA

- **Day:** 0
- **Time Window:** EARLY MORNING (after waking, before Queen's Chambers goodbye)
- **Type:** MAIN SCENE   not side quest. Integrates into the Day 0 objective flow.
- **NPCs:** Handmaidens Veyla and Senna   sent by Queen Seraphina
- **Nature:** Farewell threesome. The Queen, in her ruthless pragmatic compassion, arranged this. She understands what her son is about to lose and has given him one last night as a man in the fullest sense.
- **Emotional Texture:** Hot, desperate, grieving. The sex is excellent. The grief woven through it is devastating. Every orgasm is a goodbye.

---

## INTEGRATION GUIDE

### Objective Flow Update for Day 0:

```
[EARLY MORNING   On Wake]
  MAIN: "A knock at the door   not a servant's knock" ← NEW (appears first)
  MAIN: "Say goodbye   the Queen's Chambers"
  MAIN: "When you're ready   cross the bridge"
  SIDE: (all existing side encounters)
```

### Hub Card   Add to Day 0 Chambers:

```html
<<if $dayNumber is 0 and not $d0_queens_gift>>
<div class="interaction-card main">
  <h4>👑 A Knock   Not a Servant's</h4>
  <p>Two knocks. Soft. Deliberate. A sealed note slides under the door. The Queen's seal. Inside: two words. "My gift."</p>
  [[Open the door → |day0_scene_queens_gift]]
</div>
<</if>>
```

### Variables:
```javascript
<<set $d0_queens_gift to false>>
<<set $veylaEncountered to false>>
<<set $sennaEncountered to false>>
<<set $queensGiftAccepted to false>>
```

---

## SCENE: `day0_scene_queens_gift`
## "The Queen's Gift"

Two knocks. Soft. Deliberate. Not Brin's nervous tap. Not Rowan's coded three-and-two. Something else   practiced, patient, the knock of someone who has been told to arrive and is arriving exactly on time.

A note slides under the door. Parchment. The royal seal   silver stag, crescent moon, the wax still warm. I pick it up. Break the seal.

Two words in my mother's handwriting. Steady. Deliberate. The penmanship of a queen who governs from her deathbed and leaves nothing unconsidered.

*My gift.*

I open the door.

Two women. Standing in the corridor, dressed not in servant's livery but in silk   deep blue and burgundy, the colours of the royal household's intimate staff. They are not handmaidens. They are something else   something the palace maintains but doesn't discuss openly. Companions. Trained in the arts of pleasure the way Aldric is trained in the art of the sword: professionally, thoroughly, with pride.

Veyla. Twenty-five. Tall   almost my height, which is unusual and striking. Auburn hair falling in loose waves past her shoulders. Green eyes. A body that is lean and elegant, long-limbed, with small high breasts and a waist that narrows into hips that curve with the precise geometry of a woman who knows exactly what her body does to a room when she enters it. She carries herself like a dancer   every motion calibrated, every gesture deliberate.

Senna. Twenty-three. Shorter, rounder, built on an entirely different blueprint. Dark skin, dark hair cropped close to her skull, brown eyes that are warm and direct and hold yours without flinching. Full breasts   genuinely full, the kind that strain against silk and create the deep shadow of cleavage that draws the eye like gravity. Wide hips. A generous ass that the burgundy silk drapes over like water over stone. She carries herself like a woman who has never once apologised for taking up space.

They stand in the corridor. They don't speak. They don't need to. The note said everything. My mother   dying, political, ruthless, loving   has sent me two women on the morning I walk to the tower to lose my body. She has given me the one thing she can give: a last experience of manhood in its fullest expression. A farewell performed in the language of flesh.

"The Queen sent you."

"Yes, Your Highness." Veyla's voice is low, smooth, a voice designed for dark rooms and close quarters. "She said you might need something to remember."

*Something to remember.* My mother knows. She knows what the Rite will take. She knows that the body walking into the Moonspire tonight will come out unable to do what the body in this doorway can do RIGHT NOW   take two women to bed and fuck them with the cock she's about to sacrifice on the altar of succession.

She's not being sentimental. She's being strategic. She's giving me a baseline so visceral, so physically overwhelming, that the memory of it will burn through whatever grief follows. She's arming me with pleasure the way Aldric arms me with a sword   as a tool, a defense, a thing to hold when the darkness comes.

**[PLAYER CHOICE:]**

```html
<div class="choice-cards">
  <div class="interaction-card main">
    <h4>Accept the gift</h4>
    <p>"Come in."</p>
    [[→ |day0_scene_queens_gift_sex]]
  </div>
  <div class="interaction-card">
    <h4>Decline</h4>
    <p>"Tell my mother... thank you. But I need to walk to that tower knowing I chose to walk, not that I was comforted into it."</p>
    [[→ |day0_hub]]
    /* $d0_queens_gift = true, $queensGiftAccepted = false */
  </div>
</div>
```

---

## SCENE (If accepted): `day0_scene_queens_gift_sex`

"Come in."

They enter. Veyla first, Senna behind, the door closing with a soft click that sounds like a period at the end of a sentence. The room is dim   pre-dawn light through the arrow-slits, the fire rebuilt overnight, the air warm and close. My bed is unmade. The ceiling crack is watching.

Veyla approaches first. She doesn't rush. She crosses the room with the measured stride of a woman who understands that anticipation is the first act of sex. She stops a foot from me. Her green eyes find mine. Her hand rises   fingers extending toward my face, stopping an inch short.

"May I?"

"Yes."

Her fingers touch my jaw. The sharp angle. The stubble I didn't shave. She traces the line of it   jawbone to chin, chin to throat, the Adam's apple that bobs when I swallow. She's mapping me. Learning the terrain. Her touch is light but absolute   she is committing this face to memory with the thoroughness of a cartographer.

"You have a beautiful jaw," she says. "Strong. Do you know it's the first thing most women notice?"

"Tomorrow it'll be different."

"Then I'll remember this one."

Senna moves behind me. Her hands find my shoulders   broad, muscled, still carrying the tension of three days of dread. She doesn't massage. She grips. Firm, possessive, her fingers digging into the trapezius with a pressure that says *I'm here, this body is real, feel it while it's yours.* Her breasts press against my back through the silk   full, warm, the undeniable mass of them flattening against my shoulder blades.

"Your mother told us what's happening," Senna says, her mouth close to my ear, her breath warm. "Not the details. Enough. She said her son is doing something brave and terrible and that he deserved one last morning as a man."

My throat closes. My mother. Even in this   even in the arrangement of a farewell fuck   she manages to be both devastating and pragmatic. She sent two women because one might not be enough. She sent a tall one and a short one because she doesn't know my preferences and she's covering the variables. She sent professionals because amateurs would be emotionally complicated and she wants this to be CLEAN   pleasure without attachment, sensation without aftermath.

She sent me a gift wrapped in silk and I'm standing between two women and my cock is hardening despite the grief because the body is twenty years old and it is being touched by four hands and it doesn't give a damn about context.

"Undress me," I say and then, because the word matters: "*Please.*"

Four hands. Veyla takes the jerkin   unlacing with deft fingers, pulling it over my shoulders. Senna takes the shirt from behind   lifting the hem, sliding it up my torso, her palms flat against my stomach and then my ribs and then my chest as the fabric rises. They work together with the synchronised precision of women who have done this before   maybe together, maybe separately, but certainly often enough that the choreography is instinct.

The shirt clears my head. I'm bare-chested. Veyla looks at me   the flat chest, the defined muscle, the trail of dark hair, the scar on the left ribcage. She presses her palm flat over my heart.

"Strong heartbeat."

"It's terrified."

"Good. Terrified hearts beat hardest."

Senna's hands find my waistband. The trousers loosen. She pushes them down   over my hips, my thighs, the fabric pooling at my ankles. I step out. Smallclothes next. Her fingers hook the waistband and draw them down and my cock springs free   hard, pointing, the head flushed and the shaft rigid. The exposure is total. Two clothed women and one naked man and the power dynamic should be in my favour   I'm the prince, they're the servants   but naked feels like the most vulnerable position in any room.

Senna's hand wraps around my cock from behind. Her grip is warm, firm, professional   the confident hold of a woman who has touched many cocks and is not intimidated by any of them. She strokes once. Base to head. A slow, evaluating pull that makes my hips jerk.

"Mmmm." A sound of approval. Not theatrical   genuine. "Your mother didn't mention the details, but the details are... noted."

Veyla kneels. Graceful   the descent of a dancer, knees folding, spine straight, her green eyes looking up at me from below. From this angle, she's looking up at my cock   the shaft rising from a dark thatch of hair, Senna's hand gripping the base, the head swollen and leaking a clear bead of pre-cum that catches the firelight.

"For the memory," Veyla says and opens her mouth.

Her lips stretch around the head. The heat of her mouth   wet, tight, the tongue pressing flat against the underside, the suction immediate and skilled. She takes three inches, four, the shaft sliding into the tight channel of her throat with a smooth, practiced motion that suggests she has trained this the way singers train their vocal cords   through repetition, through discipline, through a commitment to excellence that most people reserve for prayer.

"Aaahh " The moan exits me without permission. Low, male, the vibration of a baritone throat. Senna's hand works the base of the shaft   gripping what Veyla's mouth can't reach, the two women's hands and mouth creating a continuous landscape of sensation from root to head.

Senna's other hand cups my balls. Rolling them. Her fingers gentle but insistent, the soft manipulation sending secondary waves of pleasure that complement the primary wave of Veyla's mouth. Two distinct inputs. Two women working together. The sensation is architectural   a structure of pleasure being built by four hands and one mouth and the specific expertise that comes from doing this as a profession and caring about the craft.

*This is the last time someone will kneel for this cock.*

The thought arrives mid-blowjob and it DETONATES. The reality of it   the finality. Veyla is on her knees, my cock in her mouth, and by tonight the cock won't exist in this form. No one will ever kneel before THIS shaft again. No one will wrap their lips around THIS head, suck THIS frenulum, taste THIS pre-cum. The specific, irreplaceable experience of having my cock sucked   this cock, Edrin's cock, six inches of familiar tissue that has been mine for twenty years   ends today.

*And tomorrow? Tomorrow someone might kneel before ME and I'll be the one looking UP. The one with a cock in MY mouth. The one tasting salt-skin on MY tongue. The one whose jaw stretches, whose throat opens, whose eyes water *

"Stop." I pull Veyla off. Not roughly   gently, my hand in her auburn hair, lifting her. She looks up, lips slick, a strand of saliva connecting her mouth to my cock.

"Did I "

"No. You're perfect. I just   I need " I need to fuck. I need to be INSIDE someone. I need the full experience   penetration, depth, the grip of a woman's cunt around my cock   because that is the thing I'm about to lose and the blowjob is exquisite but it's not the thing.

"Both of you. On the bed."

They move. Veyla rises, unclasping her dress   the blue silk falling in a pool at her feet. Naked: long, lean, small breasts with pale pink nipples, a narrow strip of auburn hair between her legs, legs that go on for miles. She's beautiful the way a blade is beautiful   elegant, dangerous, precise.

Senna undresses beside her. The burgundy silk drops. Naked: round, generous, dark skin glowing in the firelight. Her breasts are heavy   full D-cups, the nipples large and dark, the weight of them shifting as she moves with a liquid inertia that is hypnotic. Her hips are wide, her ass round and full, the dark hair between her legs dense and inviting. She's beautiful the way a fire is beautiful   warm, consuming, impossible to look away from.

Two women. Naked. On my bed. One long and lean, one round and full. One fair, one dark. My mother sent me the full spectrum, and the sight of them   sprawled, waiting, open   makes my cock ache with a desperation that is not just lust but farewell.

*Look at them. Their breasts   Veyla's small and high, Senna's full and heavy. In twelve hours, I'll have breasts. Mine. Growing on MY chest. The nipples will be sensitive and the tissue will swell and the weight will settle and I'll KNOW what Senna feels when she lies on her back and they spread to the sides and *

*Their hips. Wide. Both of them   wide hips, the flare of pelvis, the curve of waist to hip that evolution carved specifically for this purpose. MY hips will widen. The bones will spread. The waist will narrow. I'll have that ratio. That curve. That sway when I walk.*

*Between their legs. The folds, the wetness, the dark hair, the pink within. I'll have THAT. A cunt. A vagina. Labia and clitoris and a canal that leads to a uterus and I'll be WET the way they're wet and I'll open the way they open and *

"Edrin." Senna's voice. She's propped on her elbow, watching me stare. "Come here. Stop thinking."

She's right. Stop thinking. The body has six hours left. Use them.

I climb onto the bed. Between them. Their bodies close in from both sides   Veyla on the left, Senna on the right, warm skin pressing against mine from shoulder to thigh. Veyla's small breasts against my arm. Senna's full breasts pillowing against my chest. Four legs tangling with my two. Hands everywhere   Veyla's on my stomach, Senna's gripping my cock, mouths on my neck, my jaw, my ears.

I kiss Veyla. Her mouth is still slick from the blowjob   I can taste myself on her tongue, salt and musk, and the taste is strange and erotic and MINE. I kiss her deep, my hand in her hair, and she moans against my mouth   "mmhh"   a sound I feel more than hear.

Senna's mouth finds my chest. My nipple. She sucks   not gently, with intent   and the sensation shoots through my body like a wire pulled taut. My nipples have never been particularly sensitive. But Senna's mouth   the suction, the pressure of her tongue circling the flat disc of my areola   finds something there. A spark. A hint of what the new body's nipples will feel like, magnified a hundredfold.

*My nipples will be bigger. Wider. Darker and the sensitivity   Ilara said the sensitivity increases tenfold. If THIS spark from Senna's mouth is what my flat male nipple feels, what will swollen, developing, FEMALE nipples feel? What will it feel like when someone sucks a breast that *

"Enough." I roll Senna onto her back. She goes willingly   spreading beneath me, her thighs opening, her hips canting upward. The invitation is total and unapologetic. Her cunt is wet   I can see it glistening, the dark folds parted, the inner labia slick and swollen. The smell reaches me   warm, musky, the fundamental scent of female arousal that is as old as the species and as new as this moment.

I position myself. The head of my cock finds her entrance   the wet heat of it, the labia parting around the head, the moment of pressure before the body opens and accepts and I slide INTO her.

"Ohhh " Senna's moan is deep, chest-deep, the sound of a woman receiving a cock and FEELING it. Her eyes close. Her thighs grip my hips. I push deeper   inch by inch, feeling her cunt stretch around me, the walls tight and wet and gripping, the heat absolute.

*This. THIS. The sensation of being INSIDE. The tight grip of a woman's cunt around my shaft. The wet heat. The friction when I pull back and the suction when I push in. This is what I'm losing. This is the last time my cock will feel this   will BE inside someone, will be gripped and held and *

*And tomorrow? Tomorrow I'll be the one gripping. Not with my hand   with my CUNT. The one that doesn't exist yet. Someone's cock inside ME, pushing, stretching, filling the canal that the Rite will build, and I'll feel what Senna is feeling RIGHT NOW   the fullness, the depth, the moan *

I thrust. Hard. The thought accelerates me   drives me deeper, faster, the desperation transforming into rhythm. Senna takes it   her hips rising to meet each stroke, her hands on my back, nails dragging, her moans climbing: "Ah   AH   ahhh, yes, ohh "

Veyla moves behind me. Her body presses against my back   her breasts against my shoulder blades, her mouth on my neck, her hand reaching around to find Senna's clit while I fuck her. I feel Veyla's fingers working the small nub above where my cock slides in and out, and Senna's response is IMMEDIATE   the cunt tightens around me, the inner walls clenching, and Senna arches with a cry: "AAAH, oh god, oh "

The triple sensation   my cock in Senna, Veyla's body behind me, Veyla's hand on Senna's clit creating ripple effects I feel through the cunt gripping my shaft   is overwhelming. Three bodies. Six hands. The architecture of pleasure built on a foundation of farewell.

"Switch." Veyla's voice at my ear. A suggestion. A command. Both.

I pull out of Senna   the withdrawal making her gasp, the cock emerging slick and glistening. Veyla takes Senna's place   lying back, long legs spreading, and her cunt is different. Tighter. Narrower. The auburn hair a trim strip pointing downward. She's wet but differently   less volume, more viscosity, a slickness that makes my cock slide against her entrance before finding the angle.

I push in. Veyla is tight   genuinely tight, the canal narrower, the walls pressing inward, and the friction is INTENSE. She hisses   "ssss, ahh"   her teeth bared, her green eyes open and fixed on mine. She doesn't close her eyes. She watches. She watches me fuck her the way she watched me from across the room   with calculation and hunger in equal measure.

Senna positions herself above Veyla's face. Kneels over her, thighs framing Veyla's head, and Veyla's mouth finds Senna's cunt   tongue lapping, lips sucking, the wet sounds of a woman eating another woman mixing with the wet sounds of my cock in Veyla's cunt. The visual is pornographic and sacred and everything at once: a daisy chain of bodies, my cock in one woman while she pleasures another with her mouth, and the sounds   the moans, the slurps, the gasps, the slap of my hips against Veyla's thighs   fill the dim room like music.

*The sounds. Listen to them. Senna's moan: "ohh, ohh, right there." Veyla's muffled groan, mouth full of cunt. The wet sound of my cock in a body that grips it.*

*These will be MY sounds. My moans. My gasps. The high, breathy sounds of a woman being fucked and the deep, spreading sounds of a woman being eaten and I'll make ALL of these sounds because the body I'm getting will MAKE them. The vocal cords will be thinner and the moans will be higher and the pleasure will be different   not the concentrated shaft-based shoot-outward orgasm of a man but the deep, spreading, whole-body waves of a woman and *

I thrust harder. Faster. Veyla's cunt is a vise around my cock. Senna is riding Veyla's face, her thick thighs clenching, her full breasts bouncing with each rock of her hips. The room is hot. The fire crackles. The bed creaks. The ceiling crack watches. Everything is sensation and skin and the desperate mathematics of trying to convert a body's last morning into enough memory to last a lifetime.

Senna comes first. On Veyla's tongue   her orgasm a full-body event, her thighs clamping around Veyla's head, her spine arching, her breasts lifting, her mouth open in a scream she reduces to a strangled "NNNGH, ah, AHHH " Her cunt contracts against Veyla's mouth   I can't feel it but I can SEE it, the spasm visible in her thighs, her ass, the rhythmic clenching of her pelvic floor.

*That. That full-body clench. The contraction that starts inside and radiates outward. That's what a woman's orgasm looks like from the outside. From the INSIDE   what does it feel like? What will it feel like when MY vagina contracts? When MY pelvic floor clenches? When the pleasure doesn't shoot OUT through a shaft but rolls THROUGH a body like a wave breaking across a shore?*

Veyla comes second. I feel it   the cunt tightening around my cock in rhythmic waves, the walls clenching and releasing, clenching and releasing, milking the shaft with contractions that are involuntary and perfect. Her eyes finally close. Her head tips back. Her mouth   wet with Senna's cum   opens and the sound that comes out is raw: "Ohhhh, oh FUCK, I'm   ahh "

I come.

The orgasm is tidal. Not a wave   a tsunami. The kind that starts deep in the ocean and travels vast distances before it hits land and when it hits, it hits with accumulated force. My cock spasms inside Veyla   six inches of tissue performing its last great act, the cum erupting in thick, heavy pulses that I can feel traveling the length of the shaft and exploding out, filling her, the heat of it mixing with the heat of her cunt. My balls clench   drawn tight, emptying, the testes contracting with a force that makes my lower back arch and my vision white out.

"FFFUCK   aahh, ahh " The moan is deep. Baritone. Male. The last time my throat will make that sound at that pitch in that register. The last male orgasm in a room that smells of sex and sweat and three bodies and the fire and the predawn dark.

I collapse. On Veyla. Between them. Three bodies in a heap on sheets that are ruined   wet with sweat and cum and the slickness of three aroused bodies and the specific humidity of a room where three people have been fucking with the urgent desperation of people who know that time is running out.

We breathe. My cock softens inside Veyla   the slow deflation, the gradual withdrawal as the erection fades and the shaft shrinks back to its resting state. She shifts her hips and I slip out   the exit marked by a small, wet sound and a thin thread of cum that connects us for a moment before gravity breaks it.

Senna presses against my back. Her breasts warm against my spine. Her arm over my waist. Veyla beneath me, her lean body accepting my weight, her hand in my hair.

Silence. Three people breathing. The fire popping. The dawn approaching.

"Your mother was right," Veyla says. Her voice is quiet. Her hand strokes my hair   the hair that will be longer tonight, darker, different. "You should remember this."

"I'll remember."

"Everything?"

"Everything."

They dress. Efficiently, professionally   the transition from naked to clothed performed with the practiced ease of women who do this regularly and consider the departure as much a part of the service as the arrival. Senna straightens the sheets. Veyla collects the silks. At the door, they pause.

"Your Highness." Senna's voice, warm, steady. "Whatever happens today   the body that did what it just did? That body was worth remembering."

They leave. The door closes. The room is quiet and smells of sex and the dawn light is stronger now   grey becoming gold, the arrow-slits filling with the first real light of the last morning.

I lie on the ruined sheets. Cock soft and spent and wet. Cum drying on my stomach. The ghost-warmth of two women's bodies fading from the linen.

Six hours.

My mother's gift: a memory etched in flesh. Two women. Three orgasms. The full spectrum of male sexual experience compressed into a single dawn   blowjob, penetration, dual stimulation, the sights and sounds and smells and tastes of sex performed with the body that's about to be surrendered.

I shower in the basin. Cold water. The cum washes off. The memory doesn't.

I dress. Jerkin. Boots. Sword belt.

I open the door. The corridor is quiet. The walk to my mother's chambers begins.

The body that just fucked two women walks toward the tower that will unmake it.

---

## STATS

| Stat | Change |
|---|---|
| **Stress** | -25 (massive physical release) |
| **Energy** | -15 (exertion) |
| **Arousal** | → 0 (fully spent) |
| **RES** | +3 (the memory is armour) |
| **$d0_queens_gift** | true |
| **$queensGiftAccepted** | true |
| **$veylaEncountered** | true |
| **$sennaEncountered** | true |
| **$maleBaselineEstablished** | true (maxed) |

---

## NPC PROFILES

### Veyla
| Detail | Description |
|---|---|
| **Age** | 25 |
| **Appearance** | Tall, lean, auburn hair, green eyes. Small high breasts, long legs. Dancer's body. |
| **Role** | Royal companion   trained in pleasure arts. Reports to the Queen's household. |
| **Personality** | Precise, observant, economical with words. Treats sex as craft. |
| **Post-transformation** | Available as a recurring NPC. She's seen Edrin's body at its most intimate. Meeting Aelindra, she'll recognise the eyes. Potential for a scene where she teaches Aelindra about the female body from the perspective of someone who knew the male one. |

### Senna
| Detail | Description |
|---|---|
| **Age** | 23 |
| **Appearance** | Shorter, dark skin, cropped hair, brown eyes. Full D-cup breasts, wide hips, generous ass. |
| **Role** | Royal companion. Same household as Veyla. They work as a pair. |
| **Personality** | Warm, direct, physically confident. Unapologetic about her body and her work. |
| **Post-transformation** | Same as Veyla   recurring NPC. Potential for a scene where Aelindra looks at Senna's body and sees echoes of her own new proportions. |

---

## IMAGE PROMPTS

### IMG_D0_GIFT_001: The Door
**Prompt:** A palace chamber door, early morning. A sealed parchment note slides under the gap   royal wax seal visible. On the other side of the door, two silhouettes in silk (one tall and lean, one shorter and curvy) wait in the torch-lit corridor. Dawn light through a distant window. Atmosphere: a gift arriving, the weight of what's offered, the last kindness before the tower.

### IMG_D0_GIFT_002: Three Bodies
**Prompt:** Three figures on rumpled sheets in a dim bedchamber lit by firelight. A young dark-haired man lies between two women   one lean and auburn-haired, one dark-skinned and full-figured. The composition implies post-intimacy without explicit content: tangled limbs, scattered silk, warm skin. The man's expression is not satisfaction   it's the devastated tenderness of someone memorising the moment. Dawn light beginning through arrow-slit windows. Atmosphere: the last morning, pleasure as farewell, three bodies holding each other against what's coming.

---

## NARRATIVE PAYOFF

| This Scene | Future Callback |
|---|---|
| Veyla's blowjob   being sucked | Day 30+: Aelindra considers giving a blowjob   remembers receiving from Veyla, now must perform |
| Penetrating Senna   fullness, depth, grip | Day 21+: Being penetrated for the first time   remembers being inside Senna, now experiences the inverse |
| Senna's orgasm   watching female climax from outside | Day 7+: First female orgasm   experiencing from INSIDE what she watched from outside |
| Veyla's cunt tightening around his cock | Day 21+: Her own vagina contracting during orgasm   the same sensation, from the other side |
| Three-body architecture   the geometry of pleasure | Day 50+: Group sex as Aelindra   same geometry, different body, different role |
| "Remember this"   Veyla's instruction | Recurring internal monologue   the memory surfaces during post-transformation sexual encounters |
| Intrusive thoughts during sex (breast anxiety, penetration preview) | All post-transformation sex   the baseline comparison is always present |

---

## CODE AGENT   OBJECTIVE FLOW UPDATE

The Queen's Gift scene should appear as the FIRST available interaction on Day 0 morning, before the Queen's Chambers goodbye. The narrative logic: Seraphina arranged the gift to arrive at dawn, before Edrin comes to say goodbye. She wanted him to have the experience BEFORE the farewell   pleasure first, then grief, then the tower. The sequencing is strategic, like everything she does.

```
[DAY 0 MORNING   Updated Flow]
  MAIN: "A knock   not a servant's" (Queen's Gift) ← First available
  MAIN: "Say goodbye   Queen's Chambers" ← Available after gift (or independently)
  MAIN: "Cross the bridge   when ready" ← Always visible
  SIDE: (all existing encounters) ← Available throughout morning
```

If the player DECLINES the gift, the scene sets `$queensGiftAccepted = false` and Edrin's internal monologue in later scenes references the refusal: *My mother sent me a gift and I turned it away. I don't know if that was integrity or cowardice. Both, maybe.*

If the player ACCEPTS, the post-coital state carries into the Queen goodbye scene   Edrin walks to his mother's chambers with the smell of sex still on his skin and the taste of two women still in his mouth and the guilt of walking from a bed of pleasure to a bed of illness, from women he chose to the woman who chose for him.
