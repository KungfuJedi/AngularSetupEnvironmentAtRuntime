import { Component } from '@angular/core';
import { AppSettingsService } from './app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SetupEnvironmentAtRuntime';

  readonly appSettings = this.appSettingsService.readAppSettings(); 

  constructor(private appSettingsService: AppSettingsService) {}
}
