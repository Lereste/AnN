import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'admin': 'https://admin-dienlanhhoaian.vercel.app/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
