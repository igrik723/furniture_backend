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
router.put('/furnitureModels/:id', authenticateToken, FurnitureModelsController.updateModelcount)
router.delete('/furnitureModels/:id', authenticateToken, FurnitureModelsController.deleteModel)
router.get('/furnitureModels', FurnitureModelsController.getModels)

//Роуты продаж
router.post('/sale', authenticateToken, SaleController.saleModel)
router.delete('/sale/:id', authenticateToken, SaleController.deleteSale)
//Роуты договоров
router.post('/agreements', authenticateToken, AgreementController.createAgreement)
router.get('/agreements', authenticateToken, AgreementController.getUserAgreement)
router.delete('/agreements/:id', authenticateToken, AgreementController.deleteAgreement)


module.exports = router
