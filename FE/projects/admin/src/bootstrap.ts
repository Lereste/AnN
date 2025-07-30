import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgZone } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// For micro-frontend setup using Angular Elements
(async () => {
  const app = await createApplication({
    ...appConfig,
    providers: [
      ...appConfig.providers,
      (globalThis as Record<string, unknown>)['ngZone'] ? { provide: NgZone, useValue: (globalThis as Record<string, unknown>)['ngZone'] } : [],
    ],
  });

  const AdminRoot = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('admin-root', AdminRoot);
})();
