import { Link } from 'react-router-dom';

interface BackLinkProps {
  href: string;
  label: string;
}

export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link className="back-link" to={href}>
      ← {label}
    </Link>
  );
}
