import type { GlossaryTerm, Pillar } from './model';

export const PILLARS: Pillar[] = [
  { id: 'grundlagen', title: 'MPU Grundlagen', description: 'Der eigenständige Grundlagenbereich wird erst mit belastbarer Inhaltstiefe freigeschaltet.', state: 'review' },
  { id: 'vorbereitung', title: 'Vorbereitung verstehen', description: 'Methoden, Grenzen und Qualitätsmerkmale – ohne Angebotsverkauf.', state: 'review' },
  { id: 'ablauf', title: 'MPU Ablauf', description: 'Vom Gutachtenauftrag über die Untersuchung bis zum Ergebnis.', path: '/mpu-ablauf/', state: 'available' },
  { id: 'kosten', title: 'MPU Kosten', description: 'Kostenblöcke und Einflussfaktoren neutral einordnen.', path: '/mpu-kosten/', state: 'available' },
  { id: 'alkohol', title: 'Alkohol MPU', description: 'Konsummuster, Veränderung und Nachweise fachlich unterscheiden.', path: '/alkohol-mpu/', state: 'available' },
  { id: 'drogen', title: 'Drogen MPU', description: 'Anlässe, Aufarbeitung und Nachweisfragen im Überblick.', path: '/drogen-mpu/', state: 'available' },
  { id: 'cannabis', title: 'Cannabis MPU', description: 'Ein eigener, overlap-sensibler Wissensbereich entsteht nach Fachprüfung.', state: 'review' },
  { id: 'abstinenz', title: 'Abstinenz', description: 'Rolle, Begriffe und Grenzen ohne pauschale Zeitangaben.', state: 'review' },
  { id: 'nachweis', title: 'Abstinenznachweis', description: 'CTU, Haaranalyse, Urinscreening und Dokumentation verstehen.', path: '/abstinenznachweis/', state: 'available' },
  { id: 'stellen', title: 'Begutachtungsstellen', description: 'Auswahl, Auftrag, Aktenversand und praktische Kriterien.', path: '/mpu-begutachtungsstelle/', state: 'available' },
  { id: 'fragen', title: 'MPU Fragen', description: 'Allgemeine Wissensfragen mit eindeutigem redaktionellem Eigentümer.', path: '/faq/', state: 'available' },
  { id: 'gutachten', title: 'Gutachten & Gespräch', description: 'Psychologisches Gespräch und Gutachten verständlich erklärt.', state: 'review' },
  { id: 'behoerden', title: 'Behörden', description: 'Führerscheinstelle, Akte und Verfahren – rechtlich reviewpflichtig.', state: 'review' },
  { id: 'tests', title: 'MPU Tests', description: 'Leistungstests und Untersuchungsverfahren ohne Bereitschaftsscore.', state: 'review' },
  { id: 'glossar', title: 'MPU Glossar', description: 'Ein kuratierter Einstieg in wichtige Fachbegriffe.', path: '/glossar/', state: 'available' },
];

export const GLOSSARY: GlossaryTerm[] = [
  { term: 'Begutachtungsstelle für Fahreignung (BfF)', definition: 'Eine amtlich anerkannte Stelle, die Fahreignungsbegutachtungen durchführt.', relatedPath: '/mpu-begutachtungsstelle/' },
  { term: 'Fahreignung', definition: 'Die körperliche, geistige und charakterliche Eignung zum sicheren Führen von Kraftfahrzeugen.' },
  { term: 'Fragestellung', definition: 'Die von der Fahrerlaubnisbehörde formulierte Frage, die das Gutachten beantworten soll.', relatedPath: '/mpu-ablauf/' },
  { term: 'CTU', definition: 'Chemisch-toxikologische Untersuchung; ein Sammelbegriff für fachlich geregelte Laboruntersuchungen.', relatedPath: '/abstinenznachweis/' },
  { term: 'Abstinenznachweis', definition: 'Dokumentierter Nachweis über einen festgelegten Zeitraum unter vorgegebenen Kontrollbedingungen.', relatedPath: '/abstinenznachweis/' },
  { term: 'Anlassbezogenheit', definition: 'Grundsatz, dass die Untersuchung sich an der behördlichen Fragestellung und fahreignungsrelevanten Umständen orientiert.', relatedPath: '/mpu-ablauf/' },
];
