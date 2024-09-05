const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = () => {
  return jwt.sign({ id: 1, name: 'Test1', email: 'test1@demo.com' }, process.env.JWT_SECRET);
};
console.log(generateToken())