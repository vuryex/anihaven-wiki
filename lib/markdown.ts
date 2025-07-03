import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/pages');

// Configure marked for better link handling
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
  author?: string;
  createdAt?: string;
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

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Get file timestamps
  const stats = fs.statSync(fullPath);
  const lastModified = stats.mtime.toISOString();
  const createdAt = stats.birthtime.toISOString();

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