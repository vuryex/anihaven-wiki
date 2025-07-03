import { execSync } from 'child_process';
import path from 'path';

export function getGitTimestamps(filePath: string): { createdAt: string; lastModified: string } | null {
  try {
    // Convert to relative path from git root
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Get the last commit date for the file (when it was last modified)
    const lastModifiedCommand = `git log -1 --format=%aI --follow -- "${relativePath}"`;
    const lastModified = execSync(lastModifiedCommand, { 
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).toString().trim();

    // Get the first commit date for the file (when it was created)
    const createdCommand = `git log --format=%aI --follow --reverse -- "${relativePath}" | head -1`;
    const created = execSync(createdCommand, { 
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).toString().trim();

    // Validate the dates
    if (!lastModified || !created) {
      console.warn(`Git timestamps not found for: ${filePath}`);
      return null;
    }

    // Verify dates are valid ISO strings
    const lastModifiedDate = new Date(lastModified);
    const createdDate = new Date(created);
    
    if (isNaN(lastModifiedDate.getTime()) || isNaN(createdDate.getTime())) {
      console.warn(`Invalid git dates for: ${filePath}`);
      return null;
    }

    return {
      createdAt: created,
      lastModified: lastModified,
    };
  } catch (error) {
    console.warn(`Git date extraction failed for: ${filePath}`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Alternative method using git log with better error handling
export function getGitTimestampsAlternative(filePath: string): { createdAt: string; lastModified: string } | null {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Get all commit dates for the file in one command
    const gitCommand = `git log --format=%aI --follow -- "${relativePath}"`;
    const output = execSync(gitCommand, { 
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();

    const dates = output.split('\n').filter(date => date.trim());
    
    if (dates.length === 0) {
      console.warn(`No git history found for: ${filePath}`);
      return null;
    }

    // First date in the array is the most recent (last modified)
    // Last date in the array is the oldest (created)
    const lastModified = dates[0];
    const created = dates[dates.length - 1];

    // Validate dates
    const lastModifiedDate = new Date(lastModified);
    const createdDate = new Date(created);
    
    if (isNaN(lastModifiedDate.getTime()) || isNaN(createdDate.getTime())) {
      console.warn(`Invalid git dates for: ${filePath}`);
      return null;
    }

    return {
      createdAt: created,
      lastModified: lastModified,
    };
  } catch (error) {
    console.warn(`Git date extraction failed for: ${filePath}`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}