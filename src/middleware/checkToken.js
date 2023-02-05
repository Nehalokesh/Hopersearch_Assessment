const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkToken = (req, res, next) => {
const header = req.headers['authorization'];

if (typeof header !== 'undefined') {
const token = header.split(' ')[1];
jwt.verify(token, 'abcde', (error, decoded) => {
if (error) {
return res.status(401).json({
error: 'Token is invalid'
});
} else {
User.findOne({ email: decoded.email })
.then(user => {
req.user = user;
next();
})
.catch(error => {
res.status(400).json({
error: error.message
});
});
}
});
} else {
return res.status(401).json({
error: 'Token is required'
});
}
};

module.exports = checkToken;