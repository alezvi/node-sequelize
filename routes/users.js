var express = require('express');
var router = express.Router();
var models = require('../database/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.user.scope('registeredYesterday').findAll({
    limit: 1
  }).then(data => {
    res.json(data);
  })
});


router.get('/save', function (req, res) {
  models.user.create({
    email: 'cosme@fulanito.fox',
    password: 'soyhomero',
    activated_at: new Date('2010-01-01 17:23:58'),
  }).then(result => {
    res.json({success: true})
  })
})

router.get('/:id', function(req, res, next) {
  models.user.findOne({
    where: {id: req.params.id},
    include: [models.post]
  }).then(data => {
    res.json(data);
  })
});

module.exports = router;
