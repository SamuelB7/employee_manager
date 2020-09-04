const multer = require('multer')

// Salvar arquivos no pc
const storage = multer.diskStorage({
    //Onde salvar
    destination: (req, file, callback) => {
        callback(null, './public/images')
    },
    //Nome do arquivo
    filename: (req, file, callback) => {
        callback(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, callback) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if(isAccepted) {
        return callback(null, true)
    }

    return callback(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})