import {Storage} from '@google-cloud/storage';

const bucketName = 'seass';
const projectID = 'augmented-axe-380213';
const keyFile = '../secretKey.json';

const storage = new Storage({
    projectID,
    keyFile,
});

export async function uploadFile(file, newFileName, options) {
    const bucket = storage.bucket(bucketName);
    console.log(newFileName);
    console.log('bucket is :',bucket);
  // const fileRef = bucket.file(newFileName);

  // console.log('create the write stream');
  // const writeStream = fileRef.createWriteStream(options);

  // console.log('create the read stream');
  // file.createReadStream()
  //   .on('error', err => {
  //     console.log(err);
  //   })
  //   .pipe(writeStream);

  // console.log('read stream completed');

  // return resolve(`gs://${bucketName}/${newFileName}`);
}
  
  
  
  