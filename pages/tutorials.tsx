// Use this template for: tutorials.tsx, support.tsx, faq.tsx, staff.tsx, socials.tsx

import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

interface PageProps {
  content: {
    title: string;
    description: string;
    content: string;
    lastModified: string;
    author?: string;
  } | null;
}

const tutorials: React.FC<PageProps> = ({ content }) => {
  if (!content) {
    return (
      <>
        <Head>
          <title>PAGE_TITLE - AniHaven Wiki</title>
          <meta name="description" content="PAGE_DESCRIPTION" />
        </Head>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-text-primary mb-4">PAGE_TITLE</h1>
          <p className="text-text-secondary">This page hasn't been created yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{content.title} - AniHaven Wiki</title>
        <meta name="description" content={content.description} />
      </Head>
      
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>
        
        <div className="border-t border-light-gray pt-4">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <div>
              {content.author && (
                <span>Last edited by {content.author}</span>
              )}
            </div>
            <div>
              Last updated: {new Date(content.lastModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let content = null;

  try {
    const { getMarkdownContent } = await import('../lib/markdown');
    content = getMarkdownContent('tutorials'); // Change this to match the file
  } catch (error) {
    // Silently fail - no markdown content exists
  }
  
  return {
    props: {
      content,
    },
    revalidate: 60,
  };
};

export default tutorials;