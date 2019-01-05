var express = require('express');
var router = express.Router();
const complaint = require('../models/complaint');
const users = require('../models/users');
var ejs = require('ejs');
var passport = require('passport');
var xl = require('excel4node');

router.get('/', function(req, res) {

    Promise.all([complaint.find('pending'), complaint.find('progress'), complaint.find('closed'), users.findByCategory(4)]).then((val) => {
      res.render('dashboard-complain', {
        title: 'dashboard-complain',
        closed: JSON.parse(val[2]),
        pending: JSON.parse(val[0]),
        progress: JSON.parse(val[1]),
        engineerName: val[3]
      });
    });
  })
  .post('/', function(req, res) {
    complaint.add('pending', req.body.name, req.body.Title, req.body.category, req.body.Details, req.body.Date)
      .then((val) => {
        res.send(val);
      }).catch((err) => {
        console.log(err)
      })
  }).post('/:id', function(req, res) {
    complaint.updateStatus(req.params.id, req.body.status).then((val) => {
      res.send((req.body.status === "closed") ? "Closed Successfully" : "Added To In Progress");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  })

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

router.get('/report', function(req, res) {
  complaint.findAll().then((val) => {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Complaint_Sheet');
    var style = wb.createStyle({
      font: {
        color: '#FF0800',
        size: 14
      }
    });
    let colLen = val.length;
    let headerArr = Object.keys(val[0]);
    let rowLen = headerArr.length;
    for (let i = 0; i < rowLen; i++) {
      ws.cell(1, i + 1).string(headerArr[i]).style(style);
    }
    for (let i = 0; i < colLen; i++) {
      for (let j = 0; j < rowLen; j++) {
        ws.cell(2 + i, 1 + j).string(val[i][headerArr[j]] + '').style({
          font: {
            size: 12,
            color: '#000000'
          }
        });
      }
    }
    wb.write('Complaint.xlsx', res);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;