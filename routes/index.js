const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadDestination = 'upload'

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function (req, file, next) {
        next(null, file.originalname)
    }
})

const uploads = multer({storage: storage})

router.get('/register', (req, res, next) => {
    res.send('Молоток')
})

module.exports = router
