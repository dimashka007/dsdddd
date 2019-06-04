const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/methodicals', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    const current = meth.db('department').collection('methodicals');
    res.send(await current.find({}).toArray());
    meth.close();
});


router.post('/api/methodicals', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    const current = meth.db('department').collection('methodicals');
    await current.insertOne({
        name: req.body.name,
        course: req.body.course,
        semester: req.body.semester,
        discipline: req.body.discipline,
        
    });
    res.status(201).send();
    meth.close();
});


router.delete('/api/methodicals/:id', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    const current = meth.db('department').collection('methodicals');
    await current.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
    meth.close();
});


async function loadMethodicalsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client;
}
 
module.exports = router;
