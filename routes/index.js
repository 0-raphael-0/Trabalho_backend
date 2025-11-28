const express = require('express');
const authRoutes = require('./auth.routes');
const tarefaRoutes = require('./tarefa.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tarefas', tarefaRoutes);

module.exports = router;