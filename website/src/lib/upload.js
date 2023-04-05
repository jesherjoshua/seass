import formidable from "./formidable-serverless";
import { createReadStream } from "fs";
// import { IncomingMessage } from "http";
// import { NextApiRequest, NextApiResponse } from "next";
import parseForm from "./parseForm";
import * as gcs from "./gcs";
// import { Response } from "express";

// export const method1 = async (
//     req,
//     res
// ) => {
//     const form = formidable();

//     const { files } = await parseForm(form, req);

//     const file = files.file;
//     console.log('upload file , file is: ',file);

//     createReadStream(file.path)
//         .pipe(gcs.createWriteStream(file.name, file.type))
//         .on("finish", () => {
//             res.status(200).json("File upload complete");
//         })
//         .on("error", (err) => {
//             console.error(err.message);
//             res.status(500).json("File upload error: " + err.message);
//         });
// };


export const method1 = async (
    req,
    res
  ) => {
    try {
      console.log('req body is:',req.body);
      const form = formidable();
      const { files } = await parseForm(form, req);
      const file = files.file;
      console.log('upload file, file is: ', file);
  
      createReadStream(file.path)
        .pipe(gcs.createWriteStream(file.name, file.type))
        .on("finish", () => {
          res.status(200).json("File upload complete");
        })
        .on("error", (err) => {
          console.error(err.message);
          res.status(500).json("File upload error: " + err.message);
        });
    } catch (err) {
      console.log('In catch block');
      console.error(err.message);
      res.status(500).json("Form parsing error: " + err.message);
    }
  };
  
  
  
  
  