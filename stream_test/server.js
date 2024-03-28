import { log } from 'console';
import express from 'express';
import status from 'express-status-monitor';
import fs from 'fs';
import zlib from 'zlib';

const app = express();
app.use(status())

/*Taking raw file directly */
// app.get('/',(req,res)=>{
//   fs.readFile('./test.txt',(err,data)=>{
//     res.end(data);
//   })
// })


fs.createReadStream("./test.txt")
.pipe(zlib.createGzip().pipe(fs.createWriteStream('./text.zip')))

/*reading file in chunk*/
app.get('/',(req,res)=>{
  const stream = fs.createReadStream("./test.txt","utf-8");
  stream.on("data",(chunk)=>res.write(chunk));
  stream.on("end",()=>res.end());
})

app.listen(8085,()=>{
  console.log('our server is listening on port 8085');
})
