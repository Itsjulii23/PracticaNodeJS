// app.js
const express = require('express');
const app = express();
const port = 3000;

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Mi Proyecto' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
