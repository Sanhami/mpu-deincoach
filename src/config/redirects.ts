export type RedirectAction = '301_WITHIN_OLD_DOMAIN' | '301_TO_MAIN_SITE' | '410' | 'MANUAL_REVIEW';

export interface LegacyRouteDecision {
  from: string;
  to?: string;
  action: RedirectAction;
}

export const LEGACY_REDIRECTS: LegacyRouteDecision[] = [
  { from: '/mpu-startseite/', to: '/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/mpu-deincoach-vorstellung/', to: '/ueber-uns/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/privacy-policy/', to: '/datenschutz/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/blog/', to: '/ratgeber/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/die-kosten-der-mpu/', to: '/mpu-kosten/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/die-kosten-der-medizinisch-psychologischen-untersuchung/', to: '/mpu-kosten/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/mpu-wegen-alkohol/', to: '/alkohol-mpu/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/fragen-und-antworten/', to: '/faq/', action: '301_WITHIN_OLD_DOMAIN' },
  { from: '/kontakt/', to: 'https://mpudeincoach.de/#fallanalyse', action: '301_TO_MAIN_SITE' },
  { from: '/mpu-vorbereitung/', to: 'https://mpudeincoach.de/mpu-vorbereitung', action: '301_TO_MAIN_SITE' },
  { from: '/mpu-online-vorbereitung/', to: 'https://mpudeincoach.de/mpu-vorbereitung-online', action: '301_TO_MAIN_SITE' },
  { from: '/online-mpu-vorbereitung/', to: 'https://mpudeincoach.de/mpu-vorbereitung-online', action: '301_TO_MAIN_SITE' },
  { from: '/online-vorbereitung/', to: 'https://mpudeincoach.de/mpu-vorbereitung-online', action: '301_TO_MAIN_SITE' },
  { from: '/mpu-vorbereitung-schwaebisch-hall/', to: 'https://mpudeincoach.de/mpu-vorbereitung-schwaebisch-hall', action: '301_TO_MAIN_SITE' },
  { from: '/vorbereitung-schwaebisch-hall/', to: 'https://mpudeincoach.de/mpu-vorbereitung-schwaebisch-hall', action: '301_TO_MAIN_SITE' },
  { from: '/mpu-vorbereitung-crailsheim/', to: 'https://mpudeincoach.de/mpu-vorbereitung-crailsheim', action: '301_TO_MAIN_SITE' },
  { from: '/preisangebot/', to: 'https://mpudeincoach.de/angebote', action: '301_TO_MAIN_SITE' },
  { from: '/shop/', to: 'https://mpudeincoach.de/angebote', action: '301_TO_MAIN_SITE' },
  { from: '/buchungsbestaetigung-mpu-deincoach/', action: '410' },
  { from: '/einrichtung-teams/', action: '410' },
  { from: '/mpu-vorbereitung-kaiserslautern/', action: '410' },
  { from: '/mpu-vorbereitung-covid-19/', action: '410' },
  { from: '/warenkorb/', action: '410' },
  { from: '/kasse/', action: '410' },
  { from: '/mein-konto/', action: '410' },
  { from: '/abstinenzradt/', action: '410' },
  { from: '/linkbaum/', action: '410' },
  { from: '/elementor-51115/', action: '410' },
  { from: '/mpu-vorbereitung-ellwangen/', action: 'MANUAL_REVIEW' },
];

export const redirectForPath = (path: string) => LEGACY_REDIRECTS.find((item) => item.from === path);
