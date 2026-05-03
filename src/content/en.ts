// Plan 08 will replace these strings with the English copy.
// Temporarily mirrors `da` so the /en/ route keeps building; only the routing
// metadata (langCode, altHref, altLangCode, altLabel) is EN-correct here.

import type { Content } from './types';
import { da } from './da';

export const en: Content = {
  ...da,
  langCode: 'en',
  altHref: '/',
  altLangCode: 'da',
  altLabel: 'DA',
};
