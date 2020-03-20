var express  = require('express');
var router   = express.Router();

// Index
router.get('/',
  function(req, res, next){
    const data = require('../dummy/userData');
    res.json({
      msg: "ok", 
      data: { 
        dbdata: data, 
        page: 1,
        total: data.length 
      }
    });
  }
);

// Show
router.get('/:id',
  function(req, res, next){
    
  }
);

// Create
router.post('/',
  function(req, res, next){
    Hero.findOne({})
    .sort({id: -1})
    .exec(function(err, hero){
      if(err) {
        res.status(500);
        return res.json({success:false, message:err});
      }
      else {
        res.locals.lastId = hero?hero.id:0;
        next();
      }
    });
  },
  function(req, res, next){
    var newHero = new Hero(req.body);
    newHero.id = res.locals.lastId + 1;
    newHero.save(function(err, hero){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:hero});
      }
    });
  }
);

// Update
router.put('/:id',
  function(req, res, next){
    Hero.findOneAndUpdate({id:req.params.id}, req.body)
    .exec(function(err, hero){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!hero){
        res.json({success:false, message:"hero not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

// Destroy
router.delete('/:id',
  function(req, res, next){
    Hero.findOneAndRemove({id:req.params.id})
    .exec(function(err, hero){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!hero){
        res.json({success:false, message:"hero not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

module.exports = router;