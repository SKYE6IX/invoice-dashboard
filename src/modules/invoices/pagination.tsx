'use client';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/lib/utils';
import './styles/pagination.scss';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="pagination">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      {allPages.map((page, i) => {
        let position: 'first' | 'last' | 'single' | 'middle' | undefined;
        if (i === 0) position = 'first';
        if (i === allPages.length - 1) position = 'last';
        if (allPages.length === 1) position = 'single';
        if (page === '...') position = 'middle';
        return (
          <PaginationNumber
            key={i}
            page={page}
            href={createPageURL(page)}
            position={position}
            isActive={currentPage === page}
          />
        );
      })}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx('pagination__number', {
    pagination__number_active: isActive,
  });

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx('pagination__arrow', {
    pagination__arrow_left: direction === 'left',
    pagination__arrow_right: direction === 'right',
    pagination__arrow_disabled: isDisabled,
  });
  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="arrow-icon" />
    ) : (
      <ArrowRightIcon className="arrow-icon" />
    );
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
