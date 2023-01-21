const express = require('express');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

// file upload folder
const UPLOADS_FOLDER = '../uploadsFiles';

/*
// file object
{
  fieldname: 'inputName(name,password,email)',
  originalname: 'fileName.pdf',
  encoding: '7bit',
  mimetype: 'application(image,application)/typeOfExtenction(pdr,jpg,png)'
}
*/
// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExtentionName = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExtentionName, "").toLowerCase().split(" ").join("_") + "-" + Date.now();
        cb(null, fileName + fileExtentionName);
    }
})

// prepare the final multer upload object
var upload = multer({
    // dest: UPLOADS_FOLDER,
    storage: storage,
    limits: {
        fileSize: 1000000,//1mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error("Only .jpg .png .jpeg format allowed!"))
        }
    }
})


const app = express();
app.use(express.json()); // *accept jason file



app.get('/', (req, res) => {
    res.send('file upload page');
});

// upload.none() // from data upload(no file upload)
// upload.single("name") // single file upload
// upload.array("name",noOfFiles) //multiple file upload
// upload.fields([{ name: "avatar", maxCount: 1 }, { name: "multiAvatar", maxCount: 2 }]) // multiple input field

app.post('/', upload.single("avatar"), (req, res) => {

    // console.log(req.files);//multipleFiles
    res.send('single file upload'); console.log(req.file);//singleFile
});

// default error handler
app.use((err, req, res, next) => {
    if (err) {
        // this if block check specific multer error
        if (err instanceof multer.MulterError) {
            res.status(500).send("there was an upload error")
        } else {
            // this  block check default error all types
            res.status(500).send(err.message)
        }
    } else {
        res.send("success")
    }
})
app.listen(5000, () => {
    console.log(`app running on ${5000}`);
});
