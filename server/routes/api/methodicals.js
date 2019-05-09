const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/methodicals', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    res.send(await meth.find({}).toArray());
});


router.post('/api/methodicals', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    await meth.insertOne({
        name: req.body.name,
        course: req.body.course,
        semester: req.body.semester,
        discipline: req.body.discipline,
        
    });
    res.status(201).send();
});


router.delete('/api/methodicals/:id', async (req, res) => {
    const meth = await loadMethodicalsCollection();
    await meth.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadMethodicalsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client.db('department').collection('methodicals');
}
 
module.exports = router;
