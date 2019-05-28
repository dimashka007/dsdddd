const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/marks/', async (req, res) => {
    const edu = await loadMarksCollection(req.query.user + req.query.type);
    res.send(await edu.find({}).toArray());
});


router.post('/api/marks', async (req, res) => {
    const edu = await loadMarksCollection(req.body.collection);
    await edu.insertOne({
        name: req.body.name
    });
    res.status(201).send();
});

router.post('/api/marks/date', async (req, res) => {
    const edu = await loadMarksCollection(req.body.name + req.body.way);
    await edu.insertOne({
        type: req.body.type,
        task: req.body.task,
        theme: req.body.theme,
        date: req.body.date
    });
    res.status(201).send();
});
router.put('/api/marks', async (req, res) => {
    const edu = await loadMarksCollection(req.body.name + req.body.way);
    await edu.updateOne(
        { _id: new mongodb.ObjectID(req.body.id)}, // Filter
        {$set: {"marks": req.body.marks}}, // Update
        {upsert: false} // add document with req.body._id if not exists 

   );
    res.status(201).send(edu);
});

router.post('/api/marks/student', async (req, res) => {
    const edu = await loadMarksCollection(req.body.name + req.body.way);
    await edu.insertOne({
        type: req.body.type,
        student: req.body.student,
        marks: req.body.marks
    });
    res.status(201).send();
});

router.delete('/api/eduprocess/:id', async (req, res) => {
    const meth = await loadEduprocessCollection(req.body.user);
    await meth.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadMarksCollection(coll){
    let userdb = coll.split('.').join('').split(' ').join('')
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client.db('department').collection(userdb);
}
 
module.exports = router;

