import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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
  lastModified: string; // From frontmatter
  createdAt: string; // From frontmatter
  author?: string;
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Format date to readable format like "July 3rd, 2025"
function formatDateToReadable(dateString: string): string {
  // Handle various date formats
  let date: Date;
  
  // Try parsing as-is first
  date = new Date(dateString);
  
  // If invalid, try common formats
  if (isNaN(date.getTime())) {
    // Try MM/DD/YYYY format
    const parts = dateString.split('/');
    if (parts.length === 3) {
      date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
    }
  }
  
  // If still invalid, try YYYY-MM-DD format
  if (isNaN(date.getTime())) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
  }
  
  // If still invalid, return the original string
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
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

    // Get dates from frontmatter, with fallbacks
    const lastModified = data.lastModified || data.updated || data.date || 'No date provided';
    const createdAt = data.createdAt || data.created || data.date || 'No date provided';

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: data.description || '',
      category: data.category || 'general',
      order: data.order || 0,
      featured: data.featured || false,
      content: marked(content),
      rawContent: content,
      lastModified: lastModified,
      createdAt: createdAt,
      author: data.author || 'Community Member',
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

// Get recent content (sorted by last modified date)
export function getRecentContent(limit: number = 10): MarkdownContent[] {
  return getAllMarkdownContent()
    .filter(content => content.lastModified !== 'No date provided')
    .sort((a, b) => {
      // Try to parse dates for sorting
      const dateA = new Date(a.lastModified);
      const dateB = new Date(b.lastModified);
      
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateB.getTime() - dateA.getTime();
      }
      
      // If dates can't be parsed, sort by title
      return a.title.localeCompare(b.title);
    })
    .slice(0, limit);
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
        const createdA = new Date(a.createdAt);
        const createdB = new Date(b.createdAt);
        comparison = createdA.getTime() - createdB.getTime();
        break;
      case 'modified':
        const modifiedA = new Date(a.lastModified);
        const modifiedB = new Date(b.lastModified);
        comparison = modifiedA.getTime() - modifiedB.getTime();
        break;
      case 'order':
        comparison = (a.order || 0) - (b.order || 0);
        break;
    }
    
    return ascending ? comparison : -comparison;
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
}