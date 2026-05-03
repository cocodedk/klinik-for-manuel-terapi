import { useEffect } from 'react';
import Home from './pages/Home';

type Lang = 'da' | 'en';

interface AppProps {
  lang: Lang;
}

// Placeholder translation objects. Real content lands in plan 07/08; this
// shell only proves the routing + lang prop wiring works end-to-end.
const da = { hello: 'Klinik for Manuel Terapi' };
const en = { hello: 'Klinik for Manuel Terapi' };

export default function App({ lang }: AppProps) {
  // Keep the document language in sync with the route. The static shell
  // ships with lang="da"; switching to /en/ updates it for screen readers.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === 'da' ? da : en;

  return (
    <main>
      <Home t={t} />
    </main>
  );
}
