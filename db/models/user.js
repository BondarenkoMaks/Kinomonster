const bcrypt = require("bcryptjs");
const mongoose = require("../../db").mongoose;


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String
  }

});

let User = module.exports = mongoose.model("User", UserSchema);

module.exports.createUser = (newUser, callback) => {

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.createUserFromGoogleApi = (newUser, callback) => {
  newUser.save(newUser, callback);
};

module.exports.getUserByUsername = (username, callback) => {
  User.findOne({username}, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw(err);
    callback(null, isMatch);
  });
};

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

