import { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import crypto from 'crypto';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  const expectedSignature = `sha256=${computedSignature}`;
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

function regenerateDates(): boolean {
  try {
    console.log('Regenerating dates...');
    execSync('node scripts/generate-dates.js', { 
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    console.log('✓ Dates regenerated successfully');
    return true;
  } catch (error) {
    console.error('Failed to regenerate dates:', error);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { WEBHOOK_SECRET } = process.env;
  const signature = req.headers['x-hub-signature-256'] as string;
  const event = req.headers['x-github-event'] as string;
  
  // Verify webhook signature if secret is configured
  if (WEBHOOK_SECRET) {
    const payload = JSON.stringify(req.body);
    
    if (!verifySignature(payload, signature, WEBHOOK_SECRET)) {
      console.warn('Invalid webhook signature');
      return res.status(401).json({ message: 'Invalid signature' });
    }
  }

  // Only process push events to main branch
  if (event === 'push' && req.body.ref === 'refs/heads/main') {
    console.log('Push to main branch detected, checking for markdown changes...');
    
    const commits = req.body.commits || [];
    let markdownChanged = false;
    
    // Check if any markdown files were modified
    for (const commit of commits) {
      const allFiles = [
        ...(commit.added || []),
        ...(commit.modified || []),
        ...(commit.removed || [])
      ];
      
      const markdownFiles = allFiles.filter((file: string) => 
        file.startsWith('content/pages/') && file.endsWith('.md')
      );
      
      if (markdownFiles.length > 0) {
        console.log(`Markdown files changed: ${markdownFiles.join(', ')}`);
        markdownChanged = true;
        break;
      }
    }
    
    if (markdownChanged) {
      const success = regenerateDates();
      
      if (success) {
        return res.status(200).json({ 
          message: 'Dates regenerated successfully',
          regenerated: true
        });
      } else {
        return res.status(500).json({ 
          message: 'Failed to regenerate dates',
          regenerated: false
        });
      }
    } else {
      return res.status(200).json({ 
        message: 'No markdown changes detected',
        regenerated: false
      });
    }
  }

  // Handle pull request events (when PRs are merged)
  if (event === 'pull_request' && req.body.action === 'closed' && req.body.pull_request.merged) {
    console.log('Pull request merged, checking for markdown changes...');
    
    // For merged PRs, we should regenerate dates as the git history has changed
    const success = regenerateDates();
    
    return res.status(200).json({ 
      message: success ? 'Dates regenerated after PR merge' : 'Failed to regenerate dates after PR merge',
      regenerated: success
    });
  }

  return res.status(200).json({ 
    message: 'Webhook received but no action taken',
    event,
    action: req.body.action
  });
}