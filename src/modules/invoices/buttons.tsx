import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/lib/actions';
import './styles/buttons.scss';

export function CreateInvoice() {
  return (
    <Link href="/dashboard/invoices/create" className="create-button">
      <span className="">Create Invoice</span>
      <PlusIcon className="button-icon" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id?: string }) {
  return (
    <Link href={`/dashboard/invoices/${id}/edit`} className="update-button">
      <PencilIcon className="button-icon" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button className="delete-button">
        <TrashIcon className="button-icon" />
      </button>
    </form>
  );
}
