import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Host');

(async () => {
  await initNodeFederation({
    remotesOrManifestUrl: {
      'admin': 'https://dienlanhhoaian-admin.vercel.app/remoteEntry.json'
    },
    relBundlePath: 'dist/shop/browser/'
  });

  await import('./bootstrap-server');
})();
