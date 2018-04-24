var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup' , function(req, res, next){
  console.log("signup");
  User.register(new User({username:req.body.username,mobile:req.body.mobile}), req.body.password, (err, user) => {
    if(err)
    {
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err : err});
    }
    else{
        passport.authenticate('local')(req, res , () => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success:true, status: 'Registration Succesful'});
      });
    }
  });
  
});

router.post('/login', passport.authenticate('local'),(req, res) => {
  
  res.status = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success:true, status: 'Log in Succesful'});

});


module.exports = router;
