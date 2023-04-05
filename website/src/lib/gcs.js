import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "secretKey.json",
});

const bucket = storage.bucket('seass');

export const createWriteStream = (filename, contentType) => {
    const ref = bucket.file(filename);

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType,
    });

    return stream;
};