const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { requestFriendship, acceptFriendship, removeFriendship, cancelRequestFriendship, cancelFriendship } = require('../controllers/friendshipController');

router.use(requireAuth);

router.post('/request/:_id', requestFriendship);
router.post('/cancelRequest/:_id', cancelRequestFriendship);
router.post('/accept/:_id', acceptFriendship);
router.post('/cancel/:_id', cancelFriendship);
router.post('/remove/:_id', removeFriendship);



module.exports = router;