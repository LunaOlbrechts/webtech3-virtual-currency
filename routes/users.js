const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
