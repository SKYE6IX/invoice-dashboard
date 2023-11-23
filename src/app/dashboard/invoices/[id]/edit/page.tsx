import EditForm from '@/modules/invoices/edit-form';
import { fetchCustomers, fetchInvoiceById } from '@/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const customers = await fetchCustomers();
  const singleInvoice = await fetchInvoiceById(id);

  return (
    <EditForm customers={customers} singleInvoice={singleInvoice} id={id} />
  );
}
