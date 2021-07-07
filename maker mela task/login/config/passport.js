const LocalStrategy = require('passport-local').Strategy;
var User=require('../models/user');
const config=require('../config/database');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


module.exports=(passport)=>{
    passport.use(new LocalStrategy((username, password, done)=> {
        let query={username:username};
        User.findOne(query, (err, user)=> {
            if(err) throw err;
            if(!user){
                return done(null, false, {message:'Nouser found'});
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else{
                    return done (null, false, {message: 'Wrong Password'});
                }
            });
        });
    }));


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}