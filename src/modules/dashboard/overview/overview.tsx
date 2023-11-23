import Card from '../card/card';
import RevenueChart from '../revenue-chart/revenue-chart';
import LatestInvoice from '../latest-invoice/latest-invoice';
import { fetchCardData, fetchRevenue, fetchLatestInvoices } from '@/lib/data';
import './styles/overview.scss';

export default async function Overview() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfCustomers,
    numberOfInvoices,
  } = await fetchCardData();
  const revenues = await fetchRevenue();
  const latestInvoice = await fetchLatestInvoices();

  return (
    <div className="overview">
      <h2 className="overview__title">Dasboard</h2>
      <div className="overview__header">
        <Card titile="Collected" value={totalPaidInvoices} type="collected" />
        <Card titile="Pending" value={totalPendingInvoices} type="pending" />
        <Card titile="Total Invoice" value={numberOfInvoices} type="invoices" />
        <Card
          titile="Total Customer"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="overview__body">
        <RevenueChart revenues={revenues} />
        <LatestInvoice data={latestInvoice} />
      </div>
    </div>
  );
}
