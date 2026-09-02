import type { PersonRef } from '../content/model';

export const SITE = {
  name: 'MPU Wissen',
  legalName: 'MPUdeincoach Wissensportal',
  url: 'https://mpu-deincoach.de',
  language: 'de-DE',
  description: 'Verständliche, quellenorientierte Informationen rund um die medizinisch-psychologische Untersuchung.',
  correctionPath: '/korrekturen/',
} as const;

export const EDITORIAL_TEAM: PersonRef = {
  id: 'redaktion-mpu-wissen',
  name: 'Redaktion MPU Wissen',
  role: 'Redaktionelle Bearbeitung',
  kind: 'Organization',
};

export const CTA_LINKS = {
  FALLANALYSE: 'https://mpudeincoach.de/#fallanalyse',
  MPU_VORBEREITUNG: 'https://mpudeincoach.de/mpu-vorbereitung',
  ALKOHOL: 'https://mpudeincoach.de/mpu-wegen-alkohol',
  CANNABIS: 'https://mpudeincoach.de/mpu-wegen-cannabis',
  ABSTINENZ: 'https://mpudeincoach.de/abstinenznachweis',
  MPU_KOMPASS: 'https://mpudeincoach.de/der-mpu-kompass',
  CONTACT: 'https://mpudeincoach.de/#fallanalyse',
} as const;

export type CtaKey = keyof typeof CTA_LINKS;
