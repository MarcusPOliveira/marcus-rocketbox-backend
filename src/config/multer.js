const multer = require('multer');
const path = require('path'); //biblioteca padrão do Node que serve para a organização de caminhos relativos
const crypto = require('crypto'); // biblioteca padrão do Node que serve para gerar HASHs ou conjunto de caracteres unicos

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp'), //destino dos arquivos
    storage: multer.diskStorage({
        destination: (req, file, cb) => { //cb -> callback é uma função chamada quando é determinado a localização
            cb(null, path.resolve(__dirname, '..', '..', 'temp')) //parametros -> erro e destino
        },
        filename: (req, file, cb) => { //geração do nome único do arquivo
            crypto.randomBytes(16, (err, hash) => { //16 Bytes de caracteres aleatórios
                if (err) {
                    cb(err);
                } else {

                    // Exemplo: 7433fnrtfh-teste.jpg

                    file.key = `${hash.toString('hex')}-${file.originalname}`;
                    cb(null, file.key);
                }
            })
        }, 
    })
}
