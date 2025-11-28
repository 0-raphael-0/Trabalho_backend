const Joi = require('joi');

exports.createTarefaSchema = Joi.object({
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().allow('', null),
  status: Joi.string().valid('pendente', 'em-andamento', 'concluida').optional(),
  prazo: Joi.date().greater('now').optional()
});

exports.updateTarefaSchema = Joi.object({
  titulo: Joi.string().min(3),
  descricao: Joi.string().allow('', null),
  status: Joi.string().valid('pendente', 'em-andamento', 'concluida'),
  prazo: Joi.date().greater('now')
}).min(1);