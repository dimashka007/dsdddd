const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/courseworks/')

// Get exams

router.get('/api/courseworks/bak', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'bak/'));
    res.send(list);
});

router.get('/api/courseworks/course', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'course/'));
    res.send(list);
});

router.get('/api/courseworks/mag', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + 'mag/'));
    res.send(list);
});

// Add exams


// Delete exams
router.post('/api/courseworks/', async (req, res) => {
    await fs.unlink(expath + req.body.name, (err) => {
      })
      res.send(fs.readdirSync(path.join(expath + req.body.folder)));
});
 
module.exports = router;
