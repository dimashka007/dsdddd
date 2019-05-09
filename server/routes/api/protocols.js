const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/protocols/')

// Get exams

router.get('/api/protocols', async (req, res) => {

    let list = await fs.readdirSync(expath);
    res.send(list);
});

// Add exams


// Delete exams
router.post('/api/protocols/', async (req, res) => {
    await fs.unlink(expath + req.body.name, (err) => {
    });
      res.send(fs.readdirSync(path.join(expath)));
});
 
module.exports = router;
