const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getGitTimestamps(filePath) {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Get all commit dates for the file
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

    // First date is most recent, last date is oldest
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
    console.warn(`Git date extraction failed for: ${filePath}`, error.message);
    return null;
  }
}

function generateDates() {
  const contentDir = path.join(process.cwd(), 'content/pages');
  const outputFile = path.join(process.cwd(), 'lib/file-dates.json');
  
  const dates = {};
  
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory not found, creating empty dates file');
    fs.writeFileSync(outputFile, JSON.stringify(dates, null, 2));
    return;
  }

  // Get all markdown files
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  console.log(`Processing ${files.length} markdown files...`);
  
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const fullPath = path.join(contentDir, file);
    
    console.log(`Processing: ${slug}`);
    
    // Try to get git timestamps
    const gitDates = getGitTimestamps(fullPath);
    
    if (gitDates) {
      dates[slug] = gitDates;
      console.log(`✓ Git dates found for ${slug}: modified ${gitDates.lastModified}`);
    } else {
      // Fallback to file system dates
      try {
        const stats = fs.statSync(fullPath);
        dates[slug] = {
          lastModified: stats.mtime.toISOString(),
          createdAt: stats.birthtime.toISOString()
        };
        console.log(`⚠ Using filesystem dates for ${slug}: modified ${dates[slug].lastModified}`);
      } catch (error) {
        console.error(`Failed to get dates for ${slug}:`, error.message);
        const now = new Date().toISOString();
        dates[slug] = {
          lastModified: now,
          createdAt: now
        };
      }
    }
  }
  
  // Write the dates file
  try {
    fs.writeFileSync(outputFile, JSON.stringify(dates, null, 2));
    console.log(`\n✓ Dates generated and saved to ${outputFile}`);
    console.log(`Processed ${Object.keys(dates).length} files`);
  } catch (error) {
    console.error('Failed to write dates file:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateDates();
}

module.exports = { generateDates, getGitTimestamps };