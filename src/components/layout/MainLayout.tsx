import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export const MainLayout = ({ children, showNav = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      {showNav && <Navbar />}
      <main className={showNav ? 'pt-16 lg:pt-20' : ''}>
        {children}
      </main>
    </div>
  );
};