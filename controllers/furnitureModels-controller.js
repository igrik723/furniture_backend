const { prisma } = require('../prisma/prisma-client')
const uuid = require('uuid')
const path = require('path')

const furnitureModelsController = {
    createModel: async (req, res) => {
        const role = req.user.role

        if (role !== 'Admin') {
            return res.status(403).json({error: "Нет доступа"})
        }
        const { furnitureName, furnitureType, Property, Price, count } = req.body
        const modelCount = parseInt(count, 10)
        const priceInt = parseInt(Price, 10)
        const { img } = req.files
        const fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        if (!furnitureName || !furnitureType || !Property || !Price) {
            return res.status(400).json({error: 'Все поля обязательны'})
        }


        try {
            const furnitureModel = await prisma.furnitureModel.create({
                data: {
                    furnitureName,
                    furnitureType,
                    Property,
                    Price: priceInt,
                    imageUrl: fileName,
                    count: modelCount
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

    getModels: async (req, res) => {
        const { search } = req.query;
        try {
            const models = await prisma.furnitureModel.findMany({
                where: {
                    OR: [
                        { furnitureName: { contains: search, mode: 'insensitive' } },
                        { furnitureType: { contains: search, mode: 'insensitive' } },
                        { Property: { contains: search, mode: 'insensitive' } },
                    ]
                }
            });
            res.json(models)
        } catch (error) {
            console.error('Get models error', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateModelcount: async (req, res) => {
        const { id } = req.params
        const { count } = req.body;

        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: "Нет доступа" })
        }

        if (!count || isNaN(parseInt(count, 10))) {
            return res.status(400).json({ error: 'Некорректное значение count' });
        }

        try {
            const updateModel = await prisma.furnitureModel.update({
                where: { id: parseInt(id, 10) },
                data: { count: parseInt(count, 10) },
            });

            res.json(updateModel)
        } catch (error) {
            console.error('Update model count error', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = furnitureModelsController