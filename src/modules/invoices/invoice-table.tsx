import Image from 'next/image';
import Status from './status';
import { UpdateInvoice, DeleteInvoice } from './buttons';
import { formatCurrency, formatDateToLocal } from '@/lib/utils';
import './styles/invoice-table.scss';

type InvoicesTableType = {
  invoices: {
    id: string;
    status: string;
    amount: number;
    date: string;
    customer: {
      name: string;
      email: string;
      image_url: string;
    };
  }[];
};

export default function InvoiceTable({ invoices }: InvoicesTableType) {
  return (
    <div className="container">
      <table className="invoice-table">
        <thead className="invoice-table__header">
          <tr className="invoice-table__header-row">
            <th scope="col" className="invoice-table__header-item">
              Customer
            </th>
            <th scope="col" className="invoice-table__header-item">
              Email
            </th>
            <th scope="col" className="invoice-table__header-item">
              Amount
            </th>
            <th scope="col" className="invoice-table__header-item">
              Date
            </th>
            <th scope="col" className="invoice-table__header-item">
              Status
            </th>
            <th scope="col" className="invoice-table__header-item">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="invoice-table__body">
          {invoices.map((invoice, i) => (
            <tr key={i} className="invoice-table__body-row">
              <td className="invoice-table__item">
                <div className="invoice-table__item-customer-info">
                  <Image
                    src={invoice.customer.image_url}
                    alt={invoice.customer.name}
                    width={32}
                    height={32}
                    className="customer-avatar"
                  />
                  <p>{invoice.customer.name}</p>
                </div>
              </td>
              <td className="invoice-table__item">{invoice.customer.email}</td>
              <td className="invoice-table__item">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="invoice-table__item">
                {formatDateToLocal(invoice.date)}
              </td>
              <td className="invoices-table__item">
                <Status status={invoice.status} />
              </td>
              <td className="invoices-table__item">
                <div className="invoices-table__item-action">
                  <UpdateInvoice id={invoice.id} />
                  <DeleteInvoice id={invoice.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
