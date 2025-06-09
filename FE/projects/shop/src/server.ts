import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Host');

(async () => {
  await initNodeFederation({
    remotesOrManifestUrl: {
      'admin': 'https://admin-dienlanhhoaian.vercel.app/remoteEntry.json'
    },
    relBundlePath: 'dist/shop/browser/'
  });

  await import('./bootstrap-server');
})();
