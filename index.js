console.log('small story of nodeJs');

// ? path module
const path = require('path');
// console.log(path);//*path property and module return

// * Extract the filename from a file path:
const myFilepath="C:/Users/Nasir computer/Desktop/Backend/NodeJs/index.js"
const fileBaseName=path.basename(myFilepath)
const directoriesName=path.dirname(myFilepath)
const extentionName=path.extname(fileBaseName)
const pathObj={
    dir: directoriesName,
    base:fileBaseName
}
const formatPath=path.format(pathObj)
const parseAsaobject=path.parse(formatPath)

// __________=======____________========________
console.log(fileBaseName);//index.js
console.log(directoriesName);//C:/Users/Nasir computer/Desktop/Backend/NodeJs
console.log(path.delimiter);//;
console.log(extentionName);//.js
console.log(formatPath);
console.log(parseAsaobject);
console.log(parseAsaobject.dir);

