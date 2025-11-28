const express = require('express');
const controller = require('../controllers/tarefa.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createTarefaSchema,
  updateTarefaSchema
} = require('../validations/tarefa.validation');

const router = express.Router();

router.use(auth);

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validate(createTarefaSchema), controller.create);
router.put('/:id', validate(updateTarefaSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;