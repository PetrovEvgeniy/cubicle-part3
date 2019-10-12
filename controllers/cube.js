const {cubeModel} = require('../models/index');

function getHome(req, res, next){
     const {search, from, to} = req.query;
     const user = req.user;

     let query = {};
     if (search) {
       query = { ...query, name: { $regex: search } };
     }
     if (to) {
       query = { ...query, difficultyLevel: { $lte: +to } };
     }
     if (from) {
       query = {
         ...query,
         difficultyLevel: { ...query.difficultyLevel, $gte: +from }
       };
     }

     cubeModel.find(query).then(cubes => {
        const cubesFound = cubes.length !== 0;
        res.render('index.hbs', {cubesFound,cubes,from,to,user});


     }).catch(next);
   
}

function getCreate(req, res){
  
    res.render('create.hbs');
}

function postCreate(req, res, next){
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;

  cubeModel.create({ name, description, imageUrl, difficultyLevel }).then(cube => {
    res.redirect('/');
  }).catch(next);
}

function getAbout(req, res){

    res.render('about.hbs');
}

async function getDetails(req, res, next) {
 try{
    const id = req.params.id;
    
    const cube = await cubeModel.findById(id).populate('accessories');

     if (!cube) { res.redirect('/not-found'); return; }
     res.render('details.hbs', { cube});
 }catch(err){
    console.log(err);
 }
    
    
}

function getNotFound(req,res){
  
    res.render('404.hbs');
}

module.exports = {
    getHome,
    getCreate,
    postCreate,
    getAbout,
    getDetails,
    getNotFound
}