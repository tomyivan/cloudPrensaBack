const express = require('express');
const cors = require('cors');
// const { Router } = require('express');
// const {getAllCategory} = require('./controller/folders');
var bodyParser = require('body-parser');

const app = express();
// // const router = Router()
app.use(cors())
app.use( express.static('public') )

app.use(bodyParser.json({ limit: '1150mb' })); // Establece el límite a 1150 megabytes
app.use(bodyParser.urlencoded({ limit: '1150mb', extended: true }));
// Middleware para analizar datos URL codificados
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// console.log('Límite de carga útil para analizar JSON:', express.json().options.limit);
// console.log('limit file size '+ limit);
app.use( express.json() );
app.use('/api/category', require('./routes/category'));
app.use('/api/file',require('./routes/files'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use('/api/journalist',require('./routes/journalist'));
app.use('/api/city',require('./routes/city'))
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el: ${ process.env.PORT}`)
})