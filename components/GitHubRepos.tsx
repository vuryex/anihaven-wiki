import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubReposProps {
  selectedRepos: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const GitHubRepos: React.FC<GitHubReposProps> = ({ selectedRepos }) => {
  const { data: repos, error } = useSWR<Repo[]>('/api/github-repos', fetcher);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (repos && selectedRepos.length > 0) {
      const filtered = repos.filter(repo => 
        selectedRepos.includes(repo.name)
      );
      setFilteredRepos(filtered);
    }
  }, [repos, selectedRepos]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">Failed to load repositories</p>
      </div>
    );
  }

  if (!repos) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">Loading repositories...</p>
      </div>
    );
  }

  if (filteredRepos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No repositories selected</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRepos.map((repo) => (
        <div key={repo.id} className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-accent-red transition-colors">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">{repo.name}</h3>
            {repo.language && (
              <span className="text-xs px-2 py-1 bg-accent-red text-white rounded">
                {repo.language}
              </span>
            )}
          </div>
          
          <p className="text-text-secondary mb-4 text-sm">
            {repo.description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between text-sm text-text-muted mb-4">
            <div className="flex items-center space-x-4">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
            <span>
              Updated {new Date(repo.updated_at).toLocaleDateString()}
            </span>
          </div>
          
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red-hover transition-colors"
          >
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default GitHubRepos;