# Case-study drafts — eemonroy-style framing, ElevenLabs design

Three projects from your zip, written in the researcher's spirit: a narrative hook,
a reframe, a simple framework, then outcome + a closing idea. First-person, punchy,
concise where it can be and elaborate only where the idea needs it. **Drafts — edit
freely before I wire them in.**

---

## 1 — tldraw flash  ·  *ongoing*
**Role:** Product & interaction design (solo) · **Context:** R&D exploration at tldraw

### Hook
Animation software asks you to *describe* motion — keyframes, easing curves, dope
sheets. Nobody moves that way. A kid making a flipbook doesn't set a keyframe. They
just… move the thing.

### The problem
Every 2D animation tool I studied — After Effects' puppet tool, Procreate Dreams,
StickNodes, Pivot — is powerful and slow. The timeline is the first thing you meet
and the last thing you master. For a canvas-native tool like tldraw, that felt wrong.

**So I stopped designing a timeline.**

### The idea: the motion *is* the take
tldraw flash records performance, not parameters. You drag a character across the
canvas and that drag — its path, its speed — is the animation. Grab the torso and the
whole puppet walks; grab a limb and it swings. You handle a drawing like a physical
puppet.

Then you build in layers, **one thing per pass**:

| Pass | You add |
|---|---|
| 1 | A character's walk (drag it across the stage) |
| 2 | A second character, while the first plays back live |
| 3 | A camera move — drag the frame to pan, drag a corner to push in |
| 4 | A voice-over, spoken onto the shared clock |
| 5 | Expressions & gestures — tap "happy", tap "wave" |

### The one editing model: punch-in
No trim, no retiming, no speed curves. If you flub, you scrub to it, grab just the
arm, and re-record *that channel* from the playhead forward. Everything before is
untouched; the walk is kept. You never adjust a curve — you re-perform. One model,
learned once.

### Structure: the filmstrip is the monitor
Press `+` and a new card is born holding everyone's ending pose — a snapshot, not a
live link. Change only what's different, drag cards to reorder, and a master playhead
plays card 1 → card 2 → … Each card's thumbnail *is* the camera view.

### Where it is now
V1 ships the ready-made puppet tray, the record→perform→layer loop, camera framing,
and MP4 export. Rigging-your-own "tl-man" from a drawing and a draw-your-own-props set
are in exploration.

### What I'm taking from it
The hardest part wasn't the tech — it was having the discipline to *remove* the
timeline everyone expects. Constraints didn't limit the tool; they gave it a voice.

**Visuals:** interface demo (canvas + collections + timeline), user-flow map, the
wireframing research board, sample animation output.

---

## 2 — gofresh  ·  *Gartner Case Competition — Winner*
**Role:** Product design, systems thinking · **Context:** Case competition, food-waste brief

### Hook
A third of the food produced never gets eaten. In a supermarket, the villain isn't
the shopper — it's the moment a perfectly good croissant crosses an invisible line and
gets binned. What if that line became a discount instead of a decision?

### The problem
Food-rescue apps put the whole burden on the consumer: go find the deal, go to the
store, feel good about it. But the surplus is *created* at the till, by staff, under
time pressure. Designing only the consumer side solves half the loop.

**So I designed both sides of the same system.**

### The system: two surfaces, one goal

**GoFresh (consumer app).** Near-expiry groceries surfaced as offers — 80% off that
Mediterranean pasta, 40% off the garden salad — with "find nearest store" and a
countdown that reads as *rescue this*, not *hurry up*. An Impact tab turns the abstract
into the personal: "12.4 kg of CO₂e saved," a monthly goal, rewards.

**SmartTill (retail POS + expiry manager).** *Every scan saves something.* The till
auto-flags stock as `REDUCED · 2 days`, drops the price, and shows the CO₂ avoided on
the receipt line. Staff get an Expiry Manager, a Learn module, and Analytics — waste
becomes a number they can watch fall ("7 items reduced today").

### Why it won
It treated food waste as a supply-chain loop, not a shopping feature. The consumer app
creates demand; the till creates supply and measures it. Same currency on both ends —
CO₂e — so the impact is legible to a shopper *and* a store manager.

### What I'm taking from it
Sustainability features fail when they ask people to be virtuous. This worked because
saving money and saving carbon were the *same tap*. Design the incentive, not the
guilt.

**Visuals:** consumer app flows (market, impact tracker), SmartTill POS + expiry
manager screens.

---

## 3 — folio  ·  *Canva Hackathon — Winner*
**Role:** Product & visual design · **Context:** Hackathon, build sprint

### Hook
Everyone says "just make a portfolio." Then you open a blank canvas and freeze. The
gap isn't talent — it's the first ten minutes.

### The problem
Portfolio builders hand you infinite freedom and zero momentum. Templates feel
generic; from-scratch feels endless. For a hackathon audience of students and
creatives, the win wasn't more features — it was getting to a *first draft* fast.

**So folio optimizes for momentum, not options.**

### The idea: from "build your portfolio" to "here's your portfolio"
A single, confident entry point — `Build now` — and a guided flow that turns your
work into a laid-out site (web + app views) instead of a blank page. The signature
gradient orb isn't decoration; it's the "generating" moment made calm and alive, so
the wait feels like magic instead of loading.

### What I designed
- A card-first concept for arranging work as modular blocks
- A responsive layout system that reflows the same content between website and app
- A landing flow tuned so the very first interaction produces something you'd keep

### Outcome
Built and shipped in a hackathon sprint — and it won. The judges responded to the
same thing users did: it removed the blank-page tax.

### What I'm taking from it
Speed is a feeling, and it's designable. The most valuable thing folio gives isn't a
template — it's permission to start.

**Visuals:** landing + gradient orb, card concept, mobile & website layouts.

---

## Notes for implementation
- **Media:** the demo recordings are `.mov` (some 44–80 MB, Safari-only) — too heavy /
  incompatible for the web as-is. I'll use the poster frames + the smaller `.mp4`s now
  and flag the large clips for compression to web-friendly MP4 (needs ffmpeg, which
  this environment lacks — I can guide you, or we host them elsewhere).
- **Scope:** do these three **replace** the current projects (impermanence, memory
  distortion box, plastic panic, air purifier), or sit **alongside** them?
