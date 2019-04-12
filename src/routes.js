const express = require('express');
const multer = require('multer');
const multerConfig   = require('./config/multer');
const routes = express.Router(); //

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

/*
    GET -> busca de informações na API
    POST -> criação de algo
    PUT -> edição de algo
    DELETE -> excluir algo
*/

//middleware -> função que recebe uma requisição e modifica/retorna resposta
routes.post('/boxes', BoxController.store); 
routes.get('/boxes/:id', BoxController.show); 
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store); //single -> um arquivo por vez

module.exports = routes; //exporta info do arquivo de Rotas
