import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  // Split navigation into different groups
  const communityPages = [
    { name: 'About', href: '/about' },
    { name: 'SMP Guide', href: '/smp-guide' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Support', href: '/support' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Tools', href: '/tools' },
    { name: 'Expanding Wiki', href: '/expanding-wiki' },
  ];

  const staticResources = [
    { name: 'Staff Applications', href: '/staff' },
    { name: 'Development', href: '/development' },
    { name: 'Our SMP', href: '/smp' },
    { name: 'Socials', href: '/socials' },
  ];

  const quickLinks = [
    { name: 'Discord Server', url: 'https://discord.anihaven.site', external: true },
    { name: 'Minecraft SMP', text: 'smp.anihaven.site' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-dark-gray border-r border-light-gray overflow-y-auto">
      <div className="p-4">
        <div className="space-y-6">
          {/* Community Pages */}
          <div>
            <h3 className="text-accent-red font-semibold mb-3">Community Wiki</h3>
            <ul className="space-y-2">
              {communityPages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
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
            <h3 className="text-accent-red font-semibold mb-3">Static Resources</h3>
            <ul className="space-y-2">
              {staticResources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
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
            <h3 className="text-accent-red font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  {item.external ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 rounded-md text-sm text-text-muted hover:bg-medium-gray hover:text-accent-red transition-all duration-200"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <div className="px-3 py-2 rounded-md text-sm text-text-muted">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-text-muted">{item.text}</div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;