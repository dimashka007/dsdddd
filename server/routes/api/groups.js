const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/groups/', async (req, res) => { 
    const groups = await loadGroupsCollection();
    const current = groups.db('department').collection('groups');
    res.send(await current.find({}).toArray());
    groups.close();
});


router.put('/api/marks', async (req, res) => {
    const edu = await loadGroupsCollection();
    const current = edu.db('department').collection((req.body.name + req.body.way).split('.').join('').split(' ').join(''));
    await current.updateOne(
        { _id: new mongodb.ObjectID(req.body.id)}, // Filter
        {$set: {"marks": req.body.marks}}, // Update
        {upsert: false} // add document with req.body._id if not exists 

   );
    res.status(201).send();
    edu.close();

});

router.post('/api/groups/', async (req, res) => {
    const groups = await loadGroupsCollection();
    const current = groups.db('department').collection('groups');
    await current.insertOne({
        groupName: req.body.name,
        students: [],
    });
    res.status(201).send();
    groups.close();

});


async function loadGroupsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client;
}
 
module.exports = router;

