// Placeholder Home component. Real layout + content lands in plan 07.
// Accepts loose `t` for now since the Content interface is defined in plan 06.

interface HomeProps {
  t: any;
}

export default function Home({ t }: HomeProps) {
  return <p>Scaffold ok ({t.hello})</p>;
}
