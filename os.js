console.log('all about Operating system');

const  os = require('os');
// __________=======____________========________
console.log("Platform: " + os.platform());//Platform: win32
console.log("Architecture: " + os.arch());//Architecture: x64
// console.log('constants :',os.constants);
// console.log("Architecture: " + os.cpus);//Returns an array containing information about the computer's CPUs
console.log("os of the line",os.EOL);
console.log('freeMemory',os.freemem()/(1024*1024));
console.log('hostName',os.hostname());//destop_name
console.log(os.loadavg());
console.log(os.platform());
console.log(os.release());
console.log(os.type());
console.log(os.userInfo());
console.log(os.uptime());