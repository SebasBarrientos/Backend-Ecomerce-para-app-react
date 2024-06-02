const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        img=file.originalname
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const imgLoad = upload.single('image')
module.exports = { imgLoad };