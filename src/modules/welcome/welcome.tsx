import Image from 'next/image';
import Link from 'next/link';
import SkyeLogo from '../skye-logo/skye-logo';
import './styles/welcome.scss';

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__header">
        <SkyeLogo />
      </div>
      <div className="welcome__body">
        <div className="welcome__text-wrapper">
          <p>
            <strong>Welcome to Skye Dashboard!</strong> This user-friendly
            platform is designed to stremaline your invoicing process. Easily
            create, manage, and track invoices with just a few click. Get
            started now and take control.
          </p>
          <Link href="/login" className="welcome__link">
            Log in
          </Link>
        </div>
        <div className="welcome__hero">
          <Image
            src="/hero-image.jpg"
            alt="hero image"
            width={700}
            height={500}
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}
