#!/usr/bin/env ts-node
import * as FS from 'fs'
import * as AWS from 'aws-sdk'
import { BucketName, PutObjectRequest } from 'aws-sdk/clients/s3';

const BUCKET_NAME: BucketName = 'myapp-20210406';
const DIST_DIR = 'public'
const S3 = new AWS.S3({});

(async () => {
  try {
    const createParams: AWS.S3.CreateBucketRequest = {
      Bucket: BUCKET_NAME,
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-southeast-2'
      }
    };
    await S3.createBucket(createParams).promise()
  }
  catch (e) {
    if (e.code == 'BucketAlreadyOwnedByYou') {
      console.warn(`Did not create bucket:${e.code}`)
    }
    else {
      throw e
    }
  }
  const files = await FS.promises.readdir(`${FS.realpathSync('./')}/${DIST_DIR}`);
  await files.forEach(async (file) => {
    console.log(`Uploading: ${file}`)
    try {
      const uploadParams: PutObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: file,
        Body: FS.readFileSync(`${FS.realpathSync('./')}/${DIST_DIR}/${file}`)
      };
      await S3.upload(uploadParams).promise()
    }
    catch (e) {
      console.error(`Failed to upload ${file}: ${e.code}`)
    }
  })
})()

