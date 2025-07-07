// Hardcoded 

import React from 'react';
import Head from 'next/head';
import MinecraftStatus from '@/components/MinecraftStatus';

const SMPPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our SMP - AniHaven Wiki</title>
        <meta name="description" content="Join the AniHaven Minecraft SMP server" />
      </Head>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">AniHaven SMP</h1>
          <p className="text-text-secondary">
            Welcome to our Minecraft Survival Multiplayer server! Join our community and build amazing things together.
          </p>
        </div>

        <MinecraftStatus />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Server Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-text-secondary">
                  <span className="font-medium">Server IP:</span> smp.anihaven.site
                </p>
              </div>
              <div>
                <p className="text-text-secondary">
                  <span className="font-medium">Version:</span> 1.21.5
                </p>
              </div>
              <div>
                <p className="text-text-secondary">
                  <span className="font-medium">Game Mode:</span> Survival
                </p>
              </div>
              <div>
                <p className="text-text-secondary">
                  <span className="font-medium">Difficulty:</span> Normal
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Server Features</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Complex World Generation</li>
              <li>Realistic Survival Experience</li>
              <li>Premium Bosses, New Biomes, Quests, Mob AI, etc...</li>
              <li>Handpicked and cohesive plugins and datapacks</li>
              <li>Active staff support for Discord & MC</li>
            </ul>
          </div>
        </div>

        <div className="bg-medium-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">How to Join</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h4 className="font-semibold text-text-primary">Join our Discord</h4>
                <p className="text-text-secondary">Connect and interact with the community, link your account, participate in events, and more.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h4 className="font-semibold text-text-primary">Start Playing</h4>
                <p className="text-text-secondary">Download Our Modpack (Optional) on Modrinth, enter our Server Address: smp.anihaven.site, and join!</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-accent-red text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h4 className="font-semibold text-text-primary">Link Account (Optional)</h4>
                <p className="text-text-secondary">Link your Minecraft Account with Discord to be able to sync Ranks/Roles and participate in Minecraft Related Events</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Server Rules</h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>Be respectful to all players</li>
            <li>Keep the chat clean</li>
            <li>No cheating or using client mods that give advantages</li>
            <li>All Discord server rules apply</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SMPPage;