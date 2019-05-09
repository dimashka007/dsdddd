const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get 

router.get('/api/eduprocess', async (req, res) => {
    const edu = await loadEduprocessCollection(req.query.user);
    res.send(await edu.find({}).toArray());
});


router.post('/api/eduprocess', async (req, res) => {
    const edu = await loadEduprocessCollection(req.body.params.user);
    await edu.insertOne({
        type: req.body.type,
        amount: req.body.amount,
        term: req.body.term,

    });
    res.status(201).send();
});


router.delete('/api/eduprocess/:id', async (req, res) => {
    const meth = await loadEduprocessCollection(req.body.user);
    await meth.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadEduprocessCollection(coll){
    let user = coll.split('.').join('').split(' ').join('')
    const client = await mongodb.MongoClient.connect("mongodb+srv://asus48hdc:master1997@masterdegree-7nlxw.mongodb.net/test?retryWrites=true", {
        useNewUrlParser: true
    });

    return client.db('department').collection(user);
}
 
module.exports = router;
