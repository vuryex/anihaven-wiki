import React from 'react';
import Head from 'next/head';

const StaffPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Staff Applications - AniHaven Wiki</title>
        <meta name="description" content="Apply to become a staff member at AniHaven" />
      </Head>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Staff Applications</h1>
          <p className="text-text-secondary text-lg">
            Interested in helping moderate and grow the AniHaven community? Learn about our staff positions and application process.
          </p>
        </div>

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Application Status</h2>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-text-primary font-medium">Applications Currently Closed</span>
          </div>
          <p className="text-text-secondary">
            Staff applications are not currently open. We'll announce when new positions become available on our Discord server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Moderator</h3>
            <p className="text-text-secondary mb-4">
              Help maintain a positive community environment and assist members with questions and issues.
            </p>
            <h4 className="font-semibold text-text-primary mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
              <li>Monitor chat and enforce community rules</li>
              <li>Help new members get started</li>
              <li>Assist with community events</li>
              <li>Report issues to senior staff</li>
            </ul>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Event Coordinator</h3>
            <p className="text-text-secondary mb-4">
              Plan and organize community events, activities, and special occasions.
            </p>
            <h4 className="font-semibold text-text-primary mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
              <li>Plan and host community events</li>
              <li>Coordinate with other staff members</li>
              <li>Create event announcements</li>
              <li>Gather feedback and improve events</li>
            </ul>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Developer</h3>
            <p className="text-text-secondary mb-4">
              Contribute to our technical projects, bots, and community tools.
            </p>
            <h4 className="font-semibold text-text-primary mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
              <li>Develop and maintain Discord bots</li>
              <li>Work on community websites and tools</li>
              <li>Fix bugs and implement new features</li>
              <li>Code review and documentation</li>
            </ul>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Content Creator</h3>
            <p className="text-text-secondary mb-4">
              Create and manage content for our community platforms and social media.
            </p>
            <h4 className="font-semibold text-text-primary mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
              <li>Create graphics and visual content</li>
              <li>Manage social media accounts</li>
              <li>Write community announcements</li>
              <li>Produce video content and tutorials</li>
            </ul>
          </div>
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">General Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                <li>Active member of the community for at least 1 month</li>
                <li>Positive attitude and helpful nature</li>
                <li>Available for at least 10 hours per week</li>
                <li>18+ years old (exceptions may be made)</li>
                <li>Good understanding of Discord and community etiquette</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Preferred Qualifications</h4>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                <li>Previous moderation experience</li>
                <li>Knowledge of anime and gaming culture</li>
                <li>Experience with community management</li>
                <li>Technical skills (for developer positions)</li>
                <li>Creative skills (for content creator positions)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Application Process</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h4 className="font-semibold text-text-primary">Wait for Applications to Open</h4>
                <p className="text-text-secondary text-sm">We'll announce when staff applications are available on Discord</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h4 className="font-semibold text-text-primary">Submit Application</h4>
                <p className="text-text-secondary text-sm">Fill out the application form with detailed responses</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h4 className="font-semibold text-text-primary">Interview Process</h4>
                <p className="text-text-secondary text-sm">Selected candidates will be invited for a voice interview</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <h4 className="font-semibold text-text-primary">Trial Period</h4>
                <p className="text-text-secondary text-sm">New staff members start with a 2-week trial period</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Get Notified</h2>
          <p className="text-text-secondary mb-4">
            Want to be notified when staff applications open? Join our Discord server and enable notifications for announcements.
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
      </div>
    </>
  );
};

export default StaffPage;