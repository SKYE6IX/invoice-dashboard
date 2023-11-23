import { fetchFilteredCustomers } from '@/lib/data';
import Customers from '@/modules/customers/customers';

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query || '';
  const filterdCustomers = await fetchFilteredCustomers(query);

  return <Customers customersData={filterdCustomers} />;
}
