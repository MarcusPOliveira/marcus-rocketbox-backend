//ponto de entrada da aplicação (Arquivo Principal)
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);   

io.on('connection', socket => {
    socket.on('connectRoom', box => { //criação de rota para "sala"
        socket.join(box);
    }) 
})

//conexão com o MongoDB
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-0pv8x.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;
    return next();
})

//middlewares
app.use(express.json()); //cadastro de módulo dentro do Express -> ajuda o server a entender as requisições em formato JSON
                         //obs:json n permite envio de arquivos
app.use(express.urlencoded({ extended: true })); //permite o envio de arquivos nas requisições
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes')); //caminho do arquivo de Rotas

server.listen(3333); //aplicação irá rodar na porta 3333
