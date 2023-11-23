'use client';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import BreadCrumbs from '../breadcrumbs/breadcrumbs';
import { updateInvoice } from '@/lib/actions';
import './styles/edit-form.scss';

type EditFormType = {
  id: string;
  customers: {
    id: string;
    name: string;
  }[];
  singleInvoice: {
    id: string;
    customer_id: string;
    status: string;
    amount: number;
  } | null;
};

export default function EditForm({
  customers,
  singleInvoice,
  id,
}: EditFormType) {
  const amount = singleInvoice?.amount!;
  const updateInvoiceWithId = updateInvoice.bind(null, id);
  return (
    <main className="edit">
      <BreadCrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${singleInvoice?.id}/edit`,
            active: true,
          },
        ]}
      />
      <form action={updateInvoiceWithId}>
        <div className="edit-form">
          <input type="hidden" name="id" value={singleInvoice?.id} />
          <div className="edit-form__row-customer">
            <label htmlFor="customer">Choose customer</label>
            <div className="edit-form__row-select-customer">
              <select
                name="customerId"
                id="customer"
                defaultValue={singleInvoice?.customer_id}
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="edit-form__icon" />
            </div>
          </div>

          <div className="edit-form__row-amount">
            <label htmlFor="amount">Choose an amount</label>
            <div className="edit-form__row-select-amount">
              <input
                id="amount"
                name="amount"
                type="number"
                defaultValue={amount / 100}
                placeholder="Enter USD amount"
              />
              <CurrencyDollarIcon className="edit-form__icon" />
            </div>
          </div>

          <div className="edit-form__row-status">
            <label htmlFor="status">Set the invoice status</label>
            <div className="edit-form__row-status-inner-wrapper">
              <div className="edit-form__row-select-status">
                <input
                  type="radio"
                  name="status"
                  id="pending"
                  value="pending"
                  defaultChecked={singleInvoice?.status === 'pending'}
                />
                <label htmlFor="pending">
                  Pending
                  <ClockIcon className="edit-form__icon" />
                </label>
              </div>
              <div className="edit-form__row-select-status">
                <input
                  type="radio"
                  name="status"
                  id="paid"
                  value="paid"
                  defaultChecked={singleInvoice?.status === 'paid'}
                />
                <label htmlFor="paid">
                  Paid
                  <CheckIcon className="edit-form__icon" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="edit-form-buttons">
          <Link href="/dashboard/invoices" className="cancel-button">
            Cancel
          </Link>
          <button type="submit">Edit Invoice</button>
        </div>
      </form>
    </main>
  );
}
