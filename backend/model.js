const mongoose = require('mongoose')

const TarefaSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  feito: {
    type: Boolean,
    default: false
  }
})

module.exports = Tarefa = mongoose.model('tarefa', TarefaSchema)