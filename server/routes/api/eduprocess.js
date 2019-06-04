const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/eduprocess', async (req, res) => {
    const edu = await loadEduprocessCollection();
    const current = edu.db('department').collection(req.query.user.split('.').join('').split(' ').join(''));
    res.send(await current.find({}).toArray());
    edu.close();
});


router.post('/api/eduprocess', async (req, res) => {
    const edu = await loadEduprocessCollection();
    const current = edu.db('department').collection(req.body.params.user.split('.').join('').split(' ').join(''));
    await current.insertOne({
        type: req.body.type,
        amount: req.body.amount,
        term: req.body.term,

    });
    res.status(201).send();
    edu.close();
});


router.delete('/api/eduprocess/:id', async (req, res) => {
    const edu = await loadEduprocessCollection();
    const current = edu.db('department').collection(req.body.user.split('.').join('').split(' ').join(''));
    await current.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
    edu.close();
});


async function loadEduprocessCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client;
}
 
module.exports = router;
