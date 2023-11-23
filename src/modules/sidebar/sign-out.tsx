import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '../../auth';
import './styles/sign-out.scss';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="sign-out-button">
        <PowerIcon className="sign-out-icon" />
        Sign Out
      </button>
    </form>
  );
}
