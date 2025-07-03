import React from 'react';

interface SocialLinksProps {
  config: {
    discord_url?: string;
    github_url?: string;
    twitter_url?: string;
    bluesky_url?: string;
    tiktok_url?: string;
  };
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ config, className = '' }) => {
  const socials = [
    {
      name: 'Discord',
      url: config.discord_url || 'https://discord.anihaven.site',
      icon: '💬',
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: config.github_url || 'https://github.com/',
      icon: '🔧',
      color: 'hover:text-gray-400'
    },
    {
      name: 'Twitter',
      url: config.twitter_url || 'https://twitter.com/',
      icon: '🐦',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Bluesky',
      url: config.bluesky_url || 'https://bsky.app/',
      icon: '🌐',
      color: 'hover:text-sky-400'
    },
    {
      name: 'TikTok',
      url: config.tiktok_url || 'https://tiktok.com/',
      icon: '🎵',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-text-muted transition-colors ${social.color}`}
          title={social.name}
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;