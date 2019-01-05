var express = require('express');
var router = express.Router();
const account = require('../models/account');
var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
var Parse = require('csv-parser')
var fs = require('fs')
var xl = require('excel4node');
/* GET Accounts. */
router.get('/', function(req, res, next) {
    Promise.all([account.find('amc'), account.find('bill')]).then((val) => {
      //console.log(val);
      res.render('dashboard-accounts', {
        title: 'dashboard-accounts',
        bill: val[1],
        amc: val[0]
      });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  })
  .post('/:id', function(req, res) {
    account.update(req.params.id).then((val) => {
      res.send("Resolved Successfully");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  })
  .post('/', upload.single('file'), parseCSVFile);
/*  account.add(req.body.client_id, req.body.sales_date, req.body.type, req.body.description, req.body.amount, req.body.created_by = 0)
    .then((val) => {
      res.send(val);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });*/
//});
function parseCSVFile(req, res) {
  var source = fs.createReadStream(req.file.path);
  var linesRead = 0;
  var parser = Parse({
    delimiter: ','
  });

  parser.on("readable", function() {
    var record;
    while (record = parser.read()) {
      account.addUsingCSV(record.email, record.description, record.amount, record.sales_date, req.body.type)
        .then(function(res) {})
        .catch((err) => {
          console.log(err);
        });
      linesRead++;
    }
  })
  parser.on("error", function(error) {
    res.send(error);
  });
  parser.on("finish", function() {
    //res.send("LinesRead: " + linesRead);
    res.redirect('/accounts');
  });
  source.pipe(parser);
}

router.get('/report', function(req, res) {
  account.findAll().then((val) => {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Account_Sheet');
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
    wb.write('Account.xlsx', res);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;