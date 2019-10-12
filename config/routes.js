//Require Controllers
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/', auth(false), cubeController.getHome);
    //CREATE CUBE
    app.get('/create',auth(), cubeController.getCreate);
    app.post('/create',auth(), cubeController.postCreate);

    app.get('/about', cubeController.getAbout);
    app.get('/not-found', cubeController.getNotFound);
    app.get('/details/:id', cubeController.getDetails);

    app.get('/create/accessory',auth(), accessoryController.getCreate);
    app.post('/create/accessory',auth(), accessoryController.postCreate);
    app.get('/attach/accessory/:id',auth(), accessoryController.getAttach);
    app.post('/attach/accessory/:id',auth(), accessoryController.postAttach);

    app.get('/register', authController.getRegister);
    app.post('/register', authController.postRegister);

    app.get('/login', authController.getLogin);
    app.post('/login', authController.postLogin);

    app.get('/logout', authController.logout);
    



    app.use(function(req, res, next){
        res.status(404);
        res.redirect('/not-found');
      });
};