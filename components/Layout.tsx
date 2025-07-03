import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  config?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, config }) => {
  const router = useRouter();
  
  const headerNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'SMP Guide', href: '/smp-guide' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Support', href: '/support' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-oled-black text-text-primary">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-oled-black via-dark-gray to-oled-black border-b border-light-gray backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-text-primary hover:text-accent-red transition-colors">
                AniHaven Wiki
              </Link>
            </div>
            
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-4">
                {headerNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      router.pathname === item.href
                        ? 'bg-accent-red text-white'
                        : 'text-text-secondary hover:bg-medium-gray hover:text-accent-red'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-16 flex">
        <Sidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;