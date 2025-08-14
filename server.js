import express from 'express'
import pkg from './generated/prisma/index.js' // importa da pasta correta
import cors from 'cors'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors()) //Em ambiente de trabalho coloca o endereço em () para ficar seguro e ninguém ter acesso



app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

    
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
   }) 

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: { 
            id: req.params.id
        }
    })

    res.status(200).json({message: "Usauario deltado com Sucesso!"})
})


app.listen(3000) 

