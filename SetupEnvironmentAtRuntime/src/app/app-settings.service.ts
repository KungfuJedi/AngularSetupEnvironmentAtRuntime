import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private appSettings: AppSettings = defaultAppSettings;

  constructor(private http: HttpClient) {}

  setAppSettings(): Promise<AppSettings> {
    return this.http
      .get<AppSettings>('./appSettings/appSettings.json')
      .toPromise()
      .then(config => this.appSettings = config);
  }

  readAppSettings(): AppSettings {
    return this.appSettings;
  }
}

export interface AppSettings {
  environment: Environment;
}

export enum Environment {
  Development = 'Development',
  Production = 'Production',
  Uat = 'UAT'
}

const defaultAppSettings: AppSettings = {
  environment: Environment.Development
};
