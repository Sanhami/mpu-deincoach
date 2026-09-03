import type { SourceRef } from './model';

export const SOURCES = {
  fev11: {
    id: 'fev-11',
    title: '§ 11 Fahrerlaubnis-Verordnung (FeV) – Eignung',
    publisher: 'Bundesministerium der Justiz / Bundesamt für Justiz',
    url: 'https://www.gesetze-im-internet.de/fev_2010/__11.html',
    sourceType: 'official',
    reviewedAt: '2026-09-02',
  },
  fev66: {
    id: 'fev-66',
    title: '§ 66 Fahrerlaubnis-Verordnung (FeV) – Träger von Begutachtungsstellen',
    publisher: 'Bundesministerium der Justiz / Bundesamt für Justiz',
    url: 'https://www.gesetze-im-internet.de/fev_2010/__66.html',
    sourceType: 'official',
    reviewedAt: '2026-09-02',
  },
  fev4a: {
    id: 'fev-anlage-4a',
    title: 'Anlage 4a FeV – Grundsätze für Untersuchung und Gutachten',
    publisher: 'Bundesministerium der Justiz / Bundesamt für Justiz',
    url: 'https://www.gesetze-im-internet.de/fev_2010/anlage_4a.html',
    sourceType: 'official',
    reviewedAt: '2026-09-02',
  },
  fev14: {
    id: 'fev-anlage-14',
    title: 'Anlage 14 FeV – Anerkennungsvoraussetzungen für Begutachtungsstellen',
    publisher: 'Bundesministerium der Justiz / Bundesamt für Justiz',
    url: 'https://www.gesetze-im-internet.de/fev_2010/anlage_14.html',
    sourceType: 'official',
    reviewedAt: '2026-09-02',
  },
  bastGuidelines: {
    id: 'bast-guidelines',
    title: 'Begutachtungsleitlinien zur Kraftfahreignung',
    publisher: 'Bundesanstalt für Straßenwesen (BASt)',
    url: 'https://bast.opus.hbz-nrw.de/frontdoor/deliver/index/docId/2664/file/Begutachtungsleitlinien%202022.pdf',
    sourceType: 'official',
    reviewedAt: '2026-09-03',
  },
  bk5Foundations: {
    id: 'bk5-foundations',
    title: 'Beurteilungskriterien, 5. Auflage – Grundlagen und H0',
    publisher: 'DGVP/DGVM',
    sourceType: 'professional',
  },
  bk5Alcohol: {
    id: 'bk5-alcohol',
    title: 'Beurteilungskriterien, 5. Auflage – Alkohol A1–A7',
    publisher: 'DGVP/DGVM',
    sourceType: 'professional',
  },
  bk5Drugs: {
    id: 'bk5-drugs',
    title: 'Beurteilungskriterien, 5. Auflage – Drogen D1–D5',
    publisher: 'DGVP/DGVM',
    sourceType: 'professional',
  },
  bk5Ctu: {
    id: 'bk5-ctu',
    title: 'Beurteilungskriterien, 5. Auflage – Chemisch-toxikologische Untersuchungen C3',
    publisher: 'DGVP/DGVM',
    sourceType: 'professional',
  },
} satisfies Record<string, SourceRef>;
