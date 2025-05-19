import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'admin': 'http://localhost:2000/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
