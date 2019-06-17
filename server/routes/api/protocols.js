const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/plans/')

// Get exams

router.get('/api/protocols/program', async (req, res) => {

    let list = await fs.readdirSync(expath+'program');
    res.send(list);
});
router.get('/api/protocols/science', async (req, res) => {

    let list = await fs.readdirSync(expath+'science');
    res.send(list);
});
router.get('/api/protocols/yearly', async (req, res) => {

    let list = await fs.readdirSync(expath+'yearly');
    res.send(list);
});
router.get('/api/protocols/protocolsPart', async (req, res) => {

    let list = await fs.readdirSync(expath+'protocolsPart');
    res.send(list);
});
router.get('/api/protocols/protocols', async (req, res) => {

    let list = await fs.readdirSync(expath+'protocols');
    res.send(list);
});


// Add exams


// Delete exams
router.post('/api/protocols/', async (req, res) => {
    await fs.unlink(expath + req.body.name, (err) => {
    });
      res.send();
});
 
module.exports = router;
