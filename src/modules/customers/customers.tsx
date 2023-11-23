import Image from 'next/image';
import Search from '../search/search';
import './styles/customers.scss';

type CustomersData = {
  totalInvoice: number;
  totalPending: string;
  totalPaid: string;
  id: string;
  _count: {
    invoices: number;
  };
  name: string;
  email: string;
  image_url: string;
  invoices: {
    amount: number;
    status: string;
  }[];
};
export default function Customers({
  customersData,
}: {
  customersData: CustomersData[];
}) {
  return (
    <>
      <h2 className="customer-title">Customers</h2>
      <div>
        <Search placeholder="Search customer" />
      </div>
      <div className="container">
        <table className="customer-table">
          <thead className="customer-table__header">
            <tr className="customer-table__header-row">
              <th scope="col" className="customer-table__header-item">
                Name
              </th>
              <th scope="col" className="customer-table__header-item">
                Email
              </th>
              <th scope="col" className="customer-table__header-item">
                Total Invoice
              </th>
              <th scope="col" className="customer-table__header-item">
                Total Pending
              </th>
              <th scope="col" className="customer-table__header-item">
                Total Paid
              </th>
            </tr>
          </thead>

          <tbody className="customer-table__body">
            {customersData.map((customer) => (
              <tr key={customer.id} className="customer-table__body-row">
                <td className="customer-table__item">
                  <div className="customer-table__item-name-wrapper">
                    <Image
                      src={customer.image_url}
                      alt={customer.name}
                      width={32}
                      height={32}
                      className="customer-avatar"
                    />
                    <p>{customer.name}</p>
                  </div>
                </td>
                <td className="customer-table__item">{customer.email}</td>
                <td className="customer-table__item">
                  {customer.totalInvoice}
                </td>
                <td className="customer-table__item">
                  {customer.totalPending}
                </td>
                <td className="customer-table__item">{customer.totalPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
