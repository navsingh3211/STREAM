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