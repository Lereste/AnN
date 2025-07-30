import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { NgZone } from '@angular/core';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


  (async () => {
    const app = await bootstrapApplication(AppComponent, {
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
