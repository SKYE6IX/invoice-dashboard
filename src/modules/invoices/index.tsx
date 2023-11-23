import InvoiceTable from './invoice-table';
import Search from '../search/search';
import Pagination from './pagination';
import { CreateInvoice } from './buttons';
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/lib/data';
import './styles/index.scss';

type InvoicesPageType = {
  query: string;
  currentPage: number;
};
export default async function InvoicesPage({
  query,
  currentPage,
}: InvoicesPageType) {
  const filterResult = await fetchFilteredInvoices(query, currentPage);
  const totalPages = await fetchInvoicesPages(query);
  if (!filterResult) return <p>Loading...</p>;
  return (
    <div className="invoices-page">
      <h2 className="invoices-page__title">Invoices</h2>
      <div className="invoices-page__header">
        <Search placeholder="Search invoices" />
        <CreateInvoice />
      </div>
      <div className="invoices-page__body">
        <InvoiceTable invoices={filterResult} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
