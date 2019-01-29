var express = require('express');
var router = express.Router();
const Controller = require('../controllers/QuestionCon')
const { isLogin, checkQues } = require('../middlewares')

router.get('/', Controller.read)
router.post('/', isLogin, Controller.create)
router.get('/:id', checkQues, Controller.findOne)
router.put('/:id', isLogin, checkQues, Controller.update)
router.delete('/:id', isLogin, checkQues, Controller.delete)

module.exports = router;
