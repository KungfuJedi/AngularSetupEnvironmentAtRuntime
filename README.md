# AngularSetupEnvironmentAtRuntime
This repo is exploring how to load application configuration in Angular at runtime. The main reason I want to test this out instead of just using `environment.{{stage}}.ts` files is for the purpose of being able to have a build process that can build one bundle and have it be ready for deploying to multiple stages.

The approach taken is to use an `APP_INITIALIZER`function to have the app load the configuration from a file stored in the projects assets during the bootstrapping of the app.

Asset replacements in the `angular.json` are used to handle dynamically changing the settings file loaded while running the app locally with `ng serve`, while for deploying we just upload the desired configuration file with our bundle to the destination S3 bucket

## Using this repo
- Run one of the following commands
	- `npm start`
	- `npm run ng serve -- -c production`
	- `npm run ng serve -- -c uat`
- The page should show the environment file defined per environment on the page, and if you check the network tab of your browser, you will see that it is always just loading the file from `/appSettings/appSettings.json`