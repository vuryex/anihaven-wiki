import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface SocialsPageProps {
  config: {
    discord_url: string;
    github_url: string;
    twitter_url: string;
    bluesky_url: string;
    tiktok_url: string;
  };
}

const SocialsPage: React.FC<SocialsPageProps> = ({ config }) => {
  const socials = [
    {
      name: 'Discord',
      url: config.discord_url,
      description: 'Join our main community hub for real-time chat, events, and discussions.',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'GitHub',
      url: config.github_url,
      description: 'Explore our open-source projects and contribute to development.',
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'Twitter/X',
      url: config.twitter_url,
      description: 'Follow us for updates, announcements, and community highlights.',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Bluesky',
      url: config.bluesky_url,
      description: 'Connect with us on the decentralized social network.',
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'TikTok',
      url: config.tiktok_url,
      description: 'Watch our short-form content and community moments.',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  return (
    <>
      <Head>
        <title>Socials - AniHaven Wiki</title>
        <meta name="description" content="Connect with AniHaven on social media" />
      </Head>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Social Media</h1>
          <p className="text-text-secondary text-lg">
            Stay connected with the AniHaven community across all our social platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socials.map((social, index) => (
            <div key={index} className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                
                <h3 className="text-xl font-semibold text-text-primary">{social.name}</h3>
              </div>
              
              <p className="text-text-secondary mb-4">{social.description}</p>
              
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-white px-4 py-2 rounded transition-colors ${social.color}`}
              >
                Follow on {social.name}
              </a>
            </div>
          ))}
        </div>

        
        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Community Guidelines</h2>
          <p className="text-text-secondary mb-4">
            When interacting with us on social media, please remember to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>Be respectful and kind to everyone</li>
            <li>Keep content appropriate for all audiences</li>
            <li>Follow each platform's community guidelines</li>
            <li>Tag us when sharing community content</li>
            <li>Report any issues to our moderators</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let config = {
    discord_url: 'https://discord.anihaven.site',
    github_url: 'https://github.com/',
    twitter_url: 'https://twitter.com/',
    bluesky_url: 'https://bsky.app/',
    tiktok_url: 'https://tiktok.com/'
  };

  try {
    const configPath = path.join(process.cwd(), 'content', 'config', 'general.yml');
    if (fs.existsSync(configPath)) {
      const configFile = fs.readFileSync(configPath, 'utf8');
      const loadedConfig = yaml.load(configFile) as any;
      config = { ...config, ...loadedConfig };
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }

  return {
    props: {
      config,
    },
    revalidate: 60,
  };
};

export default SocialsPage;