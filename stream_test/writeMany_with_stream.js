/*3.5s with out stream, now with streaming it is taking 475ms */

import fs from 'node:fs/promises';
(async ()=>{
  console.time("testMany");
  console.log('Initial memory usage:', process.memoryUsage());

  const fileHandle = await fs.open("test.txt","w");
  const stream = fileHandle.createWriteStream();

  for(let i =0 ; i<1000000  ;i++){
    const buff = Buffer.from(`Ram is good boy`,'utf-8')
    stream.write(buff);
  }  
  
  console.log('Memory usage after writing to file:', process.memoryUsage());
  console.timeEnd("testMany");
  
})();