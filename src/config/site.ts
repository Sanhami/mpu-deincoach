import type { PersonRef } from '../content/model';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://mpudeincoach-wissen.de').replace(/\/+$/, '');

export const SITE = {
  name: 'MPUdeincoach Wissen',
  legalName: 'MPUdeincoach Wissen',
  url: siteUrl,
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
  ALKOHOL: 'https://mpudeincoach.de/mpu-vorbereitung-alkohol',
  CANNABIS: 'https://mpudeincoach.de/mpu-vorbereitung-cannabis',
  ABSTINENZ: 'https://mpudeincoach.de/mpu-abstinenznachweis',
  MPU_KOMPASS: 'https://mpudeincoach.de/mpu-kompass',
  CONTACT: 'https://mpudeincoach.de/#fallanalyse',
} as const;

export type CtaKey = keyof typeof CTA_LINKS;
