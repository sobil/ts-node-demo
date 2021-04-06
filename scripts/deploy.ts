#!/usr/bin/env ts-node
import * as FS from 'fs'
import * as AWS from 'aws-sdk'
import { BucketName, PutObjectRequest } from 'aws-sdk/clients/s3';

const BUCKET_NAME: BucketName = 'myapp-20210406';
const DIST_DIR = 'public'
const S3 = new AWS.S3({});


(async () => {
    try {
        const params: AWS.S3.CreateBucketRequest = {
            Bucket: BUCKET_NAME,
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-southeast-2'
            }
        };
        await S3.createBucket(params).promise()
    }
    catch (e) {
        if (e.code != 'BucketAlreadyOwnedByYou') {
            console.error(e)
        }
    }
    const files = await FS.promises.readdir(`${FS.realpathSync('./')}/${DIST_DIR}`);
    await files.forEach(async (file) => {
        console.log(`Uploading: ${file}`)
        try {
            const params: PutObjectRequest = {
                Bucket: BUCKET_NAME,
                Key: file,
                Body: FS.readFileSync(`${FS.realpathSync('./')}/${DIST_DIR}/${file}`)
            };
            await S3.upload(params).promise()
        }
        catch (e) {
            console.error(e)
        }
    })
})()

