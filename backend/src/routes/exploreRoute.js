const router = require('express').Router();

const requireAuth = require('../middlewares/requireAuth');
const { friendshipRequests, friendshipAccepts, friends, allUsers, generateToken } = require('../controllers/exploreController');

router.use(requireAuth);

router.get('/friendshipRequests', friendshipRequests);
router.get('/friendshipAccepts', friendshipAccepts);
router.get('/friends', friends);
router.get('/allUsers', allUsers);
router.get('/generateToken/:_id', generateToken);

module.exports = router;