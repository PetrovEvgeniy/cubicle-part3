const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods = {
    checkPassword: function(password){
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function(next){
    /*On each DB Save we check if the password is modified, then we hash it with bcrypt
    and store it in the user table
    */
    if(this.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {next(err); return;}

            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) {next(err); return;}

                this.password = hash;
                next();
            });
        });
        return;
    }
});

module.exports = mongoose.model('User',userSchema);