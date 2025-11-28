const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, minlength: 3, trim: true },
    descricao: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pendente', 'em-andamento', 'concluida'],
      default: 'pendente'
    },
    prazo: { type: Date },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;