const router = require('express').Router();
const upload = require('../middlewares/multer');
const { loginUser, signupUser } = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/signup', upload.single('image'), signupUser);

module.exports = router;