import type { Catalog } from './catalog';
export default {
  language: 'Langue de l’interface',
  auto: 'Langue du navigateur',
  skip: 'Aller au contenu',
  home: 'Accueil Typeodd',
  play: 'Jouer',
  guide: 'Comment jouer',
  about: 'À propos',
  faq: 'Questions fréquentes',
  privacy: 'Confidentialité',
  title: 'Typeodd — Jeu de frappe gratuit, vitesse et mémoire',
  description:
    'Tapez lentement et le texte s’efface. Accélérez et un cache masque les lettres suivantes. Jouez seul ou en duel : votre mémoire fait la différence.',
  start: 'Jouer maintenant',
  playground: 'Combien pouvez-vous retenir ?',
  noSignup: 'Sans inscription ni téléchargement.',
  typingLanguage: 'Langue du texte',
  soundOn: 'Activer le son',
  soundOff: 'Couper le son',
  progress: 'Progression',
  rhythm: 'Vitesse de frappe',
  accuracy: 'Précision',
  score: 'Score',
  metrics: 'Statistiques de la partie',
  sessionDone: 'Texte terminé',
  finished: 'Vous êtes arrivé au bout !',
  points: 'pts',
  again: 'Rejouer',
  copy: 'Copier le résultat',
  inputLabel: 'Tapez le texte restant :',
  typeDirectly:
    'Tapez un caractère à la fois. Corrigez avec Retour arrière. Le collage est désactivé.',
  clickType: 'Cliquez sur le texte pour écrire. Lisez un peu en avance.',
  readAhead: 'Lisez en avance, mémorisez et continuez.',
  restart: 'Recommencer',
  next: 'Texte suivant',
  errorHint: 'Une erreur coûte 30% de votre score. Corrigez avec Retour arrière.',
  noTimer: 'En solo, terminez le texte à votre rythme, sans limite de temps.',
  mask: 'Longueur du cache',
  veil: 'Effacement',
  reward: 'Points par lettre',
  ruleHint: 'Trop lent, le texte s’efface. Plus vite, il se cache.',
  noJs: 'Activez JavaScript pour jouer. Les pages d’aide restent accessibles sans lui.',
  history: 'Textes terminés',
  localOnly: 'Enregistrés dans ce navigateur',
  deleteQuestion: 'Effacer vos résultats ?',
  delete: 'Effacer',
  cancel: 'Annuler',
  clearHistory: 'Effacer les résultats',
  saveFailed: 'Le stockage est indisponible. Ce résultat reste uniquement sur cet écran.',
  deleteFailed: 'Impossible d’effacer les résultats. Vérifiez les paramètres du navigateur.',
  copied: 'Résultat copié.',
  guideTitle: 'Comment jouer',
  guideLead: 'Lisez en avance et retenez les lettres cachées pour aller jusqu’au bout.',
  guideSections: [
    {
      title: '1. Choisissez un texte',
      body: 'Sélectionnez l’anglais ou le coréen, puis cliquez sur le texte et tapez-le. Chaque lettre correcte disparaît et la suite avance. Recommencer relance le même texte ; Texte suivant en propose un autre.'
    },
    {
      title: '2. Gardez quelques mots en mémoire',
      body: 'Une frappe lente fait pâlir les lettres. Une frappe rapide et juste les rend plus nettes, mais allonge le cache gris. Lisez quelques mots avant qu’ils passent dessous. Pendant un arrêt, le cache rétrécit ; à la reprise, le texte peut pâlir davantage.'
    },
    {
      title: '3. Marquez des points et corrigez',
      body: 'Plus le cache est long, plus chaque bonne lettre rapporte. Une erreur retire 30% du score, arrondis au supérieur : avec 101 points, vous en perdez 31. Le cache redevient court. Retour arrière efface une erreur, mais cette suppression coûte aussi des points selon les règles originales.'
    },
    {
      title: '4. Jouez seul ou en duel',
      body: 'Le solo n’a pas de limite de temps. En duel, les deux joueurs reçoivent le même texte ; le premier à finir gagne. Quitter vaut abandon. Une partie dure au maximum 15 minutes. La vitesse en direct reflète vos dernières frappes ; le résultat solo affiche la moyenne de la partie.'
    }
  ],
  aboutTitle: 'Qu’est-ce que Typeodd ?',
  aboutLead: 'Un jeu de frappe où il faut se souvenir de la suite.',
  aboutSections: [
    {
      title: 'La vitesse apporte un défi',
      body: 'Quand vous ralentissez, le texte pâlit. Quand vous accélérez, un cache le recouvre. Vos mains avancent grâce aux mots que vous avez retenus. Retrouver le rythme après une erreur fait aussi partie du plaisir.'
    },
    {
      title: 'De petites histoires d’aujourd’hui',
      body: 'Un message jamais envoyé, un trajet en ville, une dernière partie entre amis : 30 textes anglais et 30 textes coréens ont été écrits pour Typeodd, autour de six thèmes du quotidien et de l’imaginaire. La langue de l’interface se choisit séparément.'
    },
    {
      title: 'Créé par zendoc',
      body: 'Et si taper faisait travailler la mémoire autant que les doigts ? Typeodd est né de cette idée. Cette version conserve les règles originales de cache et d’effacement, avec de nouveaux textes et une interface renouvelée. Retrouvez le code et les autres projets ci-dessous.'
    }
  ],
  faqPageTitle: 'Quelques réponses utiles',
  faqLead: 'À savoir avant votre prochaine partie.',
  faqs: [
    {
      q: 'Quel est le but ?',
      a: 'Terminer le texte en mémorisant les lettres que le cache recouvre. La lenteur les fait pâlir, la vitesse les masque.'
    },
    {
      q: 'Pourquoi cacher le texte quand je réussis ?',
      a: 'Pour vous donner davantage à retenir. Un cache plus long rapporte aussi plus de points par lettre correcte.'
    },
    {
      q: 'Comment perd-on des points ?',
      a: 'Une erreur coûte 30% du score, arrondis au supérieur : 31 points sur 101. Effacer une mauvaise lettre avec Retour arrière entraîne aussi une pénalité.'
    },
    {
      q: 'Peut-on faire une pause ?',
      a: 'Il n’y a pas de pause. Le cache continue de rétrécir dans un autre onglet. Le solo est sans limite de temps ; un duel dure au maximum 15 minutes.'
    },
    {
      q: 'Dans quelles langues peut-on taper ?',
      a: 'Les 60 textes sont en anglais ou en coréen, 30 de chaque. La langue de l’interface est indépendante. Sur téléphone, touchez le texte pour ouvrir le clavier ; les caractères coréens sont validés à la fin de leur composition.'
    },
    {
      q: 'Où sont mes résultats ?',
      a: 'Les 50 derniers résultats solo restent dans ce navigateur. Les résumés anonymes des duels expirent après sept jours et sont effacés au démarrage du serveur ou au résultat suivant. Aucun compte ni classement public.'
    },
    {
      q: 'Comment lancer un duel ?',
      a: 'Choisissez le duel et cherchez un adversaire dans la même langue de texte. Vous démarrez ensemble après trois secondes. Le serveur confirme le gagnant. Quitter vaut abandon ; une déconnexion termine la partie après dix secondes, sans reprise possible.'
    }
  ],
  privacyTitle: 'Vos données',
  privacyLead: 'Ce qui reste dans le navigateur et ce qui est envoyé en duel.',
  privacySections: [
    {
      title: 'Dans votre navigateur',
      body: 'Jusqu’à 50 résultats solo sont conservés : version des règles, texte, langue, date, score, durée, vitesse et précision. Les choix de langue et de son sont aussi enregistrés. Effacer les résultats supprime les parties ; effacer les données du navigateur supprime également les préférences. Copier un résultat utilise le presse-papiers uniquement à votre demande.'
    },
    {
      title: 'Pendant un duel',
      body: 'Les caractères validés sont envoyés par WSS chiffré via Cloudflare Tunnel au serveur Rust et traités en mémoire. SQLite conserve seulement l’identifiant anonyme de la partie, le texte, la langue, les scores, la progression, les tentatives, le gagnant, la durée et le motif de fin. La base du jeu ne conserve ni saisie brute, ni nom, ni adresse IP. Les résumés expirent après sept jours ; ils sont supprimés au démarrage du serveur ou au résultat suivant.'
    },
    {
      title: 'Hébergement',
      body: 'Cloudflare Pages fournit le site et Google Fonts fournit les polices. Ces services reçoivent les informations réseau nécessaires à leur fonctionnement. Le jeu n’intègre ni publicité ni script d’analyse des visites distinct.'
    },
    {
      title: 'Discussion',
      body: 'Le chat n’est pas encore disponible. Les règles de conservation et de suppression des messages seront précisées avant son lancement.'
    }
  ]
} satisfies Catalog;
