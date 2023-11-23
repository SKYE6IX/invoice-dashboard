import SideBar from '@/modules/sidebar/side-bar';
import './styles/layout.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <div className="layout__side-bar">
        <SideBar />
      </div>
      <div className="layout__page">{children}</div>
    </div>
  );
}
