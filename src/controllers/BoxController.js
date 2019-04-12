const Box = require('../models/Box');

class BoxController {
    async store(req, res) { //função q recebe req/res e retorna alguma resposta 
        const box = await Box.create(req.body);
        /* 
            req = requisição feita ao server(Ex: dados de um formulario de Login)
            res = resposta ao client
        */
        return res.json(box);
    }
    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } } //ordernando arquivos de forma decrescente
        });
        return res.json(box);
    }
}

module.exports = new BoxController();
