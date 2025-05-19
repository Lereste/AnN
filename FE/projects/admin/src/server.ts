import { initNodeFederation } from '@softarc/native-federation-node';

(async () => {

  await initNodeFederation({
    relBundlePath: 'dist/admin/browser/'
  });

  await import('./bootstrap-server');

})();
