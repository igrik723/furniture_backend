const { prisma } = require('../prisma/prisma-client')

const furnitureModelsController = {
    createModel: async (req, res) => {
        const role = req.user.role

        if (role !== 'Admin') {
            return res.status(400).json({error: req.user})
        }
        const {furnitureName, furnitureType, Property, Price } = req.body
        
        if (!furnitureName || !furnitureType || !Property || !Price) {
            return res.status(400).json({error: 'Все поля обязательны'})
        }

        try {
            const furnitureModel = await prisma.furnitureModel.create({
                data: {
                    furnitureName,
                    furnitureType,
                    Property,
                    Price,
                }
            })

            res.json(furnitureModel)
        } catch (error) {
            console.log('Create furnitureModel error', error)

            res.status(500).json({error: 'Internal server error'})
        }
    },
    deleteModel: async (req, res) => {
        const id = req.params

        const furnitureModel = await prisma.furnitureModel.findUnique({ where: { id } })
        
        if (!furnitureModel) {
            return res.status(404).json({error: 'Модель не найдена'})
        }

    },
}

module.exports = furnitureModelsController