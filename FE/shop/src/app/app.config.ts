import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(), // add new
    // provideZoneChangeDetection()
    // provideClientHydration(),
    provideClientHydration()
  ]
};
