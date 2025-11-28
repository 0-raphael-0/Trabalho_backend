const Tarefa = require('../models/tarefa.model');

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.validatedBody, userId: req.user.id };
    const tarefa = await Tarefa.create(data);
    return res.status(201).json(tarefa);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const tarefas = await Tarefa.find({ userId: req.user.id });
    return res.status(200).json(tarefas);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const tarefa = await Tarefa.findOne({ _id: req.params.id, userId: req.user.id });
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(200).json(tarefa);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.validatedBody,
      { new: true }
    );
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(200).json(tarefa);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const tarefa = await Tarefa.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};