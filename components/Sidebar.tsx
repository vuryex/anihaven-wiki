import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  const router = useRouter();

  const communityPages = [
    { name: 'About', href: '/about' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Support', href: '/support' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Tools', href: '/tools' },
    { name: 'Expanding Wiki', href: '/expanding-wiki' },
  ];

  const staticResources = [
    { name: 'Staff Applications', href: '/staff' },
    { name: 'Our SMP', href: '/smp' },
    { name: 'Socials', href: '/socials' },
  ];

  const quickLinks = [
    { name: 'Discord Server', url: 'https://discord.anihaven.site', external: true },
    { name: 'Minecraft SMP', text: 'smp.anihaven.site' },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      <aside
        className={`
          fixed left-0 top-16 bottom-0 w-64 bg-dark-gray border-r border-light-gray overflow-y-auto z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'lg:translate-x-0' : ''}
        `}
      >
        <div className="p-4">
          {/* Mobile close button */}
          {isMobile && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-semibold text-text-primary">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-text-secondary hover:text-accent-red hover:bg-medium-gray transition-colors"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="space-y-6">
            {/* Community Pages */}
            <div>
              <h3 className="text-accent-red font-semibold mb-3 text-sm uppercase tracking-wide">Community Wiki</h3>
              <ul className="space-y-1">
                {communityPages.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        router.pathname === item.href
                          ? 'bg-accent-red text-white'
                          : 'text-text-muted hover:bg-medium-gray hover:text-accent-red hover:translate-x-1'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Static Resources */}
            <div>
              <h3 className="text-accent-red font-semibold mb-3 text-sm uppercase tracking-wide">Static Resources</h3>
              <ul className="space-y-1">
                {staticResources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        router.pathname === item.href
                          ? 'bg-accent-red text-white'
                          : 'text-text-muted hover:bg-medium-gray hover:text-accent-red hover:translate-x-1'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-accent-red font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h3>
              <ul className="space-y-1">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    {item.external ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="block px-3 py-2 rounded-md text-sm text-text-muted hover:bg-medium-gray hover:text-accent-red transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ) : (
                      <div className="px-3 py-2 rounded-md text-sm">
                        <div className="font-medium text-text-secondary">{item.name}</div>
                        <div className="text-xs text-text-muted mt-1 font-mono">{item.text}</div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile navigation links (visible only on mobile when sidebar is open) */}
            {isMobile && (
              <div className="lg:hidden border-t border-light-gray pt-4">
                <h3 className="text-accent-red font-semibold mb-3 text-sm uppercase tracking-wide">Navigation</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        router.pathname === '/'
                          ? 'bg-accent-red text-white'
                          : 'text-text-muted hover:bg-medium-gray hover:text-accent-red'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        router.pathname === '/about'
                          ? 'bg-accent-red text-white'
                          : 'text-text-muted hover:bg-medium-gray hover:text-accent-red'
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/smp-guide"
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        router.pathname === '/smp-guide'
                          ? 'bg-accent-red text-white'
                          : 'text-text-muted hover:bg-medium-gray hover:text-accent-red'
                      }`}
                    >
                      SMP Guide
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;