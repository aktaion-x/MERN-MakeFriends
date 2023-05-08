const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { requestFriendship, acceptFriendship, removeFriendship } = require('../controllers/friendshipController');

router.use(requireAuth);

router.post('/request/:_id', requestFriendship);
router.post('/accept/:_id', acceptFriendship);
router.post('/remove/:_id', removeFriendship);



module.exports = router;