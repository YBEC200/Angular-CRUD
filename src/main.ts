import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeInterceptor } from './app/interceptors/fake.interceptor';
import { InMemoryModule } from './app/in-memory.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([fakeInterceptor])),
    importProvidersFrom(InMemoryModule) // 👉 aquí metemos el backend en memoria
  ]
});