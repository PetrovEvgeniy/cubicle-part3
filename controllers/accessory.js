const {cubeModel,accessoriesModel} = require('../models/index');

function getCreate(req,res){
    res.render('createAccessory.hbs');
}

function postCreate(req,res,next){
    const { name = null, description = null, imageUrl = null} = req.body;

    accessoriesModel.create({ name, description, imageUrl }).then(created => {
    res.redirect('/');
  }).catch(next);
}

async function getAttach(req,res){
    
    try{
     const cubeId = req.params.id;
     const cube = await cubeModel.findById(cubeId);
     const filteredAccessories = await accessoriesModel.find({ cubes: {$nin: cubeId}});
     const accessoriesAvailable = filteredAccessories.length !== 0;

    
     res.render('attachAccessory.hbs', {cube, filteredAccessories, accessoriesAvailable});
    }
    catch(err){
        console.log(err);
    }

}

function postAttach(req,res,next){

    try{
        const cubeId = req.params.id;
        const {accessory: accessoryId} = req.body;
    
    
       Promise.all([
        cubeModel.update({_id: cubeId}, { "$push": { "accessories": accessoryId } }),
        accessoriesModel.update({_id: accessoryId}, { "$push": { "cubes": cubeId } })
    ])
       .then(res.redirect('/'))
       .catch(next);
        

    }catch(err){
        console.log(err);
    }
    


    

}

module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
}