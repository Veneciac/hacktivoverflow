var express = require('express');
var router = express.Router();
const Controller = require('../controllers/AnswerCon')
var { checkQues, isLogin, checkAnswer } = require('../middlewares')

//ini question id
router.get('/:id', checkQues, Controller.read)
router.post('/:id', isLogin, checkQues, Controller.create)

// ini answer id
router.put('/:id', isLogin, checkAnswer, Controller.update)


module.exports = router;
