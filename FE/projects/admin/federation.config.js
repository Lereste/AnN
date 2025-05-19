const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'admin',

  exposes: {
    './Component': './projects/admin/src/app/app.component.ts',
    "./routes": "./projects/admin/src/app/app.routes.ts",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'swiper/react',
    'swiper/vue'
    // Add further packages you don't need at runtime
  ],

  // output: {
  //   filename: 'remoteEntry.js',
  // }

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

});
