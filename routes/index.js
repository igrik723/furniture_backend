const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController } = require('../controllers');

const uploadDestination = 'upload'

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function (req, file, next) {
        next(null, file.originalname)
    }
})

const uploads = multer({storage: storage})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
module.exports = router
