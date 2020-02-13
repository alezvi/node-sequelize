var express = require('express');
var router = express.Router();
var models = require('../database/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
  models.post.findAll({
    include: [
      { association : 'tag' },
      { association : 'author', attributes: ['id', 'email'] }
    ]
  }).then(data => {
    res.json(data)
  })
});

router.get('/posts/search', function(req, res, next) {
  let query = models.post

  let rating = ['rated']

  rating.push( req.query.rating_min ? req.query.rating_min : 0 )
  rating.push( req.query.rating_max ? req.query.rating_max : 10 )
  
  query.scope({method: rating}).findAll({
    include: [
      { association : 'tag' },
      { association : 'author', attributes: ['id', 'email'] }
    ]
  }).then(data => {
    res.json(data)
  })
});

module.exports = router;
