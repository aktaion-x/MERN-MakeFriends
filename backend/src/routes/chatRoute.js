const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { allChats, sendMessage, deleteMessage, deleteChat, chatSeen, getChat } = require('../controllers/chatController');

router.use(requireAuth);

router.get('/allChats', allChats);
router.get('/getChat', getChat);
router.post('/chatSeen', chatSeen);
router.post('/sendMessage', sendMessage);
router.delete('/deleteMessage', deleteMessage);
router.delete('/deleteChat', deleteChat);



module.exports = router;