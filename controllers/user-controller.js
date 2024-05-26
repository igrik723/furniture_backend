const { prisma } = require("../prisma/prisma-client");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = {
    register: async (req, res) => {
        const { email, password, name, role } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({error: 'Все поля обязательны'})
        }

        try {
            const existingUser = await prisma.user.findUnique(({ where: { email } }))
            
            if (existingUser) {
                return res.status(400).json({error:'Данный пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    address: 'Alex',
                    phoneNumber: '8-800-555-35-35',
                    role
                }
            })

            res.json(user)

        } catch (error) {
            console.log('Error in register', error)
            res.status(500).json({error: 'Internal server error'})
        }

    },
    login: async (req, res) => {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({error: 'Все поля обязательны'})
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })
            
            if (!user) {
                return res.status(400).json({error: 'Неверный логин или пароль'})
            }

            const valid = await bcrypt.compare(password, user.password)

            if (!valid) {
                return res.status(400).json({error: 'Неверный логин или пароль'})
            }

            const token = jwt.sign(({ userId: user.id }), process.env.SECRET_KEY)
            
            res.json({ token })
        } catch (error) {
            console.log('Login error', error)
            res.status(500).json({error: 'Internal server error'})
        }
    },
    
}


module.exports = UserController