import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prodBucket = new s3.Bucket(this, 'prodBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      bucketName: 'rhys-angular-deployment-prod',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      accessControl: s3.BucketAccessControl.PUBLIC_READ
    });

    const uatBucket = new s3.Bucket(this, 'uatBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      bucketName: 'rhys-angular-deployment-uat',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      accessControl: s3.BucketAccessControl.PUBLIC_READ
    });

    const deploymentUser = new iam.User(this, 'deploymentUser', {
      userName: 'angular-runtime-config-deployment-user'
    });

    new iam.Policy(this, 'deploymentPolicy', {
      policyName: 'angular-runtime-config-deployment-policy',
      statements: [
        new iam.PolicyStatement({
          actions: [
            's3:GetObject',
            's3:PutObject',
            's3:DeleteObject',
            's3:PutObjectAcl',
            's3:ListObject'
          ],
          resources: [
            prodBucket.arnForObjects('*'),
            uatBucket.arnForObjects('*'),
            prodBucket.bucketArn,
            uatBucket.bucketArn
          ]
        })
      ],
      users: [deploymentUser]
    });
  }
}
