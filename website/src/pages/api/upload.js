// import { method1 } from "../../lib/upload";

// export default async function handler(
//     req,
//     res
// ) {
//     if (req.method !== "POST") {
//         res.status(400).send(`Invalid method: ${req.method}`);
//         return;
//     }

//     console.log('api upload request header is: ',req.headers);

//     method1(req, res);
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };


import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });

    try {
      const { fields, files } = await form.parse(req);

      console.log('fields:', fields);
      console.log('files:', files);

      // Do something with the fields and files

      res.status(200).send('File uploaded successfully');
    } catch (err) {
      console.error('Error parsing form data', err);
      res.status(500).send('Error parsing form data');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};
