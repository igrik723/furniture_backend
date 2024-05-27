const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController, AgreementController, FurnitureModelsController, SaleController } = require('../controllers');
const authenticateToken = require('../middleware/auth');

const uploadDestination = 'upload'

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function (req, file, next) {
        next(null, file.originalname)
    }
})

const uploads = multer({storage: storage})

//Роуты пользователя
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//Роуты моделей мебели

router.post('/furnitureModels', authenticateToken, FurnitureModelsController.createModel)
router.delete('/furnitureModels/:id', authenticateToken, FurnitureModelsController.createModel)

//Роуты продаж
router.post('/sale', authenticateToken, SaleController.saleModel)
//Роуты договоров
router.post('/agreements', authenticateToken, AgreementController.createAgreement)


module.exports = router
