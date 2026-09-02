import { Link } from 'react-router-dom';

export interface Crumb { label: string; path?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Brotkrumen-Navigation">
      <ol>
        <li><Link to="/">Start</Link></li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} aria-current={index === items.length - 1 ? 'page' : undefined}>
            {item.path && index < items.length - 1 ? <Link to={item.path}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
