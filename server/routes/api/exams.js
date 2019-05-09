const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/exams/')

// Get exams

router.get('/api/exams/ms', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'ms'));
    res.send(list);
});

router.get('/api/exams/dac', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'dac'));
    res.send(list);
});

router.get('/api/exams/mag', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'mag'));
    res.send(list);
});

// Add exams


// Delete exams
router.post('/api/exams/', async (req, res) => {
    await fs.unlink(expath + req.body.name, (err) => {
      })
      res.send(fs.readdirSync(path.join(expath + req.body.folder)));
});
 
module.exports = router;
