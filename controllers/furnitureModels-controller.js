const { prisma } = require('../prisma/prisma-client')

const furnitureModelsController = {
    createModel: async (req, res) => {
        const role = req.user.role

        if (role !== 'Admin') {
            return res.status(403).json({error: "Нет доступа"})
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
        const {id} = req.params
        const modelId = parseInt(id, 10)

        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Нет доступа"})
        }

        try {
            const transaction = await prisma.$transaction([
                prisma.sale.deleteMany({ where: { furnitureId: modelId } }),
                prisma.furnitureModel.delete({where: {id: modelId}})
            ])

            res.json(transaction)

        } catch (error) {
            console.error('Delete model error', error)
            res.status(500).json({error: 'Internal server error'})
        }

    },
}

module.exports = furnitureModelsController