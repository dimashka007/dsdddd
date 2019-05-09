const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/teachload/');
var xlsx = require('xlsx');
// Get exams

// Delete exams
router.post('/api/teachload/', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + req.body.folder.split('.').join('')));
    // await fs.unlink(expath + req.body.folder + list[1], (err) => { });
    // await fs.unlink(expath + req.body.name, (err) => {
    // });
    //   res.send(fs.readdirSync(path.join(expath)));
    console.log(list)
    let workbook = await xlsx.readFile(expath + req.body.folder.split('.').join('') +'/' + list[0]);
    let worksheet = await workbook.Sheets['Лист1'];
    let page = await xlsx.utils.sheet_to_html(worksheet, {
        raw: true
    });
    res.send(page)
});

module.exports = router;
