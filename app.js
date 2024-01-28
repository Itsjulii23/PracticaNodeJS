const express = require('express');
const http = require('http');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server, { path: '/socket.io' });
const { multiplicar } = require('./helpers/multiplicar');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('layout', { title: 'Mi Proyecto' });
});

app.post('/tabla', async (req, res) => {
  const base = parseInt(req.body.base);
  const tablaHtml = await multiplicar(base);
  res.send(tablaHtml);
});

app.get('/multiplicar', async (req, res) => {
  res.render('multiplicar', { title: 'Tabla de multiplicar' });
});

app.get('/quiniela', async (req, res) => {
  res.render('quiniela', { title: 'Quiniela de Futbol' });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('generarQuiniela', () => {
    const quiniela = generarQuinielaAleatoria(15);
    socket.emit('quinielaGenerada', quiniela);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

function generarQuinielaAleatoria(numPartidos) {
  const resultadosPosibles = ['1', 'X', '2'];
  const quiniela = [];

  for (let i = 0; i < numPartidos; i++) {
    quiniela.push(generarResultadoAleatorio(resultadosPosibles));
  }

  return quiniela;
}

function generarResultadoAleatorio(resultadosPosibles) {
  const indiceAleatorio = Math.floor(Math.random() * resultadosPosibles.length);
  return resultadosPosibles[indiceAleatorio];
}

server.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en puerto 3000');
});
