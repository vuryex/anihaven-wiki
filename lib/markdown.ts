import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getGitTimestampsAlternative } from './git-dates';

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
  author?: string;
}

// Cache for file dates to avoid repeated git calls
let cachedDates: Record<string, { lastModified: string; createdAt: string }> = {};

// Load cached dates on startup
try {
  const datesFile = path.join(process.cwd(), 'lib/file-dates.json');
  if (fs.existsSync(datesFile)) {
    cachedDates = JSON.parse(fs.readFileSync(datesFile, 'utf8'));
  }
} catch (error) {
  console.warn('Could not load cached dates:', error);
}

function getFileTimestamps(slug: string, fullPath: string): { lastModified: string; createdAt: string } {
  // Check cache first
  if (cachedDates[slug]) {
    return cachedDates[slug];
  }

  // Try to get Git timestamps
  const gitDates = getGitTimestampsAlternative(fullPath);
  if (gitDates) {
    // Cache the result
    cachedDates[slug] = {
      lastModified: gitDates.lastModified,
      createdAt: gitDates.createdAt
    };
    return cachedDates[slug];
  }

  // Fallback to file system stats
  try {
    const stats = fs.statSync(fullPath);
    const fallbackDates = {
      lastModified: stats.mtime.toISOString(),
      createdAt: stats.birthtime.toISOString()
    };
    
    // Cache the fallback dates too
    cachedDates[slug] = fallbackDates;
    return fallbackDates;
  } catch (error) {
    console.warn(`Failed to get file stats for ${fullPath}:`, error);
    
    // Ultimate fallback - current time
    const now = new Date().toISOString();
    return {
      lastModified: now,
      createdAt: now
    };
  }
}

export function getMarkdownFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getMarkdownContent(slug: string): MarkdownContent | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Get timestamps
    const { lastModified, createdAt } = getFileTimestamps(slug, fullPath);

    return {
      slug,
      title: data.title || slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: data.description || '',
      category: data.category || 'general',
      order: data.order || 0,
      featured: data.featured || false,
      content: marked(content),
      rawContent: content,
      lastModified,
      createdAt,
      author: data.author || 'Community Member',
    };
  } catch (error) {
    console.error(`Error processing markdown file ${slug}:`, error);
    return null;
  }
}

export function getAllMarkdownContent(): MarkdownContent[] {
  const files = getMarkdownFiles();
  const allContent = files
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      return getMarkdownContent(slug);
    })
    .filter((content): content is MarkdownContent => content !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return allContent;
}

export function getMarkdownContentByCategory(category: string): MarkdownContent[] {
  const allContent = getAllMarkdownContent();
  return allContent.filter(content => content.category === category);
}

export function getFeaturedContent(): MarkdownContent[] {
  const allContent = getAllMarkdownContent();
  return allContent.filter(content => content.featured);
}

export function getRecentContent(limit: number = 5): MarkdownContent[] {
  const allContent = getAllMarkdownContent();
  return allContent
    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    .slice(0, limit);
}

// Function to save cached dates (call this periodically or on build)
export function saveCachedDates(): void {
  try {
    const datesFile = path.join(process.cwd(), 'lib/file-dates.json');
    fs.writeFileSync(datesFile, JSON.stringify(cachedDates, null, 2));
  } catch (error) {
    console.warn('Could not save cached dates:', error);
  }
}

// Function to refresh a specific file's cache
export function refreshFileCache(slug: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(fullPath)) {
    delete cachedDates[slug];
    getFileTimestamps(slug, fullPath);
  }
}