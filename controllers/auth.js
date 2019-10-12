const models = require('../models/index');
const utils = require('../utils');
const appConfig = require('../appConfig');

function getRegister(req,res){
    res.render('register.hbs');
}
function postRegister(req,res,next){
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword){
        res.render('register.hbs',{errorMessage:'Password and repeat password do not match!'});
        return;
    
    }

    models.userModel.create({username, password})
    .then(() => {
        res.redirect('/login');
    })
    .catch((err) => {
        if(err.code === 11000){
            res.render('register.hbs',{errorMessage:'Username already in use!'});
        }
    });

}

function getLogin(req,res){
    res.render('login.hbs');

}
function postLogin(req,res,next){
    const {username, password} = req.body;

    models.userModel.findOne({username})
    .then(user => Promise.all([user, user.checkPassword(password)]))
    .then(([user,isMatch]) => {
        if(!isMatch){
            res.render('login.hbs',{errorMessage:'The username or password is incorrect!'});
            return;
        }
        const token = utils.jwt.createToken( {id: user._id});
         res.cookie(appConfig.authCookieName, token).redirect('/');
            
        
    }).catch(next)
}

function logout(req,res){
    const token = req.cookies[appConfig.authCookieName];
    models.tokenBlacklistModel.create({token}).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    });
}

module.exports = {
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    logout

}