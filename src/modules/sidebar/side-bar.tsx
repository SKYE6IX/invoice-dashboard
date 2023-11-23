import NavLinks from './nav-links';
import SkyeLogo from '../skye-logo/skye-logo';
import SignOutButton from './sign-out';
import './styles/side-bar.scss';

export default function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__image-bg"></div>
      <div className="side-bar__logo-container">
        <SkyeLogo />
      </div>
      <div className="side-bar__inner-wrapper">
        <div className="side-bar__links">
          <NavLinks />
        </div>
        <div className="side-bar__actions">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
