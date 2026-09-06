import type { Catalog } from './catalog';
export default {
  language: 'Anzeigesprache',
  auto: 'Browsersprache',
  skip: 'Zum Inhalt',
  home: 'Typeodd Startseite',
  play: 'Spielen',
  guide: 'Spielanleitung',
  about: 'Über das Spiel',
  faq: 'Häufige Fragen',
  privacy: 'Datenschutz',
  title: 'Typeodd — Kostenloses Tippspiel für Tempo und Gedächtnis',
  description:
    'Langsames Tippen lässt den Text verblassen. Schnelles Tippen verdeckt die nächsten Buchstaben. Spiele allein oder im Duell und merke dir, was als Nächstes kommt.',
  start: 'Jetzt spielen',
  playground: 'Wie viel kannst du dir merken?',
  noSignup: 'Ohne Anmeldung oder Download.',
  typingLanguage: 'Textsprache',
  soundOn: 'Ton einschalten',
  soundOff: 'Ton ausschalten',
  progress: 'Fortschritt',
  rhythm: 'Tipptempo',
  accuracy: 'Genauigkeit',
  score: 'Punkte',
  metrics: 'Spielstatistik',
  sessionDone: 'Text geschafft',
  finished: 'Du hast es bis zum Ende geschafft!',
  points: 'Pkt.',
  again: 'Noch einmal',
  copy: 'Ergebnis kopieren',
  inputLabel: 'Tippe den restlichen Text:',
  typeDirectly: 'Tippe einzelne Zeichen. Korrigiere mit der Rücktaste. Einfügen ist deaktiviert.',
  clickType: 'Klicke zum Tippen auf den Text. Lies etwas voraus.',
  readAhead: 'Lies voraus, merke dir die Wörter und tippe weiter.',
  restart: 'Neu starten',
  next: 'Nächster Text',
  errorHint: 'Ein Fehler kostet 30% deiner Punkte. Korrigiere ihn mit der Rücktaste.',
  noTimer: 'Allein spielst du ohne Zeitlimit bis zum Textende.',
  mask: 'Abdeckung',
  veil: 'Verblassung',
  reward: 'Punkte pro Zeichen',
  ruleHint: 'Langsam verblasst der Text. Schnell wird er verdeckt.',
  noJs: 'Zum Spielen wird JavaScript benötigt. Die Hilfeseiten funktionieren auch ohne.',
  history: 'Geschaffte Texte',
  localOnly: 'In diesem Browser gespeichert',
  deleteQuestion: 'Ergebnisse löschen?',
  delete: 'Löschen',
  cancel: 'Abbrechen',
  clearHistory: 'Ergebnisse löschen',
  saveFailed: 'Speichern ist nicht möglich. Das Ergebnis bleibt nur auf diesem Bildschirm.',
  deleteFailed: 'Löschen fehlgeschlagen. Prüfe die Browsereinstellungen.',
  copied: 'Ergebnis kopiert.',
  guideTitle: 'So spielst du',
  guideLead: 'Lies voraus, merke dir die verdeckten Zeichen und tippe bis zum Ende.',
  guideSections: [
    {
      title: '1. Wähle einen Text',
      body: 'Wähle Englisch oder Koreanisch und klicke zum Tippen auf den Text. Richtige Zeichen verschwinden und der restliche Text rückt nach. Neu starten beginnt denselben Text erneut; Nächster Text lädt einen anderen.'
    },
    {
      title: '2. Lies ein paar Wörter voraus',
      body: 'Langsames Tippen lässt die Zeichen verblassen. Schnelles, richtiges Tippen macht sie klarer, verlängert aber die graue Abdeckung. Merke dir die nächsten Wörter, bevor sie darunter rutschen. Beim Anhalten schrumpft die Abdeckung; beim Weitertippen kann der Text stärker verblassen.'
    },
    {
      title: '3. Sammle Punkte und korrigiere Fehler',
      body: 'Eine längere Abdeckung bringt mehr Punkte je richtigem Zeichen. Ein Fehler verkürzt sie und kostet 30% der aktuellen Punkte, aufgerundet: Von 101 Punkten verlierst du 31. Die Rücktaste entfernt falsche Zeichen. Nach den Originalregeln kostet auch dieses Löschen Punkte.'
    },
    {
      title: '4. Allein üben oder im Duell antreten',
      body: 'Allein gibt es kein Zeitlimit. Im Duell tippt ihr denselben Text; wer zuerst fertig ist, gewinnt. Verlassen zählt als Aufgabe. Ein Duell dauert höchstens 15 Minuten. Das aktuelle Tempo basiert auf den letzten Eingaben, das Solo-Ergebnis auf dem Durchschnitt der Runde.'
    }
  ],
  aboutTitle: 'Was ist Typeodd?',
  aboutLead: 'Ein Tippspiel, bei dem du dir die nächsten Wörter merken musst.',
  aboutSections: [
    {
      title: 'Schneller heißt auch schwieriger',
      body: 'Langsam verblassen die Wörter, schnell verschwinden sie unter einer Abdeckung. Mit steigendem Tempo brauchst du mehr Erinnerung. Eine verdeckte Stelle zu schaffen und nach einem Fehler wieder in den Rhythmus zu kommen, macht den Reiz aus.'
    },
    {
      title: 'Geschichten aus dem heutigen Alltag',
      body: 'Eine ungesendete Nachricht, eine Fahrt durch die Stadt, eine letzte Spielrunde: Für Typeodd wurden 30 englische und 30 koreanische Texte zu sechs Themen aus Alltag und Fantasie geschrieben. Die Anzeigesprache wählst du unabhängig von der Textsprache.'
    },
    {
      title: 'Von zendoc',
      body: 'Was wäre, wenn Tippen das Gedächtnis genauso fordert wie die Finger? Daraus entstand Typeodd. Diese Fassung bewahrt die ursprünglichen Regeln für Abdeckung und Verblassung und erneuert Texte und Oberfläche. Unten findest du den Code und weitere Projekte.'
    }
  ],
  faqPageTitle: 'Antworten auf häufige Fragen',
  faqLead: 'Gut zu wissen vor der nächsten Runde.',
  faqs: [
    {
      q: 'Was ist das Ziel?',
      a: 'Tippe den ganzen Text und erinnere dich an die verdeckten Zeichen. Langsames Tippen lässt sie verblassen, schnelles Tippen verdeckt sie.'
    },
    {
      q: 'Warum wird gutes Tippen schwieriger?',
      a: 'Mit mehr Tempo musst du dir mehr merken. Dafür bringt eine längere Abdeckung mehr Punkte pro richtigem Zeichen.'
    },
    {
      q: 'Wie verliere ich Punkte?',
      a: 'Ein Fehler kostet 30% der Punkte, aufgerundet: 31 von 101. Auch das Entfernen eines falschen Zeichens mit der Rücktaste kostet Punkte.'
    },
    {
      q: 'Kann ich pausieren?',
      a: 'Es gibt keine Pause. Die Abdeckung schrumpft auch in einem anderen Tab weiter. Solo hat kein Zeitlimit; Duelle dauern höchstens 15 Minuten.'
    },
    {
      q: 'Welche Textsprachen gibt es?',
      a: 'Je 30 Texte auf Englisch und Koreanisch. Die Anzeigesprache ist unabhängig davon. Auf dem Handy öffnet ein Tippen auf den Text die Tastatur. Koreanische Zeichen werden nach abgeschlossener Zusammensetzung geprüft.'
    },
    {
      q: 'Wo bleiben meine Ergebnisse?',
      a: 'Die letzten 50 Solo-Ergebnisse bleiben in diesem Browser. Anonyme Duell-Zusammenfassungen verfallen nach sieben Tagen und werden beim Serverstart oder nächsten Ergebnis gelöscht. Es gibt keine Anmeldung oder öffentliche Rangliste.'
    },
    {
      q: 'Wie starte ich ein Duell?',
      a: 'Wähle das Duell und suche jemanden mit derselben Textsprache. Nach drei Sekunden startet ihr zusammen. Der Server bestätigt den Sieg. Verlassen zählt als Aufgabe; nach einer Trennung endet die Partie nach zehn Sekunden ohne Möglichkeit zur Fortsetzung.'
    }
  ],
  privacyTitle: 'Deine Daten',
  privacyLead: 'Was im Browser bleibt und was beim Duell übertragen wird.',
  privacySections: [
    {
      title: 'In deinem Browser',
      body: 'Bis zu 50 Solo-Ergebnisse werden gespeichert: Regelversion, Text, Sprache, Datum, Punkte, Dauer, Tempo und Genauigkeit. Sprach- und Toneinstellungen bleiben ebenfalls gespeichert. Ergebnisse löschen entfernt die Runden; Browserdaten löschen entfernt auch Einstellungen. Ergebnisse werden nur auf deinen Wunsch in die Zwischenablage kopiert.'
    },
    {
      title: 'Beim Duell',
      body: 'Bestätigte Eingaben werden per verschlüsseltem WSS über Cloudflare Tunnel an einen Rust-Server gesendet und im Speicher verarbeitet. SQLite speichert nur anonyme Spiel-ID, Text, Sprache, Punkte, Fortschritt, Versuche, Gewinner, Dauer und Endgrund. Die Spieldatenbank speichert keine rohen Eingabeprotokolle, Namen oder IP-Adressen. Zusammenfassungen verfallen nach sieben Tagen und werden beim Serverstart oder nächsten Ergebnis gelöscht.'
    },
    {
      title: 'Bereitstellung',
      body: 'Cloudflare Pages liefert die Website, Google Fonts die Schriften. Die Anbieter erhalten die dafür nötigen Netzwerkdaten. Das Spiel enthält keine Werbung oder zusätzlichen Skripte zur Besuchsanalyse.'
    },
    {
      title: 'Chat',
      body: 'Ein Chat ist noch nicht verfügbar. Aufbewahrung und Löschung von Nachrichten werden vor der Veröffentlichung erklärt.'
    }
  ]
} satisfies Catalog;
