
import {uploadFile} from '../../lib/CloudFile';

export default async function handler(req,res){

    console.log(req);
    console.log('request body is : ',req.body);
    const {file,newFileName,options} = req.body;
    console.log('sending data to upload file function');
    const result = await uploadFile(file,newFileName,options);

    res.status(200).json({result});
}