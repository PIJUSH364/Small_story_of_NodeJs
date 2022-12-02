const fs = require('fs');
// new file create
fs.writeFileSync('myFile.txt', 'new file create from nodejs');
fs.writeFileSync('myFile.txt', 'override file content');
// we don't overide content ,we are interested to add content on file
fs.appendFileSync('myFile.txt', 'now appent content on this file');

// ? node have different data type Buffer
// readFileSync :: blocking main thred
// readFile :: async functionality use
const blockingData = fs.readFileSync('myFile.txt'); // return buffer array
console.log(blockingData);

//* call back function return eithr error or data
fs.readFile('myfile.txt', (error, data) => {
    console.log(error);
    console.log(data.toString());
});

// The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing",
// the specified file is opened for writing. If the file does not exist, an empty file is created:

fs.open('mynewfile2.txt', 'w', (err, file) => {
    if (err) throw err;

    console.log('Saved!');
});

// The fs.rename() method renames the specified file:

setTimeout(() => {
    fs.rename('mynewfile2.txt', 'renamemynewfile2.txt', (err) => {
        if (err) throw err;
        console.log('File Renamed!');
    });
}, 2000);

// The fs.unlink() method deletes the specified file:
// afeter 5sec renamemynewfile2.txt file deleted
setTimeout(() => {
    fs.unlink('renamemynewfile2.txt', (err) => {
        if (err) throw err;
        console.log('File deleted!');
    });
}, 5000);
