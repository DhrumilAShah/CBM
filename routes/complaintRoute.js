var express = require('express');
var router = express.Router();
const complaint = require('../models/complaint');



router.post('/', function(req, res) {
    complaint.add(req.body.status, req.body.user_id, req.body.title, req.body.category, req.body.details, req.body.date).then((val) => {
      res.send(val);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  })
  .get('/', function(req, res) {
    complaint.findAll().then((val) => {
      res.send(val);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500); //Internal Server Error
    });
  })
  .get('/:status', function(req, res) {
    console.log("status: " + req.params.status);
    complaint.find(req.params.status).then((val) => {
      res.json(val);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500); //Internal Server Error
    });
  })
  .patch('/', function(req, res) {
    complaint.updateStatus(req.body.id, req.body.status).then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });


module.exports = router;