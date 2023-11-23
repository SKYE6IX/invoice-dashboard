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
import { createInvoice } from '@/lib/actions';
import './styles/create-form.scss';

type CreateFormType = {
  customers: {
    id: string;
    name: string;
  }[];
};

export default function CreateForm({ customers }: CreateFormType) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);

  return (
    <main className="create">
      <BreadCrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: `/dashboard/invoices/create`,
            active: true,
          },
        ]}
      />
      <form action={dispatch}>
        <div className="create-form">
          <div className="create-form__row-customer">
            <label htmlFor="customer">Choose customer</label>
            <div className="create-form__row-select-customer">
              <select name="customerId" id="customer" defaultValue="">
                <option value="" disabled>
                  Select a customer
                </option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="create-form__icon" />
            </div>
            {state.errors?.customerId ? (
              <div className="create-form__error">
                {state.errors.customerId.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="create-form__row-amount">
            <label htmlFor="amount">Choose an amount</label>
            <div className="create-form__row-select-amount">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter USD amount"
              />
              <CurrencyDollarIcon className="create-form__icon" />
            </div>
            {state.errors?.amount ? (
              <div className="create-form__error">
                {state.errors.amount.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="create-form__row-status">
            <label htmlFor="status">Set the invoice status</label>
            <div className="create-form__row-status-inner-wrapper">
              <div className="create-form__row-select-status">
                <input
                  type="radio"
                  name="status"
                  id="pending"
                  value="pending"
                />
                <label htmlFor="pending">
                  Pending
                  <ClockIcon className="create-form__icon" />
                </label>
              </div>
              <div className="create-form__row-select-status">
                <input type="radio" name="status" id="paid" value="paid" />
                <label htmlFor="paid">
                  Paid
                  <CheckIcon className="create-form__icon" />
                </label>
              </div>
            </div>
            {state.errors?.status ? (
              <div className="create-form__error">
                {state.errors.status.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="create-form-buttons">
          <Link href="/dashboard/invoices" className="cancel-button">
            Cancel
          </Link>
          <button type="submit">Create Invoice</button>
        </div>
      </form>
    </main>
  );
}
