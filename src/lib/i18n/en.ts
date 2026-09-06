export default {
  language: 'Display language',
  auto: 'Browser language',
  skip: 'Skip to content',
  home: 'Typeodd home',
  play: 'Play',
  guide: 'How to play',
  about: 'Our story',
  faq: 'Questions & answers',
  privacy: 'Data & privacy',
  title: 'Typeodd — Type faster. Remember more. Free typing mind game',
  description:
    'Slow down and the passage fades. Speed up and a growing mark hides the next letters. Play Typeodd, a free typing mind game of rhythm, memory and nerve.',
  heroLead: 'Type faster.',
  heroStrong: 'Remember more.',
  heroBody:
    'Too slow, and the words fade. Too fast, and they disappear beneath a growing mark. Read ahead. Trust your memory. Hold your nerve.',
  start: 'Take the challenge',
  how: 'Learn the rules',
  free: 'Free to play',
  languages: 'English · Korean',
  minute: 'Finish the passage',
  artLabel: 'A gray mark covers upcoming letters while a white veil fades the passage',
  stripOne: 'Speed has a price.',
  stripTwo: 'Memory keeps you moving.',
  playground: 'How much can you remember?',
  noSignup: 'No sign-up. No download.',
  featureTitle: 'Two pressures. One rhythm.',
  featureLead: 'Every advantage brings a new challenge.',
  features: [
    {
      title: 'Too slow: the passage fades.',
      body: 'Below the rhythm threshold, each input strengthens a white veil. Above it, clarity recovers more slowly than it was lost.'
    },
    {
      title: 'Too fast: the mark grows.',
      body: 'Faster correct input lengthens an almost opaque mark over the next letters. Read ahead before they move underneath it.'
    },
    {
      title: 'More risk. More points.',
      body: 'A wider mark earns more points per correct letter. A mistake costs 30% of your score and resets the mark.'
    }
  ],
  storyTitle: 'Your hands type. Your mind holds on.',
  storyBody:
    'Typeodd turns typing into a test of anticipation, short-term memory and composure. Its original rules connect speed, visibility and reward. Classic preserves that tension.',
  storyLink: 'The idea behind Typeodd',
  faqTitle: 'Before the words disappear.',
  allQuestions: 'All questions',
  typingLanguage: 'Passage language',
  soundOn: 'Turn typing sound on',
  soundOff: 'Turn typing sound off',
  progress: 'PROGRESS',
  rhythm: 'INSTANT RHYTHM',
  accuracy: 'ACCURACY',
  score: 'SCORE',
  metrics: 'Game statistics',
  sessionDone: 'PASSAGE COMPLETE',
  finished: 'You held the thread.',
  points: 'pt',
  again: 'Play again',
  copy: 'Copy result',
  inputLabel: 'Type the remaining passage:',
  typeDirectly:
    'Enter one character at a time. Correct a mistake with Backspace. Pasting is disabled.',
  clickType: 'Click the passage to type. Read ahead before the mark grows.',
  readAhead: 'Read ahead. Remember. Keep moving.',
  restart: 'Restart',
  next: 'Next passage',
  errorHint: 'Mistakes cost 30% of your score. Use Backspace to correct them.',
  noTimer: 'No countdown. Complete the whole passage.',
  mask: 'Mark',
  veil: 'White veil',
  reward: 'Next correct input',
  ruleHint: 'Slow: fading words. Fast: hidden letters.',
  noJs: 'JavaScript is needed to play. The guide and story work without it.',
  history: 'Completed passages',
  localOnly: 'Saved in this browser',
  deleteQuestion: 'Delete your records?',
  delete: 'Delete',
  cancel: 'Cancel',
  clearHistory: 'Clear records',
  saveFailed: 'Browser storage is unavailable. This result stays on this screen only.',
  deleteFailed: 'Could not delete records. Check your browser settings.',
  copied: 'Result copied.',
  faqs: [
    {
      q: 'What is Typeodd?',
      a: 'Typeodd is a free typing mind game by zendoc. Slow typing makes the passage fade; fast correct typing grows a mark that covers upcoming letters. You must read ahead, remember hidden text and maintain your rhythm.'
    },
    {
      q: 'Why are letters hidden when I type faster?',
      a: 'The mark is the central challenge. Each correct input grows it according to the interval since the previous correct input. Correct letters are removed from the passage, moving the next letters under the mark. Greater width also earns more points.'
    },
    {
      q: 'How are fading and points calculated?',
      a: 'At an internal mark width of 40 or more, each input reduces the white veil by 2 out of 255. Below 40, it increases by 3. A correct input earns the internal width divided by 10, rounded up. A mistake deducts 30% of the current score, rounded up, and resets width to 1.'
    },
    {
      q: 'Is there a time limit or pause?',
      a: 'Classic ends when the whole passage is typed. There is no countdown or pause. The mark decays every second, even if you switch tabs. Restart resets the current passage; Next opens another one.'
    },
    {
      q: 'Does Korean input work on mobile?',
      a: 'English and Korean passages are available independently of the display language. Korean syllables are evaluated after composition commits. Tap the passage to open the keyboard. Pasting and bulk input are disabled. The original English passages are preserved; Korean passages are an addition.'
    },
    {
      q: 'Are scores shared online?',
      a: 'No. The latest 50 completed results are saved in this browser only, without an account or payment. Copy result lets you share manually. Live chat and multiplayer remain planned features.'
    }
  ],
  guideTitle: 'Read before it disappears.',
  guideLead: 'Master the balance between fading text and a growing mark.',
  guideSections: [
    {
      title: 'Start a passage',
      body: 'Choose English or Korean, read ahead, then click the passage and type exactly. Each correct character disappears from the beginning, pulling the rest forward. Finish all the text to complete the challenge. Restart retries the same passage; Next selects another.'
    },
    {
      title: 'Two linked pressures',
      body: 'Correct input adds 600 divided by the interval in milliseconds to the internal mark width. Every second, width loses 25%, rounded up. Displayed width is 1.5 times internal width when it is at least 2. At internal width 40 or more, the white veil recedes by 2 per input; below 40 it grows by 3, on a 0–255 scale. The veil changes on input, not on timer ticks.'
    },
    {
      title: 'Reward and recovery',
      body: 'A correct character earns ceil(width / 10) points. An error removes ceil(score × 0.30) points, with a minimum total of zero. Veil adjustment happens before an error resets width to 1, matching the original game. Backspace clears an erroneous character; that deletion is also evaluated as an incorrect change, as in the original.'
    },
    {
      title: 'Rhythm and records',
      body: 'The live CPM value uses the interval between correct committed characters, not an average. The result shows average WPM for English (five characters per word) or CPM for Korean. Records use the Classic rule version and stay in this browser. There is no pause or clear-text switch during a challenge.'
    }
  ],
  aboutTitle: 'A mind game at your fingertips.',
  aboutLead: 'Speed, memory and uncertainty, connected through a single mark.',
  aboutSections: [
    {
      title: 'The original idea',
      body: 'Developer zendoc made Typeodd with two opposing pressures: slow input fades the passage, while fast input hides it behind a growing cursor. The same width determines the reward. Remembering what you read becomes part of typing it.'
    },
    {
      title: 'Classic in SvelteKit',
      body: 'This edition preserves the original constants, event ordering, English passages and passage-completion rule. It replaces Flutter rendering with layered HTML and a deterministic engine. Korean composition handling, safe input boundaries and clean restarts address technical errors without removing the challenge.'
    },
    {
      title: 'An open experiment',
      body: 'Explore the code on GitHub or visit Works of zendoc. Typeodd explores memory and composure through play; it does not claim medical benefits. Real-time chat and multiplayer are plans, not currently available features.'
    }
  ],
  faqPageTitle: 'The rules, explained.',
  faqLead: 'Answers about the mark, fading, scoring and input.',
  privacyTitle: 'Your records. Your browser.',
  privacyLead: 'Data handling in the current solo game.',
  privacySections: [
    {
      title: 'Local records',
      body: 'Up to 50 completed results are stored in your browser: rule version, passage title, language, date, score, elapsed time, speed and accuracy. Sound and display-language preferences are also stored. Clear records removes results; clearing browser data removes all settings.'
    },
    {
      title: 'No game server',
      body: 'Typed passages and scores are not sent to a game server. There is no login or online ranking. Old Firebase records are not imported. Copy result writes to your clipboard only when you choose it.'
    },
    {
      title: 'Hosting',
      body: 'Cloudflare Pages serves the site. Google Fonts serves fonts. These providers receive network information needed to deliver their resources. The game includes no advertising or separate visitor analytics scripts.'
    },
    {
      title: 'Future multiplayer',
      body: 'Live chat and multiplayer are being planned. Retention, deletion and data handling will be documented before those features launch.'
    }
  ]
};
