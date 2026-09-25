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
    subtitle: 'A canvas-native animation tool where you perform motion instead of keyframing it, record, layer one thing per pass, punch-in to fix.',
    tags: ['Product Design', 'Interaction', 'Ongoing'],
    bg: '#dfe8fb',
    heroImage: '/projects/cover-tldraw.jpg',

    h1: 'An animation tool where the motion is the take',
    subtitleParagraph: 'tldraw flash turns the infinite canvas into a stage. Instead of setting keyframes, you drag a drawing across the screen and that performance becomes the animation, then you layer the scene one thing at a time. An ongoing R&D exploration built on tldraw.',
    year: '2025 · Ongoing',
    scope: 'Product & Interaction Design\nR&D Exploration',
    role: 'Solo. Concept, interaction model, competitive research, and prototype.',
    liveUrl: { url: 'https://tldrawflash.com', label: 'tldrawflash.com' },
    showcaseImages: ['/projects/cover-tldraw.jpg'],

    problemSpaceHeading: 'Animation software asks you to describe motion. Nobody moves that way.',
    problemSpace: 'Keyframes. Easing curves. Dope sheets.\nEvery serious 2D tool front-loads the hardest idea in the craft.\n\nI studied the whole shelf, After Effects, Procreate Dreams, StickNodes, Pivot, even the motion paths hiding inside Canva and Keynote. All powerful. All slow.\n\nThe pattern was quiet but total: **the tools people find fun hide the timeline. The tools people find capable expose it.**\n\ntldraw is a canvas, and a canvas is for playing. So I stopped trying to make a better timeline, and started designing a performance.',

    conceptHeading: 'The motion is the take.',
    concept: 'tldraw flash records performance, not parameters.\n\nYou drag a drawing across the canvas.\nThat drag, its path and its speed, **is** the animation.\nGrab the torso and the whole puppet walks. Grab a limb and it swings.\nYou handle a drawing the way you would handle a puppet.\n\nThen the scene builds the way a scene actually gets built: **one thing per pass.** A second character while the first plays back live. A camera move. A voice-over on the shared clock. An expression, tapped in on the beat.',

    processSections: [
      {
        title: 'First I mapped every way people already fake motion',
        body: 'Before a single screen, I asked a smaller question:\n**how do people animate when they aren’t really trying to?**\n\nI mapped the whole range, from professional (After Effects’ as-rigid-as-possible puppet deforms) to playful (Pivot’s stickman rig, joint points and origin points) to accidental (the drag-a-path animation buried in Canva and PowerPoint).\n\nOne line ran through all of it. The fun tools hide the timeline; the capable tools expose it. tldraw flash had to be both, so the interaction, not the timeline, had to carry the whole model.',
        image: '/projects/tldraw-wireframe.png',
        imageCaption: 'Interaction research + early wireframing, Canva, Keynote, After Effects, StickNodes, Pivot, Procreate Dreams, and the mechanisms pulled from each.',
      },
      {
        title: 'The loop: record, then layer one thing per pass',
        body: 'Drag a character onto the canvas. Press record; a three-second count-in plays.\nDrag it across the stage, **that motion is the take.**\nPress play, and it repeats, holding its last pose.\n\nThen the scene builds up, one channel at a time:',
        table: {
          head: ['Pass', 'What you add'],
          rows: [
            ['1', 'A character’s walk, drag it across the stage'],
            ['2', 'A second character, while the first plays back live'],
            ['3', 'A camera move, drag the frame to pan, a corner to push in'],
            ['4', 'A voice-over, spoken onto the shared clock'],
            ['5', 'Expressions & gestures, tap “happy”, tap “wave”'],
          ],
        },
        image: '/projects/tldraw-flow.png',
        imageCaption: 'V1 flow, the record→layer loop, the punch-in edit model, and the filmstrip structure.',
      },
      {
        title: 'One editing model: punch-in',
        body: 'No trim. No retiming. No speed curves.\n\nFlub a take? Scrub to it, grab just the arm, and re-record **that channel from the playhead forward.** Everything before it is untouched. The walk you liked is kept.\n\nYou never adjust a curve. You re-perform.\nOne model, learned once, true everywhere, and the reason the whole tool stays teachable. Scenes chain as a filmstrip, where each card’s thumbnail *is* the camera view.',
      },
    ],

    meetTheWork: 'V1 ships the ready-made puppet tray, the record→perform→layer loop, camera framing, and MP4 export. Rigging your own “tl-man” from a drawing and a draw-your-own-props set are in active exploration.',
    finalImages: [
      { src: '/projects/tldraw-sample.mp4', caption: 'Sample output, a scene performed and layered on the canvas.', isVideo: true },
      { src: '/projects/tldraw-demo.jpg', caption: 'The interface, collections tray, camera framing, and the crude scrub timeline.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'The discipline was in what I removed',
        body: 'The hard part was never the tech.\nIt was resisting the timeline everyone expects, and trusting that one editing model could do the work of a dozen.\n\nConstraints didn’t limit the tool. They gave it a voice.',
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
    subtitle: 'A two-sided food-waste system, a consumer rescue app and a smart retail till, measured in the same currency: CO₂ saved.',
    tags: ['Product Design', 'Systems', 'Gartner Winner'],
    bg: '#e9f1ec',
    heroImage: '/projects/cover-gofresh.jpg',

    h1: 'Turning the expiry line into a discount, not a decision',
    subtitleParagraph: 'A third of the food we produce is never eaten. gofresh treats supermarket waste as a supply-chain loop rather than a shopping feature, pairing a consumer rescue app with a retail till that discounts near-expiry stock automatically. Winner, Gartner Case Competition.',
    year: '2024',
    scope: 'Product Design\nSystems Thinking',
    role: 'Case competition. Product design, system framing, and prototype.',
    showcaseImages: ['/projects/cover-gofresh.jpg'],

    problemSpaceHeading: 'The waste isn’t made by the shopper. It’s made at the till.',
    problemSpace: 'A third of the food we grow is never eaten.\nMost of it doesn’t rot in a field. It gets binned at a shop, on a normal Tuesday, by someone with a job to do.\n\nSo I looked at where the waste is actually *made*, and it wasn’t the shopper.\nIt was the till. The exact moment a perfectly good croissant crosses an invisible expiry line and stops being sellable.\n\nEvery food-rescue app I found designed the shopper: go find the deal, go to the store, feel good.\nThat solves half a loop. **So I designed both halves of it.**',

    conceptHeading: 'Two surfaces, one number.',
    concept: 'gofresh is two products that share one currency.\n\nA consumer app that makes rescued food *desirable*.\nA retail till that makes rescued food *effortless to create*.\nBoth speak in CO₂ avoided.\n\nThe app builds demand. The till builds supply, and counts it. And because saving money and saving carbon are the same tap, nobody has to choose between the cheap thing and the good thing.',

    processSections: [
      {
        title: 'gofresh: the consumer side',
        body: 'The question here was tone.\n**How do you sell something that’s about to expire without it feeling like a bin?**\n\nSo near-expiry stock arrives as an offer, not an apology. 80% off the pasta, 40% off the salad, each with a store nearby and a countdown that reads as *rescue this*, not *hurry up*.\n\nThen an **Impact tab** makes the abstract personal. “12.4 kg of CO₂e saved.” A monthly goal. A streak worth keeping. Guilt gets you one purchase. A number you’re proud of gets you a habit.',
        image: '/projects/gofresh-app.jpg',
        imageCaption: 'The market and impact tracker: discounts framed as rescue, savings framed as carbon.',
      },
      {
        title: 'SmartTill: the retail side',
        body: 'The consumer app is nothing without supply, and supply is born at the counter.\n\nSo the till does the work no shopper can see. It auto-flags stock as **reduced, 2 days left**, drops the price itself, and prints the CO₂ avoided right on the basket line. Staff get an expiry manager, a short Learn module, and analytics.\n\nWaste stops being a loss written off at close. It becomes a number they watch fall in real time: “7 items reduced today.” What you can measure, you can beat.',
        image: '/projects/gofresh-till.jpg',
        imageCaption: 'SmartTill: point of sale, expiry management, and a live food-waste-savings readout.',
      },
    ],

    meetTheWork: 'One system, two surfaces: demand and supply speaking the same language. The consumer app makes rescued food desirable; the till makes it effortless to create and impossible to ignore.',
    finalImages: [
      { src: '/projects/gofresh-till.jpg', caption: 'SmartTill, waste becomes a measured, falling number.' },
      { src: '/projects/gofresh-app.jpg', caption: 'gofresh app, the rescue market and personal CO₂ impact.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'Design the incentive, not the guilt',
        body: 'Sustainability features fail when they ask people to be good.\n\nThis one worked because the sustainable choice and the cheap choice were the same choice, on both sides of the counter. Make the right thing the easy thing and you don’t need a lecture.',
      },
      {
        title: 'One number, read from both ends',
        body: 'CO₂e on the shopper’s Impact tab. CO₂e on the manager’s dashboard.\n\nOne metric, legible to a student buying dinner and a store lead closing up, did the persuading that a paragraph never could.',
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
    subtitle: 'A portfolio builder that optimises for momentum over options, from blank page to a first draft you’d actually keep.',
    tags: ['Web App', 'Visual Design', 'Canva Winner'],
    bg: '#efeaff',
    heroImage: '/projects/cover-folio.jpg',

    h1: 'From “build your portfolio” to “here’s your portfolio”',
    subtitleParagraph: 'Everyone tells creatives to make a portfolio, then hands them a blank canvas and walks away. folio removes the blank-page tax, a guided web app that turns your work into a laid-out site in the first ten minutes. Built and won in a hackathon sprint. Winner, Canva Hackathon.',
    year: '2024',
    scope: 'Product & Visual Design',
    role: 'Hackathon. Product design, visual design, and build.',
    showcaseImages: ['/projects/cover-folio.jpg'],

    problemSpaceHeading: 'The gap isn’t talent. It’s the first ten minutes.',
    problemSpace: '“Just make a portfolio,” everyone says. Then they hand you a blank canvas and walk away.\n\nWhat stops people isn’t talent, and it isn’t time. It’s the first ten minutes. The empty page that asks you to be your own art director before you’ve made a single decision.\n\nTemplates feel generic. From-scratch feels endless. Both leave you staring.\nFor a room full of students at a hackathon, the win was never *more features*. It was getting someone to a **first draft they’d keep.**',

    conceptHeading: 'Speed is a feeling, and a feeling can be designed.',
    concept: 'So folio has one confident door, “Build now,” and a guided flow that hands back a laid-out site instead of an empty one.\n\nEven the gradient orb earns its place. It’s the “generating” moment made calm and alive, so the one unavoidable wait reads as magic, not loading. Momentum isn’t a detail here. It’s the whole product.',

    processSections: [
      {
        title: 'A card-first way to arrange work',
        body: 'The blank page is intimidating because it asks for layout before content.\nSo folio flips the order: your work goes in as modular cards, and the arrangement is already handled.\n\nDrop your pieces in and the page looks intentional before you’ve touched a single setting. The first interaction produces something you’d actually keep, which is the only thing that gets a nervous first-timer to a second click.',
        video: '/projects/folio-concept.mp4',
        imageCaption: 'Card concept: arranging work as modular, rearrangeable blocks.',
      },
      {
        title: 'One system, two views',
        body: 'A portfolio isn’t one artifact anymore. It’s a website and a phone.\n\nSo the same content reflows between a site layout and an app layout, decided up front so the flow could stay simple. You make choices about *your work*, never about breakpoints. Build it once, and it reads well everywhere it lands.',
        image: '/projects/folio-mobile.jpg',
        imageCaption: 'The responsive layout reflows the same content between website and app.',
      },
    ],

    meetTheWork: 'Built and shipped in a hackathon sprint, and it won. Judges responded to the same thing users did: it removed the friction between having work and having a portfolio.',
    finalImages: [
      { src: '/projects/folio-concept.mp4', caption: 'The build flow, from entry point to a first, keepable draft.', isVideo: true },
      { src: '/projects/folio-web.jpg', caption: 'The landing moment, one confident action, and the generating orb.' },
    ],

    reflectionHeading: 'What I’m taking from it',
    reflection: [
      {
        title: 'Momentum is a feature',
        body: 'The most valuable thing folio gives you isn’t a template.\nIt’s permission to start.\n\nDesigning the first ten minutes did more for the experience than any amount of customisation would have.',
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
