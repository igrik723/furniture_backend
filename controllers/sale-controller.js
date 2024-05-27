const { prisma } = require('../prisma/prisma-client')

const SaleController = {
    saleModel: async (req, res) => {
        const { agreementId, furnitureId, count } = req.body
        
        if (!furnitureId || !count) {
            return res.status(400).json({ error: 'Все поля обязательны' })
        }

        try {
            const sale = await prisma.sale.create({
                data: {
                    agreementId,
                    furnitureId,
                    count
                }
            })

            res.json(sale)
        } catch (error) {
            console.log('Error sale model', error)
            res.status(500).json({error: 'Internal server error', error})
        }
    },

    deleteSale: async (req, res) => {
        const { id } = req.params
        const saleId = parseInt(id, 10)
        try {
            const sale = await prisma.sale.delete({ where: { id: saleId } })
            res.json(sale)
        } catch (error) {
            console.error('Delete sale error', error)
            res.status(500).json({error: 'Internal server error'})
        }

    }
}

module.exports = SaleController