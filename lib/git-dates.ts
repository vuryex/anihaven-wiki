import { execSync } from 'child_process';

export function getGitTimestamps(filePath: string): { createdAt: string; lastModified: string } | null {
  try {
    const creation = execSync(`git log --diff-filter=A --follow --format=%aI -1 "${filePath}"`).toString().trim();
    const modified = execSync(`git log -1 --format=%aI "${filePath}"`).toString().trim();

    if (creation && modified) {
      return {
        createdAt: creation,
        lastModified: modified,
      };
    }
  } catch (error) {
    console.warn(`Git date fallback failed for: ${filePath}`, error);
  }
  return null;
}
