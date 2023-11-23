import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import { formatCurrency } from '@/lib/utils';
import './styles/latest-invoice.scss';

type LatestInvoiceType = {
  amount: number;
  customer: {
    name: string;
    email: string;
    image_url: string;
  };
};

export default function LatestInvoice({ data }: { data: LatestInvoiceType[] }) {
  return (
    <div className="latest-invoice">
      <h2 className="latest-invoice__title"> Latest Invoices</h2>
      <div className="latest-invoice__inner-wrapper">
        <div className="latest-invoice__body">
          {data.map((latestInvoice, i) => (
            <div
              key={i}
              className={clsx('latest-invoice__table', {
                'latest-invoice__table_underline': i !== 0,
              })}
            >
              <div className="latest-invoice__customer">
                <Image
                  src={latestInvoice.customer.image_url}
                  alt={latestInvoice.customer.name}
                  width={32}
                  height={32}
                  className="customer-avatar"
                />
                <div className="latest-invoice__customer-info">
                  <p>{latestInvoice.customer.name}</p>
                  <p>{latestInvoice.customer.email}</p>
                </div>
              </div>
              <p>{formatCurrency(latestInvoice.amount)}</p>
            </div>
          ))}
        </div>
        <div className="latest-invoice__footer">
          <ArrowPathIcon className="arrow-icon" />
          <h3>Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
