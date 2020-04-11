const User = require('../models/User');
const passport = require('passport');

// Using passport-local-mongoose 
passport.use(User.createStrategy());
