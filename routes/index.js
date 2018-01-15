var express = require('express');
var router = express.Router();

var Book = require('../models/book');

router.get('/', function(req, res, next) {
    res.render('home', {title: 'Express'});
});

router.get('/book', function(req, res, next) {
  res.render('index', {title: '天狗书店'});
});

router.get('/book.json', function(req, res, next) {
  Book.fetch(function(err, books) {
    if(err) {
      console.log(err);
    }

    //console.log(books);
    res.json(books);
  });
});

router.post('/addBook', function(req, res, next) {
  //console.log(req.body);
  Book.findByOne(function(err, obj) {
    if(err) {
      console.log(err);
    }

    //console.log(obj);
    var _book = req.body;
    _book.id = parseInt(obj.id) + 1;

    var book = new Book(_book);
    book.save(function(err, book) {
      if(err) {
        console.log(err);
      }

      //console.log(book);
      res.json({success: 1, message: '添加成功！', book: book});
    });

  });
});

router.put('/addBook', function(req, res, next) {
  //console.log(req.body);
  Book.update({id: req.body.id}, {$set: req.body}, function(err) {
    if(err) {
      console.log(err);
    }

    res.json({success: 1, message: '修改成功！'});
  });
});

router.delete('/addBook', function(req, res, next) {
  //console.log(req.query.id);
  var id = req.query.id;
  Book.del(id, function(err, docs) {
    if(err) {
      console.log(err);
    }

    //console.log(docs);
    res.json({success: 1, message: '删除成功！'});
  });
});

module.exports = router;
