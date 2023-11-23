import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import './styles/card.scss';

type CardProps = {
  titile: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
};

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function Card({ titile, value, type }: CardProps) {
  const Icon = iconMap[type];
  return (
    <div className="card">
      <div className="card__header">
        {Icon && <Icon className="card__icon" />}
        <h3 className="card__title">{titile}</h3>
      </div>
      <p className="card__value">{value}</p>
    </div>
  );
}
