import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

interface GitTimestamps {
  createdAt: string;
  lastModified: string;
}

interface FileStats {
  isGitRepo: boolean;
  hasGitHistory: boolean;
  gitDates?: GitTimestamps;
  fsDates: GitTimestamps;
}

// Check if we're in a git repository
function isGitRepository(): boolean {
  try {
    execSync('git rev-parse --git-dir', { 
      stdio: 'ignore',
      cwd: process.cwd()
    });
    return true;
  } catch {
    return false;
  }
}

// Get git timestamps with comprehensive error handling - only dates that specifically modified THIS file
function getGitTimestamps(filePath: string): GitTimestamps | null {
  try {
    // Convert to relative path from git root
    const relativePath = path.relative(process.cwd(), filePath);
    
    // First check if file exists in git history at all
    const checkCommand = `git log --oneline --follow -- "${relativePath}"`;
    const historyCheck = execSync(checkCommand, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();
    
    if (!historyCheck) {
      console.log(`No git history found for: ${relativePath}`);
      return null;
    }
    
    // Get commit dates ONLY for commits that actually modified this specific file
    // Using %ad (author date) and --date=iso-strict for consistent formatting
    const dateCommand = `git log --format=%ad --date=iso-strict --follow -- "${relativePath}"`;
    const output = execSync(dateCommand, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();
    
    const dates = output.split('\n')
      .map(date => date.trim())
      .filter(date => date.length > 0);
    
    if (dates.length === 0) {
      console.log(`No valid dates found for: ${relativePath}`);
      return null;
    }
    
    // Validate dates
    const lastModified = dates[0]; // Most recent commit that modified this file
    const created = dates[dates.length - 1]; // First commit that created this file
    
    const lastModifiedDate = new Date(lastModified);
    const createdDate = new Date(created);
    
    if (isNaN(lastModifiedDate.getTime()) || isNaN(createdDate.getTime())) {
      console.warn(`Invalid git dates for: ${relativePath}`);
      return null;
    }
    
    return {
      createdAt: created,
      lastModified: lastModified
    };
  } catch (error) {
    console.log(`Git date extraction failed for: ${filePath}`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Get file system timestamps
function getFileSystemTimestamps(filePath: string): GitTimestamps {
  try {
    const stats = fs.statSync(filePath);
    return {
      createdAt: stats.birthtime.toISOString(),
      lastModified: stats.mtime.toISOString()
    };
  } catch (error) {
    console.warn(`Failed to get file stats for ${filePath}:`, error);
    // Ultimate fallback
    const now = new Date().toISOString();
    return {
      createdAt: now,
      lastModified: now
    };
  }
}

// Main function to get file timestamps with fallback strategy
export function getFileTimestamps(filePath: string): FileStats {
  const fsDates = getFileSystemTimestamps(filePath);
  const isGitRepo = isGitRepository();
  
  if (!isGitRepo) {
    console.log(`Not a git repository, using file system dates for: ${filePath}`);
    return {
      isGitRepo: false,
      hasGitHistory: false,
      fsDates
    };
  }
  
  const gitDates = getGitTimestamps(filePath);
  
  if (gitDates) {
    return {
      isGitRepo: true,
      hasGitHistory: true,
      gitDates,
      fsDates
    };
  } else {
    console.log(`Using file system dates as fallback for: ${filePath}`);
    return {
      isGitRepo: true,
      hasGitHistory: false,
      fsDates
    };
  }
}

// Get the best available timestamps
export function getBestTimestamps(filePath: string): GitTimestamps {
  const stats = getFileTimestamps(filePath);
  
  // Prefer git dates if available
  if (stats.gitDates) {
    return stats.gitDates;
  }
  
  // Fall back to file system dates
  return stats.fsDates;
}

// Debug function to see what's happening
export function debugFileTimestamps(filePath: string): void {
  console.log('\n=== DEBUG FILE TIMESTAMPS ===');
  console.log('File:', filePath);
  console.log('Exists:', fs.existsSync(filePath));
  
  const stats = getFileTimestamps(filePath);
  console.log('Git repo:', stats.isGitRepo);
  console.log('Has git history:', stats.hasGitHistory);
  
  if (stats.gitDates) {
    console.log('Git dates:');
    console.log('  Created:', stats.gitDates.createdAt);
    console.log('  Modified:', stats.gitDates.lastModified);
  }
  
  console.log('File system dates:');
  console.log('  Created:', stats.fsDates.createdAt);
  console.log('  Modified:', stats.fsDates.lastModified);
  
  const best = getBestTimestamps(filePath);
  console.log('Best timestamps:');
  console.log('  Created:', best.createdAt);
  console.log('  Modified:', best.lastModified);
  console.log('=============================\n');
}

// Format date to readable format like "July 3rd, 2025"
export function formatDateToReadable(isoDate: string): string {
  const date = new Date(isoDate);
  
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

// Get formatted timestamps for display
export function getFormattedTimestamps(filePath: string): { createdAt: string; lastModified: string } {
  const timestamps = getBestTimestamps(filePath);
  
  return {
    createdAt: formatDateToReadable(timestamps.createdAt),
    lastModified: formatDateToReadable(timestamps.lastModified)
  };
}

// Legacy function for backward compatibility
export function getGitTimestampsAlternative(filePath: string): GitTimestamps | null {
  const stats = getFileTimestamps(filePath);
  return stats.gitDates || null;
}