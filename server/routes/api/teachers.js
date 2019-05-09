const express = require('express');
const mongodb = require('mongodb');
const path = require('path');
const fs = require('fs-extra')
const expath = path.join(__dirname, '../../../client/public/docs/teachload/')
const router = express.Router();

// Get 

router.get('/api/teachers', async (req, res) => {
    const teach = await loadTeachersCollection();
    res.send(await teach.find({}).toArray());
});


router.post('/api/teachers', async (req, res) => {
    await fs.mkdir(expath+req.body.name.split('.').join(''), { recursive: true }, (err) => {
        if (err) console.log(err);
      });
    const teach = await loadTeachersCollection();
    await teach.insertOne({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
    });

    res.status(201).send();
});


router.delete('/api/teachers/:id', async (req, res) => {
    await fs.remove(expath+req.body.dir.split('.').join(''), err => {
      })
    const teach = await loadTeachersCollection();
    await teach.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadTeachersCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true,
    });

    return client.db('masterDegree').collection('teachers');
}
 
module.exports = router;
