import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppSettingsService } from './app-settings.service';

const appSettingsInitializer = (appSettingsService: AppSettingsService) => {
  return () => {
    return appSettingsService.setAppSettings();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingsInitializer,
      multi: true,
      deps: [AppSettingsService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
