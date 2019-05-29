const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const expath = path.join(__dirname, '../../../client/public/docs/graphics/');
var mammoth = require("mammoth");


// Get exams

router.get('/api/graphics/open', async (req, res) => {
    cont = [];

    let task = await Promise.all([getAllShedules('open/')]).then(() => {
        res.send(cont);
    })
});
router.get('/api/graphics/consults', async (req, res) => {
    cont = [];
    let task = await Promise.all([getAllShedules('consults/')]).then(() => {
        res.send(cont);
    })
});
router.get('/api/graphics/visits', async (req, res) => {
    cont = [];
    let task = await Promise.all([getAllShedules('visits/')]).then(() => {
        res.send(cont);
    })
});


const getAllShedules = async (value) => {
    let options = {
        styleMap: [
            "p[style-name='Section Title'] => h1:fresh",
            "p[style-name='Subsection Title'] => h2:fresh"
        ]
    };
    let list = await fs.readdirSync(path.join(expath + value));
    for (i = 0; i < list.length; i++) {
        if (i === '.DS_Store') {
            continue
        } else {
            const text = (await mammoth.convertToHtml({
                path: expath + value + list[i]
            })).value;
            cont.push(text);
        }
    }
}
// Add exams


// Delete exams
router.post('/api/graphics/', async (req, res) => {
    let list = await fs.readdirSync(path.join(expath + req.body.folder));      
        await fs.unlink(expath + req.body.folder + list[1], (err) => { });
    // await fs.unlink(expath + req.body.name, (err) => {
    // });
    //   res.send(fs.readdirSync(path.join(expath)));
});

module.exports = router;
