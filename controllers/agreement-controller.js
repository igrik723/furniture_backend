const { prisma } = require('../prisma/prisma-client')

const AgreementController = {
    createAgreement: async (req, res) => {
        const { dateOfEnd } = req.body
        const userId = req.user.userId

        if (!dateOfEnd) {
            return res.status(400).json({error: 'Все поля обязательны'})
        }

        try {
            const agreement = await prisma.agreement.create({
                data: {
                    dateOfEnd,
                    userId
                }
            })

            res.json(agreement)
        } catch (error) {
            console.error('Create agreement error')
            res.status(500).json({error:'Internal server error'})
        }
    },
    getUserAgreement: async (req, res) => {
        const userId = req.user.userId

        try {
            const agreements = await prisma.agreement.findMany({ where: {userId} })

            res.json(agreements)
        } catch (error) {
            console.error('Find agreements error', error)
            res.status(500).json({error: 'Internal server error',})
        }
    },
    deleteAgreement: async (req, res) => {
        const userId = req.user.userId
        const { id } = req.params
        const agreementId = parseInt(id, 10)
        
        const agreement = await prisma.agreement.findUnique({ where: { id: agreementId } })
        
        if (!agreement) {
            return res.status(404).json({error: 'Договор не найден'})
        }

        if (agreement.userId !== userId) {
            return res.status(403).json({error: 'Нет доступа'})
        }

        try {
            const transaction = await prisma.$transaction([
                prisma.sale.deleteMany({ where: { agreementId} }),
                prisma.agreement.delete({where: {id: agreementId}})
            ])

            res.json(transaction);
        } catch (error) {
            console.error('Delete agreement error', error)
            res.status(500).json({error: 'Internal server error'})
        }

    }
}

module.exports = AgreementController