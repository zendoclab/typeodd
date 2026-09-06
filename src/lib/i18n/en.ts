export default {
  language: 'Display language',
  auto: 'Browser language',
  skip: 'Skip to content',
  home: 'Typeodd home',
  play: 'Play',
  guide: 'How to play',
  about: 'About',
  faq: 'Questions & answers',
  privacy: 'Data & privacy',
  title: 'Typeodd — A free typing game of speed and memory',
  description:
    'Slow down and the passage fades. Speed up and a growing mark hides the next letters. Play Typeodd, a free typing mind game of rhythm, memory and nerve.',
  start: 'Take the challenge',
  playground: 'How much can you remember?',
  noSignup: 'No sign-up. No download.',
  typingLanguage: 'Passage language',
  soundOn: 'Turn typing sound on',
  soundOff: 'Turn typing sound off',
  progress: 'PROGRESS',
  rhythm: 'TYPING PACE',
  accuracy: 'ACCURACY',
  score: 'SCORE',
  metrics: 'Game statistics',
  sessionDone: 'PASSAGE COMPLETE',
  finished: 'You made it to the end!',
  points: 'pt',
  again: 'Play again',
  copy: 'Copy result',
  inputLabel: 'Type the remaining passage:',
  typeDirectly:
    'Enter one character at a time. Correct a mistake with Backspace. Pasting is disabled.',
  clickType: 'Click the passage to type. Read ahead before the mark grows.',
  readAhead: 'Read a little ahead and keep typing.',
  restart: 'Restart',
  next: 'Next passage',
  errorHint: 'Mistakes cost 30% of your score. Use Backspace to correct them.',
  noTimer: 'No countdown. Complete the whole passage.',
  mask: 'Cover length',
  veil: 'Fading',
  reward: 'Points per letter',
  ruleHint: 'Type slowly and it fades. Type quickly and it gets covered.',
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
      a: 'A typing game about reading ahead and remembering the next letters. Slow typing makes the text fade; fast typing grows a gray cover over it. Remember the hidden part and keep going until you reach the end.'
    },
    {
      q: 'Why does the text get covered when I am doing well?',
      a: 'That is the challenge: typing faster gives you more to remember. Correct letters disappear, pulling the next ones under the cover. Read a little ahead before they get hidden. A longer cover also earns you more points.'
    },
    {
      q: 'How do I earn and lose points?',
      a: 'A longer cover gives you more points for each correct letter. A mistake costs 30% of your current score, rounded up. At 101 points, you lose 31. The original rules also deduct points when you use Backspace to delete a wrong letter.'
    },
    {
      q: 'Is there a time limit or pause?',
      a: 'Solo ends when you finish the passage, with no time limit. A 1:1 match can last up to 15 minutes. There is no pause, and the cover keeps shrinking if you switch tabs. Restart begins the same passage again.'
    },
    {
      q: 'Can I play in Korean on my phone?',
      a: 'Yes. Choose Korean as the passage language and tap the text to open your keyboard. Korean letters are checked after composition finishes. The display language is a separate choice. There are 30 English and 30 Korean passages, newly written around everyday life and short stories.'
    },
    {
      q: 'Where are results saved?',
      a: 'Solo results are saved in this browser.'
    }
  ],
  guideTitle: 'How to play',
  guideLead: 'Read ahead, remember the covered letters, and type your way to the end.',
  guideSections: [
    {
      title: '1. Choose a passage',
      body: 'Pick English or Korean, then click the passage and type what you see. Correct letters disappear and the remaining text moves forward. Finish the whole passage to complete a round. Restart tries the same text again; Next passage gives you a different one.'
    },
    {
      title: '2. Read a little ahead',
      body: 'Slow typing makes the letters fade. Fast, accurate typing brings them back into focus, but also grows a gray cover over the next letters. Try to remember a few words before they move underneath it. Stopping makes the cover shrink, but the text may fade further when you start typing again.'
    },
    {
      title: '3. Earn points and fix mistakes',
      body: 'A longer cover means more points for each correct letter. A mistake takes away 30% of your current score and makes the cover short again. The amount lost is rounded up: at 101 points, you lose 31. Use Backspace to remove a wrong letter. Under the original rules, deleting it also costs points.'
    },
    {
      title: '4. Play solo or race someone',
      body: 'Solo has no time limit. In a 1:1 match, you and your opponent type the same passage in the same language. The first to finish wins. Leaving counts as a forfeit, and a match lasts at most 15 minutes. The live pace reflects your recent inputs; your solo result shows your average speed for the round.'
    }
  ],
  aboutTitle: 'What is Typeodd?',
  aboutLead: 'A typing game that asks you to remember what comes next.',
  aboutSections: [
    {
      title: 'Speed brings a new challenge',
      body: 'Go slowly and the letters fade. Go quickly and a growing gray cover hides them. As your pace improves, you need to remember more of the text. Getting through a hidden phrase, or finding your rhythm after a mistake, is part of the fun.'
    },
    {
      title: 'Stories that feel familiar',
      body: 'A missed train stop, an unsent message, a playlist made with friends: the passages start with everyday moments. Some take a small turn into the unexpected. We wrote 30 English and 30 Korean passages for Typeodd. Play on your own or race an opponent on the same text.'
    },
    {
      title: 'Made by zendoc',
      body: 'Typeodd began with a simple idea: what if typing used your memory as well as your hands? This edition keeps the original covering and fading rules while refreshing the screen and the passages. Follow the links below to see the code and more projects.'
    }
  ],
  faqPageTitle: 'A few useful answers',
  faqLead: 'What to know before your next round.',
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
