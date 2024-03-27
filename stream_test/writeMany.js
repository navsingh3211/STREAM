// import fs from 'node:fs/promises';

/* taking 17 sec approx */
// (async ()=>{
//   console.time("testMany");
//   const fileHandle = await fs.open("test.txt","w");
//   for(let i =0 ; i<500000;i++){
//     await fileHandle.write(`ram`);
//   }
//   console.timeEnd("testMany");
// })();


/*3.5 sec approx after using buffer , it will take little more time*/
import fs from 'node:fs';
(async ()=>{
  console.time("testMany");
  fs.open("test.txt","w",(err,fd)=>{
    for(let i =0 ; i<500000  ;i++){
      const buff = Buffer.from(` ${i} `,'utf-8')
      fs.writeSync(fd,buff);
    }
    console.timeEnd("testMany");
  })
})();
