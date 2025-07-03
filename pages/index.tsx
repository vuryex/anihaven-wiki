// Hardcoded 
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getRecentContent, MarkdownContent } from '../lib/markdown';

interface HomePageProps {
  recentContent: MarkdownContent[];
}

const HomePage: React.FC<HomePageProps> = ({ recentContent }) => {
  return (
    <>
      <Head>
        <title>AniHaven Wiki - Home</title>
        <meta name="description" content="Welcome to the AniHaven community wiki" />
      </Head>
      
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Welcome to AniHaven Wiki
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A community-driven wiki built by and for our members. 
            Everything you see here is created by people like you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">SMP Guide</h3>
            <p className="text-text-secondary mb-4">
              Learn how to get started on our SMP!.
            </p>
            <Link href="/getting-started" className="text-accent-red hover:text-accent-red-hover transition-colors">
              Get Started →
            </Link>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Our SMP</h3>
            <p className="text-text-secondary mb-4">
              Join our Minecraft SMP server and become part of our gaming community.
            </p>
            <Link href="/smp" className="text-accent-red hover:text-accent-red-hover transition-colors">
              Join SMP →
            </Link>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Discord</h3>
            <p className="text-text-secondary mb-4">
              Connect with our community on Discord for real-time chat and events.
            </p>
            <a 
              href="https://discord.anihaven.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-red hover:text-accent-red-hover transition-colors"
            >
              Join Discord →
            </a>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Tools</h3>
            <p className="text-text-secondary mb-4">
              Discover our collection of useful tools and utilities for the community.
            </p>
            <Link href="/tools" className="text-accent-red hover:text-accent-red-hover transition-colors">
              View Tools →
            </Link>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Development</h3>
            <p className="text-text-secondary mb-4">
              Check out our open-source projects and contribute to our development efforts.
            </p>
            <Link href="/development" className="text-accent-red hover:text-accent-red-hover transition-colors">
              View Projects →
            </Link>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Support</h3>
            <p className="text-text-secondary mb-4">
              Need help? Find answers to common questions and get support.
            </p>
            <Link href="/support" className="text-accent-red hover:text-accent-red-hover transition-colors">
              Get Support →
            </Link>
          </div>
        </div>

        {recentContent.length > 0 && (
          <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Recent Wiki Activity</h2>
            <div className="space-y-3">
              {recentContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-light-gray last:border-b-0">
                  <div>
                    <Link href={`/${content.slug}`} className="text-text-primary hover:text-accent-red transition-colors font-medium">
                      {content.title}
                    </Link>
                    {content.author && (
                      <p className="text-text-muted text-sm">by {content.author}</p>
                    )}
                  </div>
                  <div className="text-text-muted text-sm">
                    {new Date(content.lastModified).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Quick Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-text-primary">Minecraft SMP</h4>
              <p className="text-text-secondary">smp.anihaven.site</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Discord</h4>
              <p className="text-text-secondary">discord.anihaven.site</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Help Build Our Wiki!</h3>
          <p className="text-text-secondary mb-4">
            This wiki is built by our community members. Every page you see can be edited and improved by people like you.
          </p>
          <p className="text-text-muted text-sm">
            You'll be able to add changes to the Wiki via Pull Requests on Github. All changes are reviewed before going live.
          </p>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recentContent = getRecentContent(5);
  
  return {
    props: {
      recentContent,
    },
    revalidate: 60,
  };
};

export default HomePage;