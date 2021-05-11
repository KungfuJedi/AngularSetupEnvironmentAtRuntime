cd SetupEnvironmentAtRuntime
npm ci
npm run build --prod -aot

aws s3 sync ./dist/SetupEnvironmentAtRuntime s3://rhys-angular-deployment-prod --delete --acl public-read --exclude appSettings/* 
aws s3 cp ./src/appSettings/prod/appSettings.json s3://rhys-angular-deployment-prod/appSettings/appSettings.json --acl public-read

aws s3 sync ./dist/SetupEnvironmentAtRuntime s3://rhys-angular-deployment-uat --delete --acl public-read --exclude appSettings/*
aws s3 cp ./src/appSettings/uat/appSettings.json s3://rhys-angular-deployment-uat/appSettings/appSettings.json --acl public-read