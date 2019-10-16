var express = require("express");
var bodyPaprses = require("body-parser");
var cors = require("cors");
const multer = require('multer');
let fs = require('fs-extra');
const path = require('path')

const app = express();

//middleware

app.use(bodyPaprses.json());
app.use(cors());
const exams = require('./routes/api/exams');
const protocols = require('./routes/api/protocols');
const courseworks = require('./routes/api/courseworks');
const graphics = require('./routes/api/graphics');
const methodicals = require('./routes/api/methodicals');
const teachers = require('./routes/api/teachers');
const teachload = require('./routes/api/teachload');
const eduprocess = require('./routes/api/eduprocess');
const marks = require('./routes/api/marks');
const groups = require('./routes/api/groups');

app.use(exams);
app.use(protocols);
app.use(courseworks);
app.use(graphics);
app.use(methodicals);
app.use(teachers);
app.use(teachload);
app.use(eduprocess);
app.use(marks);
app.use(groups);

// const upload = multer({
//     dest: './uploads/'
// });
var storage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            let type = req.query.folder;
            let path = `${type}`;
            fs.mkdirsSync(path);
            callback(null, path);
          },
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname );
        }
    }
);

var upload = multer( { storage: storage } );

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json({file: req.file})
}) ;

if(process.env.NODE_ENV === 'production'){
    // stativ folder
    app.use(express.static(path.join(__dirname, '../client/dist/')))

    app.get(/.*/, (req,res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}
else{
    app.use(express.static(path.join(__dirname, '../client/dist/')))

    app.get(/.*/, (req,res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));