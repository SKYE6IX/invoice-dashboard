import { GlobeAltIcon } from '@heroicons/react/24/outline';
import './styles/skye-logo.scss';

export default function SkyeLogo() {
  return (
    <div className="logo">
      <GlobeAltIcon className="logo__icon" />
      <p className="logo__text">Skye</p>
    </div>
  );
}
