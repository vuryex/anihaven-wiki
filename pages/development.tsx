import React from 'react';
import Head from 'next/head';
import GitHubRepos from '../components/GitHubRepos';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface DevelopmentPageProps {
  selectedRepos: string[];
}

const DevelopmentPage: React.FC<DevelopmentPageProps> = ({ selectedRepos }) => {
  return (
    <>
      <Head>
        <title>Development - AniHaven Wiki</title>
        <meta name="description" content="AniHaven development projects and repositories" />
      </Head>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Development</h1>
          <p className="text-text-secondary">
            Explore our open-source projects and contribute to the AniHaven community development.
          </p>
        </div>

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Contributing</h2>
          <p className="text-text-secondary mb-4">
            We welcome contributions from the community! Here's how you can get involved:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>Fork any of our repositories</li>
            <li>Create a feature branch</li>
            <li>Make your changes</li>
            <li>Submit a pull request</li>
            <li>Join our Discord for development discussions</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Our Projects</h2>
          <GitHubRepos selectedRepos={selectedRepos} />
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Development Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">GitHub</h4>
              <p className="text-text-secondary text-sm">
                Find all our open-source projects and contribute to the community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Discord Development</h4>
              <p className="text-text-secondary text-sm">
                Join our development channel for discussions and collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let selectedRepos: string[] = [];

  try {
    const configPath = path.join(process.cwd(), 'content', 'config', 'general.yml');
    if (fs.existsSync(configPath)) {
      const configFile = fs.readFileSync(configPath, 'utf8');
      const config = yaml.load(configFile) as any;
      selectedRepos = config.selected_repos || [];
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }

  return {
    props: {
      selectedRepos,
    },
    revalidate: 60,
  };
};

export default DevelopmentPage;