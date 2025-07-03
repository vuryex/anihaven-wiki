import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

interface PageProps {
  content: {
    title: string;
    description: string;
    content: string;
    lastModified: string;
    lastModifiedFormatted: string;
    createdAt: string;
    createdAtFormatted: string;
    author?: string;
    dateSource?: 'git' | 'filesystem';
  } | null;
}

const tools: React.FC<PageProps> = ({ content }) => {
  if (!content) {
    return (
      <>
        <Head>
          <title>Tools - AniHaven Wiki</title>
          <meta name="description" content="Community tools and resources" />
        </Head>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Tools</h1>
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
        
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              {content.author && (
                <span>Last edited by {content.author}</span>
              )}
              
            </div>
            <div>
              Last updated: {content.lastModifiedFormatted}
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
    content = getMarkdownContent('tools');
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

export default tools;