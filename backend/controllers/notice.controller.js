const Notice = require("../models/notice.model");

const getAll = (req, res) => {
    Notice.find(function(err, notices) {
        if (err) {
            console.log(err);
        } else {
            res.json(notices);
        }
    });
};

const getOne = (req, res) => {
    Notice.findById(req.params.id, function(err, notice) {
        res.json(notice);
    });
};

const add = (req, res) => {
    let notice = new Notice(req.body);
    notice.save()
        .then(notice => {
            res.status(200).json({'notice': 'Notice added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error adding a new Notice');
        });
};

const update = (req, res) => {
    Notice.findById(req.params.id, function(err, notice) {
        if (!notice)
            res.status(404).send('data is not found');
        else
            notice.title = req.body.title;
            notice.text = req.body.text;
            notice.category = req.body.category;
            notice.author = req.body.author;
            notice.flagged.is_flagged = req.body.flagged.is_flagged;
            notice.flagged.info = req.body.flagged.info;
            notice.flagged.by = req.body.flagged.by

            notice.save().then(notice => {
                res.json('Notice updated');
            })
            .catch(err => {
                res.status(400).send("Error updating Notice");
            });
    });
};

const deleteOne = (req, res) => {
    Notice.findByIdAndRemove(req.params.id)
        .then(data => {
            if(!data) {
                res.status(404).send('Notice not found');
            }
            else {
                res.json('Notice deleted');
            }
        })
        .catch(err => {
            res.status(500).send('Error deleting Notice')
        });
};

export {getAll, getOne, add, update, deleteOne};