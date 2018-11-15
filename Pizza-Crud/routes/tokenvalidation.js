var express = require('express');
var jwt = require('jsonwebtoken');
var jwtc = require('jwt-simple');
var router = express.Router();
var PalabraSecreta; 

router.post('/:secretword', function(req, res, next) {
  token = generateToken(req.body, req.params.secretword);
  PalabraSecreta = req.params.secretword;
  res.status(200).json(token);
});   

function generateToken(Json, secretword) {
  jwtc.encode(Json,secretword)
  return token = jwt.sign(Json,secretword,{
     expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

router.get('/', ensureToken, (req, res) => {
  jwt.verify(req.token, PalabraSecreta, (err, data) => {
    if(err)
    {
      res.sendStatus(403);
    }else
    {
      res.json(
        {
          text: 'Token Valido',
          data
        }
      );
    }
  });
});

function ensureToken(req, res, next)
{
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

module.exports = router;
