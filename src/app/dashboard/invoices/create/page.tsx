import CreateForm from '@/modules/invoices/create-form';
import { fetchCustomers } from '@/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();
  return <CreateForm customers={customers} />;
}
