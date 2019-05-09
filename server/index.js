var express = require("express");
var bodyPaprses = require("body-parser");
var cors = require("cors");

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


app.use(exams);
app.use(protocols);
app.use(courseworks);
app.use(graphics);
app.use(methodicals);
app.use(teachers);
app.use(teachload);
app.use(eduprocess);
app.use(marks);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));