import type { Content } from '../content/types';

export interface HoursTableProps {
  t: Content;
}

export default function HoursTable({ t }: HoursTableProps) {
  return (
    <table className="hours">
      <tbody>
        {t.practical.hours.map((row) => (
          <tr key={row.day}>
            <th scope="row">{row.day}</th>
            <td className={row.closed ? 'closed' : undefined}>{row.open}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
