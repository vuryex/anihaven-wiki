import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getBestTimestamps, getFormattedTimestamps, debugFileTimestamps } from './git-dates';

const postsDirectory = path.join(process.cwd(), 'content/pages');

marked.setOptions({
  breaks: true,
  gfm: true,
});

export interface MarkdownContent {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  order?: number;
  featured?: boolean;
  content: string;
  rawContent: string;
  lastModified: string;
  createdAt: string;
  lastModifiedFormatted: string; // Human-readable date
  createdAtFormatted: string; // Human-readable date
  author?: string;
  dateSource?: 'git' | 'filesystem'; // Added to show where dates came from
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get all markdown files from the pages directory
export function getMarkdownFiles(): string[] {
  ensureDirectoryExists(postsDirectory);
  
  try {
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.md'));
  } catch (error) {
    console.warn('Error reading pages directory:', error);
    return [];
  }
}

// Get markdown content for a specific slug
export function getMarkdownContent(slug: string): MarkdownContent | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Markdown file not found: ${fullPath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Get the best available timestamps (ISO format)
    const timestamps = getBestTimestamps(fullPath);
    
    // Get formatted timestamps (human-readable)
    const formattedTimestamps = getFormattedTimestamps(fullPath);
    
    // Determine date source for debugging
    const { getFileTimestamps } = require('./git-dates');
    const stats = getFileTimestamps(fullPath);
    const dateSource = stats.gitDates ? 'git' : 'filesystem';

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: data.description || '',
      category: data.category || 'general',
      order: data.order || 0,
      featured: data.featured || false,
      content: marked(content),
      rawContent: content,
      lastModified: timestamps.lastModified, // ISO format for sorting/comparison
      createdAt: timestamps.createdAt, // ISO format for sorting/comparison
      lastModifiedFormatted: formattedTimestamps.lastModified, // Human-readable
      createdAtFormatted: formattedTimestamps.createdAt, // Human-readable
      author: data.author || 'Community Member',
      dateSource
    };
  } catch (error) {
    console.error(`Error processing markdown file ${slug}:`, error);
    return null;
  }
}

// Get all markdown content
export function getAllMarkdownContent(): MarkdownContent[] {
  const files = getMarkdownFiles();
  const allContent = files
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      return getMarkdownContent(slug);
    })
    .filter((content): content is MarkdownContent => content !== null)
    .sort((a, b) => {
      // Sort by order first, then by title
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      return a.title.localeCompare(b.title);
    });

  return allContent;
}

// Get content by category
export function getContentByCategory(category: string): MarkdownContent[] {
  return getAllMarkdownContent().filter(content => content.category === category);
}

// Get featured content
export function getFeaturedContent(): MarkdownContent[] {
  return getAllMarkdownContent().filter(content => content.featured);
}

// Search content
export function searchContent(query: string): MarkdownContent[] {
  const searchTerm = query.toLowerCase();
  return getAllMarkdownContent().filter(content => 
    content.title.toLowerCase().includes(searchTerm) ||
    content.description?.toLowerCase().includes(searchTerm) ||
    content.rawContent.toLowerCase().includes(searchTerm)
  );
}

// Debug function to check timestamps for a specific file
export function debugMarkdownTimestamps(slug: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  debugFileTimestamps(fullPath);
}

// Get recent content (sorted by last modified date)
export function getRecentContent(limit: number = 10): MarkdownContent[] {
  return getAllMarkdownContent()
    .sort((a, b) => {
      // Sort by last modified date (newest first)
      const dateA = new Date(a.lastModified).getTime();
      const dateB = new Date(b.lastModified).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}

// Get newest content (sorted by creation date)
export function getNewestContent(limit: number = 10): MarkdownContent[] {
  return getAllMarkdownContent()
    .sort((a, b) => {
      // Sort by creation date (newest first)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}

// Get content sorted by various criteria
export function getSortedContent(
  sortBy: 'title' | 'created' | 'modified' | 'order' = 'title',
  ascending: boolean = true,
  limit?: number
): MarkdownContent[] {
  const allContent = getAllMarkdownContent();
  
  const sorted = allContent.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'modified':
        comparison = new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
        break;
      case 'order':
        comparison = (a.order || 0) - (b.order || 0);
        break;
    }
    
    return ascending ? comparison : -comparison;
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
}

// Get markdown content with detailed timestamp info
export function getMarkdownContentWithDebug(slug: string): MarkdownContent | null {
  console.log(`\n=== GETTING MARKDOWN CONTENT: ${slug} ===`);
  
  const content = getMarkdownContent(slug);
  
  if (content) {
    console.log('Title:', content.title);
    console.log('Date source:', content.dateSource);
    console.log('Created:', content.createdAtFormatted);
    console.log('Modified:', content.lastModifiedFormatted);
    console.log('Created (ISO):', content.createdAt);
    console.log('Modified (ISO):', content.lastModified);
    console.log('==========================================\n');
  }
  
  return content;
}