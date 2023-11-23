'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import './styles/nav-links.scss';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="nav-link">
      {links.map((link, i) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={i}
            href={link.href}
            className={clsx('nav-link__list', {
              'nav-link__list_active': pathname === link.href,
            })}
          >
            <LinkIcon className="link-icon" />
            <p className="link-name">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
