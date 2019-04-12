// models -> representações do schemas
const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: { //nome do arquivo físico a ser armazenado
        type: String,
        required: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId, //armazenando IDs dos arquivos
        ref: 'File'
    }]
}, {
    timestamps: true, //campos createdAt e updateAt
    toObject: { virtuals: true }, //sempre que o arquivo for convertido em JSON ou Object -> faz carregamento do campo virtual abaixo
    toJSON: { virtuals: true },
});

//criação do campo virtual -> campo q n existe na tabela, mas existe na codificação
File.virtual('url').get(function() { //naõ pode ser arrow function pois é necessário acesso ao this
    const url = process.env.URL || 'http://localhost:3333'
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);
