import { clsx } from 'clsx';
import Link from 'next/link';
import './styles/breadcrumbs.scss';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function BreadCrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb__nav-list">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx('breadcrumb__nav-list-item', {
              'breadcrumb__nav-list-item_active': breadcrumb.active,
            })}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="breadcrumb__nav-list-divider">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
