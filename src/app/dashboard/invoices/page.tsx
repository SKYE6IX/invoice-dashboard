import InvoicesPage from '@/modules/invoices';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return <InvoicesPage currentPage={currentPage} query={query} />;
}
