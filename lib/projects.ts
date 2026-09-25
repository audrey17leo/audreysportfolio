export type ProcessSection = {
  title: string
  body: string
  image?: string
  imageCaption?: string
  image2?: string
  imageCaption2?: string
  video?: string
  table?: { head: [string, string]; rows: [string, string][] }
}

export type ReflectionItem = {
  title: string
  body: string
}

export type Project = {
  // Works grid (cards)
  slug: string
  title: string
  subtitle: string
  tags: string[]
  bg: string
  heroImage: string

  // Case study
  h1: string
  subtitleParagraph: string
  year: string
  scope: string
  role: string
  showcaseImages: string[]

  problemSpaceHeading: string
  problemSpace: string

  conceptHeading: string
  concept: string

  processSections: ProcessSection[]

  meetTheWork: string
  finalImages: { src: string; caption: string; isVideo?: boolean }[]

  reflectionHeading: string
  reflection: ReflectionItem[]
  sourceCode?: { url: string; label: string }
  liveUrl?: { url: string; label: string }
  sectionLabels?: {
    problemSpace?: string
    concept?: string
    process?: string
    finalDesign?: string
    reflection?: string
  }
}

export const projects: Project[] = [
  // ── TLDRAW FLASH ──────────────────────────────────────────────────────────
  {
    slug: 'tldraw-flash',
    title: 'tldraw flash',
    subtitle: 'A canvas-native animation tool where you perform motion instead of keyframing it — record, layer one thing per pass, punch-in to fix.',
    tags: ['Product Design', 'Interaction', 'Ongoing'],
    bg: '#dfe8fb',
    heroImage: '/projects/tldraw-demo.jpg',

    h1: 'An animation tool where the motion is the take',
    subtitleParagraph: 'tldraw flash turns the infinite canvas into a stage. Instead of setting keyframes, you drag a drawing across the screen and that performance becomes the animation — then you layer the scene one thing at a time. An ongoing R&D exploration built on tldraw.',
    year: '2025 — Ongoing',
    scope: 'Product & Interaction Design\nR&D Exploration',
    role: 'Solo. Concept, interaction model, competitive research, and prototype.',
    liveUrl: { url: 'https://tldrawflash.com', label: 'tldrawflash.com' },
    showcaseImages: ['/projects/tldraw-demo.jpg'],

    problemSpaceHeading: 'Animation software asks you to describe motion. Nobody moves that way.',
    problemSpace: 'Keyframes. Easing curves. Dope sheets.\nEvery serious 2D tool front-loads the hardest idea in the craft.\n\nI studied the whole shelf — After Effects, Procreate Dreams, StickNodes, Pivot, even the motion paths hiding inside Canva and Keynote. All powerful. All slow.\n\nThe pattern was quiet but total: **the tools people find fun hide the timeline. The tools people find capable expose it.**\n\ntldraw is a canvas, and a canvas is for playing. So I stopped trying to make a better timeline — and started designing a performance.',

    conceptHeading: 'The motion is the take.',
    concept: 'tldraw flash records performance, not parameters.\n\nYou drag a drawing across the canvas.\nThat drag — its path, its speed — **is** the animation.\nGrab the torso and the whole puppet walks. Grab a limb and it swings.\nYou handle a drawing the way you would handle a puppet.\n\nThen the scene builds the way a scene actually gets built — **one thing per pass.** A second character while the first plays back live. A camera move. A voice-over on the shared clock. An expression, tapped in on the beat.',

    processSections: [
      {
        title: 'First I mapped every way people already fake motion',
        body: 'Before a single screen, I asked a smaller question:\n**how do people animate when they aren’t really trying to?**\n\nI mapped the whole range — from professional (After Effects’ as-rigid-as-possible puppet deforms) to playful (Pivot’s stickman rig, joint points and origin points) to accidental (the drag-a-path animation buried in Canva and PowerPoint).\n\nOne line ran through all of it. The fun tools hide the timeline; the capable tools expose it. tldraw flash had to be both — so the interaction, not the timeline, had to carry the whole model.',
        image: '/projects/tldraw-wireframe.png',
        imageCaption: 'Interaction research + early wireframing — Canva, Keynote, After Effects, StickNodes, Pivot, Procreate Dreams, and the mechanisms pulled from each.',
      },
      {
        title: 'The loop — record, then layer one thing per pass',
        body: 'Drag a character onto the canvas. Press record; a three-second count-in plays.\nDrag it across the stage — **that motion is the take.**\nPress play, and it repeats, holding its last pose.\n\nThen the scene builds up, one channel at a time:',
        table: {
          head: ['Pass', 'What you add'],
          rows: [
            ['1', 'A character’s walk — drag it across the stage'],
            ['2', 'A second character, while the first plays back live'],
            ['3', 'A camera move — drag the frame to pan, a corner to push in'],
            ['4', 'A voice-over, spoken onto the shared clock'],
            ['5', 'Expressions & gestures — tap “happy”, tap “wave”'],
          ],
        },
        image: '/projects/tldraw-flow.png',
        imageCaption: 'V1 flow — the record→layer loop, the punch-in edit model, and the filmstrip structure.',
      },
      {
        title: 'One editing model: punch-in',
        body: 'No trim. No retiming. No speed curves.\n\nFlub a take? Scrub to it, grab just the arm, and re-record **that channel from the playhead forward.** Everything before it is untouched — the walk you liked is kept.\n\nYou never adjust a curve. You re-perform.\nOne model, learned once, true everywhere — and the reason the whole tool stays teachable. Scenes chain as a filmstrip, where each card’s thumbnail *is* the camera view.',
      },
    ],

    meetTheWork: 'V1 ships the ready-made puppet tray, the record→perform→layer loop, camera framing, and MP4 export. Rigging your own “tl-man” from a drawing and a draw-your-own-props set are in active exploration.',
    finalImages: [
      { src: '/projects/tldraw-sample.mp4', caption: 'Sample output — a scene performed and layered on the canvas.', isVideo: true },
      { src: '/projects/tldraw-demo.jpg', caption: 'The interface — collections tray, camera framing, and the crude scrub timeline.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'The discipline was in what I removed',
        body: 'The hard part was never the tech.\nIt was resisting the timeline everyone expects — and trusting that one editing model could do the work of a dozen.\n\nConstraints didn’t limit the tool. They gave it a voice.',
      },
      {
        title: 'The interaction is the manual',
        body: 'When drag means record and grabbing a limb means posing it, there is almost nothing left to teach.\n\nThe best documentation is a gesture that means the obvious thing.',
      },
    ],
    sectionLabels: {
      problemSpace: 'THE PROBLEM',
      concept: 'THE IDEA',
      process: 'HOW IT WORKS',
      finalDesign: 'WHERE IT IS NOW',
      reflection: 'REFLECTION',
    },
  },

  // ── GOFRESH ───────────────────────────────────────────────────────────────
  {
    slug: 'gofresh',
    title: 'gofresh',
    subtitle: 'A two-sided food-waste system — a consumer rescue app and a smart retail till — measured in the same currency: CO₂ saved.',
    tags: ['Product Design', 'Systems', 'Gartner Winner'],
    bg: '#e9f1ec',
    heroImage: '/projects/gofresh-app.jpg',

    h1: 'Turning the expiry line into a discount, not a decision',
    subtitleParagraph: 'A third of the food we produce is never eaten. gofresh treats supermarket waste as a supply-chain loop rather than a shopping feature — pairing a consumer rescue app with a retail till that discounts near-expiry stock automatically. Winner, Gartner Case Competition.',
    year: '2024',
    scope: 'Product Design\nSystems Thinking',
    role: 'Case competition. Product design, system framing, and prototype.',
    showcaseImages: ['/projects/gofresh-app.jpg'],

    problemSpaceHeading: 'The surplus isn’t created by the shopper. It’s created at the till.',
    problemSpace: 'Most food-rescue apps put the whole burden on the consumer: go find the deal, go to the store, feel virtuous. But the surplus is *created* upstream — by staff, under time pressure, at the moment a perfectly good croissant crosses an invisible expiry line and gets binned. Design only the consumer side and you solve half the loop. **So I designed both sides of the same system.**',

    conceptHeading: 'Two surfaces, one goal, one currency.',
    concept: 'gofresh is a consumer app *and* a retail till that share a single metric — CO₂ avoided — so the impact is legible to a shopper and a store manager at once. The app creates demand for rescued food; the till creates the supply and measures it. Saving money and saving carbon become the same tap.',

    processSections: [
      {
        title: 'gofresh — the consumer side',
        body: 'Near-expiry groceries surface as offers, not afterthoughts — 80% off the Mediterranean pasta, 40% off the garden salad — each with “find nearest store” and a countdown framed as *rescue this*, not *hurry up*. An **Impact tab** makes the abstract personal: “12.4 kg of CO₂e saved,” a monthly goal, and rewards that turn a good habit into a streak worth keeping.',
        image: '/projects/gofresh-app.jpg',
        imageCaption: 'The market and impact tracker — discounts framed as rescue, savings framed as carbon.',
      },
      {
        title: 'SmartTill — the retail side',
        body: 'Every scan saves something. The till auto-flags stock as **REDUCED · 2 days**, drops the price, and shows the CO₂ avoided right on the basket line. Staff get an Expiry Manager, a Learn module, and Analytics — so “waste” stops being a loss written off at close and becomes a number they can watch fall in real time (“7 items reduced today”).',
        image: '/projects/gofresh-till.jpg',
        imageCaption: 'SmartTill — point of sale, expiry management, and a live food-waste-savings readout.',
      },
    ],

    meetTheWork: 'One system, two surfaces: demand and supply speaking the same language. The consumer app makes rescued food desirable; the till makes it effortless to create and impossible to ignore.',
    finalImages: [
      { src: '/projects/gofresh-till.jpg', caption: 'SmartTill — waste becomes a measured, falling number.' },
      { src: '/projects/gofresh-app.jpg', caption: 'gofresh app — the rescue market and personal CO₂ impact.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'Design the incentive, not the guilt',
        body: 'Sustainability features fail when they ask people to be virtuous. This one worked because the sustainable choice and the cheap choice were the same choice — on both sides of the counter.',
      },
      {
        title: 'A metric only matters if both ends can read it',
        body: 'Putting CO₂e on the shopper’s Impact tab *and* the manager’s analytics made a single number do the persuading — no lecture required.',
      },
    ],
    sectionLabels: {
      problemSpace: 'THE PROBLEM',
      concept: 'THE SYSTEM',
      process: 'THE TWO SURFACES',
      finalDesign: 'THE WORK',
      reflection: 'REFLECTION',
    },
  },

  // ── FOLIO ─────────────────────────────────────────────────────────────────
  {
    slug: 'folio',
    title: 'folio',
    subtitle: 'A portfolio builder that optimises for momentum over options — from blank page to a first draft you’d actually keep.',
    tags: ['Web App', 'Visual Design', 'Canva Winner'],
    bg: '#efeaff',
    heroImage: '/projects/folio-web.jpg',

    h1: 'From “build your portfolio” to “here’s your portfolio”',
    subtitleParagraph: 'Everyone tells creatives to make a portfolio, then hands them a blank canvas and walks away. folio removes the blank-page tax — a guided web app that turns your work into a laid-out site in the first ten minutes. Built and won in a hackathon sprint. Winner, Canva Hackathon.',
    year: '2024',
    scope: 'Product & Visual Design',
    role: 'Hackathon. Product design, visual design, and build.',
    showcaseImages: ['/projects/folio-web.jpg'],

    problemSpaceHeading: 'The gap isn’t talent. It’s the first ten minutes.',
    problemSpace: 'Portfolio builders hand you infinite freedom and zero momentum. Templates feel generic; from-scratch feels endless; both leave you staring at an empty page. For a hackathon audience of students and creatives, the win was never going to be *more features* — it was getting someone to a **first draft** they’d want to keep. **So folio optimises for momentum, not options.**',

    conceptHeading: 'Speed is a feeling, and it’s designable.',
    concept: 'A single, confident entry point — “Build now” — and a guided flow that assembles your work into a laid-out site instead of a blank canvas. The signature gradient orb isn’t decoration; it’s the “generating” moment made calm and alive, so the one unavoidable wait feels like magic instead of loading.',

    processSections: [
      {
        title: 'A card-first way to arrange work',
        body: 'Work becomes modular blocks you can rearrange, rather than sections you have to format. The card concept made the very first interaction *productive* — drop your pieces in, and the layout already looks intentional.',
        video: '/projects/folio-concept.mp4',
        imageCaption: 'Card concept — arranging work as modular, rearrangeable blocks.',
      },
      {
        title: 'One system, two views',
        body: 'The same content reflows between a website and an app layout, so a portfolio built once reads well everywhere. Designing the responsive system up front is what let the flow stay simple: you make decisions about *work*, not about breakpoints.',
        image: '/projects/folio-mobile.jpg',
        imageCaption: 'The responsive layout reflows the same content between website and app.',
      },
    ],

    meetTheWork: 'Built and shipped in a hackathon sprint — and it won. Judges responded to the same thing users did: it removed the friction between having work and having a portfolio.',
    finalImages: [
      { src: '/projects/folio-concept.mp4', caption: 'The build flow — from entry point to a first, keepable draft.', isVideo: true },
      { src: '/projects/folio-web.jpg', caption: 'The landing moment — one confident action, and the generating orb.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'Momentum is a feature',
        body: 'The most valuable thing folio gives isn’t a template — it’s permission to start. Designing the first ten minutes did more for the experience than any amount of customisation would have.',
      },
    ],
    sectionLabels: {
      problemSpace: 'THE PROBLEM',
      concept: 'THE IDEA',
      process: 'WHAT I DESIGNED',
      finalDesign: 'THE WORK',
      reflection: 'REFLECTION',
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const idx = projects.findIndex(p => p.slug === slug)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
}
