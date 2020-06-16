const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const PORT = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

mongoose.connect('mongodb://mongo:27017/details', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

const Tarefa = require('./model')

app.get('/', (req, res) => {
  Tarefa.find()
    .then(tarefas => res.send(tarefas))
    .catch(erro => res.send(erro))
})

app.post('/tarefa/adiciona', (req, res) => {
  const novaTarefa = new Tarefa({
    texto: req.body.texto
  })
  novaTarefa.save().then(item => res.send(item));
})

app.put('/tarefa/marca/:id', (req, res) => {
  const { id } = req.params
  Tarefa.updateOne({_id: id}, req.body)
    .then(tarefa => res.send(tarefa))
})

app.put('/tarefas/marca', (req, res) => {
  Tarefa.updateMany({}, req.body)
    .then(tarefas => res.send(tarefas))
})

app.delete('/tarefa/remove/:id', (req, res) => {
  const { id } = req.params
  Tarefa.deleteOne({_id: id})
    .then(tarefa => res.send(tarefa))
})

app.delete('/tarefas/remove', (rep, res) => {
  Tarefa.deleteMany({})
    .then(tarefas => res.send(tarefas))
})

app.listen(PORT, () => console.log('Servidor rodando na porta: ' + PORT))