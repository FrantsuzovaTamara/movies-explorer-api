const router = require('express').Router();
const { getUser, changeUserInfo } = require('../controllers/users');
const { checkValidityUser } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', checkValidityUser, changeUserInfo);

module.exports = router;
