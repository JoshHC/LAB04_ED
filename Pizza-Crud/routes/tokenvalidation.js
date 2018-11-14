var express = require('express');
var jwt = require('jsonwebtoken');
var jwtc = require('jwt-simple');
var router = express.Router();
 
router.post('/:secretword', function(req, res, next) {
  token = generateToken(req.body, req.params.secretword);
  res.status(200).json(token);
});   

function generateToken(Json, secretword) {
  jwtc.encode(Json,secretword)
  return token = jwt.sign(Json,secretword,{
     expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}
module.exports = router;
