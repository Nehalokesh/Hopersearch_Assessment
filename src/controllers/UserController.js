// Import the required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign up function to handle user sign up
exports.signUp = (req, res) => {
    const { name, email, phone, age, gender,password } = req.body;
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            return res.status(400).json({error: error.message});
        }
        const newUser = new User({name, email, phone, age, gender, password: hash});
        newUser
        .save()
        .then(user => {
            res.json({message: 'Signup successful'});
        })
        .catch(error => {
            res.status(400).json({error: error.message});
        });
    });
};

// Sign in function to handle user sign in
exports.signIn = (req, res) => {
    const { email, phone, password } = req.body;
    User.findOne({
        $or: [
            { email: email },{ phone: phone }]
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(400).json({error: error.message});
                }
                if (!result) {
                    return res.status(400).json({message: 'Incorrect password'});
                }
                const token = jwt.sign({ id: user._id },'abcde');
                res.json({token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        age: user.age,
                        gender: user.gender
                    }
                });
            });
        })
        .catch(error => {
            res.status(400).json({error: error.message});
        });
    };

// Reset password function to handle password reset
exports.resetPassword = (req, res) => {
const { email } = req.body;
User.findOne({ email: email })
.then(user => {
if (!user) {
return res.status(400).json({message: 'User not found'});
}
res.json({message: 'Password reset link sent to email'});
})
.catch(error => {
res.status(400).json({error: error.message});
});
};

// Update profile 
exports.updateProfile = (req, res) => {
    const { name, email, phone, age, gender } = req.body;
    User.findOneAndUpdate({ _id: req.params.id },
        {$set: {name,email,phone,age,gender}},
        { new: true })
        .then(user => {
            res.json({message: 'Profile updated successfully',user});
        })
        .catch(error => {
            res.status(400).json({error: error.message});
        });
    };
    
    exports.changePassword = (req, res) => {
        const id = req.params.id;
        const { oldPassword, newPassword } = req.body;
        
        User.findById(id)
          .then(user => {
            bcrypt.compare(oldPassword, user.password, (err, result) => {
              if (err) {
                return res.status(401).json({error: 'Incorrect password'});
              }
      
              if (result) {
                bcrypt.hash(newPassword, 10, (error, hash) => {
                  if (error) {
                    return res.status(400).json({error: error.message});
                  }
                  user.password = hash;
                  user.save()
                    .then(() => {
                      res.json({message: 'Password changed successfully'});
                    })
                    .catch(error => {
                      return res.status(400).json({error: error.message});
                    });
                });
              } else {
                return res.status(401).json({error: 'Incorrect password'});
              }
            });
          })
          .catch(error => {
            return res.status(404).json({message: "User not found"});
          });
      };
      
    
    exports.logout = (req, res) => {
         // revoke the auth token
        res.json({message: 'Logout successful'});
    };