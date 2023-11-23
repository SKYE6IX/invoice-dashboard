import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import './styles/status.scss';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx('status', {
        'status-pending': status === 'pending',
        'status-paid': status === 'paid',
      })}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="status-icon" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="status-icon" />
        </>
      ) : null}
    </span>
  );
}
