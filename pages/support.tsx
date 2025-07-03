import React from 'react';
import Head from 'next/head';

const SupportPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Support - AniHaven Wiki</title>
        <meta name="description" content="Get help and support from the AniHaven community" />
      </Head>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Support</h1>
          <p className="text-text-secondary text-lg">
            Need help? We're here to assist you with any questions or issues you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Discord Support</h3>
            <p className="text-text-secondary mb-4">
              Get real-time help from our community and staff members.
            </p>
            <a 
              href="https://discord.anihaven.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red-hover transition-colors"
            >
              Join Discord
            </a>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">FAQ</h3>
            <p className="text-text-secondary mb-4">
              Check our frequently asked questions for quick answers.
            </p>
            <a 
              href="/faq" 
              className="inline-block bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red-hover transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Common Issues</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-text-primary">Can't connect to Minecraft server</h4>
              <p className="text-text-secondary text-sm">
                Make sure you're using the correct server address: smp.anihaven.site
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Discord invite not working</h4>
              <p className="text-text-secondary text-sm">
                Try using our redirect link: https://discord.anihaven.site
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Account or permissions issues</h4>
              <p className="text-text-secondary text-sm">
                Contact a staff member on Discord for assistance with account related problems.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-text-primary">Discord</h4>
              <p className="text-text-secondary">https://discord.anihaven.site</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Response Time</h4>
              <p className="text-text-secondary">We typically respond within 24 hours</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Staff Hours</h4>
              <p className="text-text-secondary">Online daily, with fastest response during evenings (EST)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;