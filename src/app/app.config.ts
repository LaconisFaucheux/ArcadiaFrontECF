import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import '@angular/common/locales/global/fr';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "../shared/interceptors/auth.interceptor";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    },
    provideHttpClient(
      withInterceptors([AuthInterceptor]),
    ),
    provideToastr(), provideAnimations()
  ]
};
