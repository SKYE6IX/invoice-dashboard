'use client';
import { useFormState } from 'react-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import SkyeLogo from '../skye-logo/skye-logo';
import { authenticate } from '@/lib/actions';
import './styles/login-form.scss';

export default function LoginPage() {
  const [code, action] = useFormState(authenticate, undefined);
  return (
    <div className="login-form">
      <div className="login-form__inner-container">
        <div className="login-form__header">
          <SkyeLogo />
          <p>Please enter login information</p>
        </div>
        <form action={action}>
          <div className="login-form__input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login-form__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="login-form__button">
            Login
          </button>
          <div className="login-form__error">
            {code === 'CredentialSignin' && (
              <>
                <ExclamationCircleIcon className="error-icon" />
                <p aria-live="polite">Invalid credentials</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
