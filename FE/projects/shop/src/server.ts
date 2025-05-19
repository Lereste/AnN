import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Host');

(async () => {
  await initNodeFederation({
    remotesOrManifestUrl: {
      'admin': 'http://localhost:2000/remoteEntry.json'
    },
    relBundlePath: 'dist/shop/browser/'
  });

  await import('./bootstrap-server');
})();
