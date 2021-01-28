const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Cards = require('./model')

const URI = "mongodb+srv://ashok:ashok@cluster0.lw48m.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = 8000;

//321, 845

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.post('/api/addcard', async(req, res) => {
    try {
        const {image, head, content} = req.body;
        if(!image || !head || !content) {
            return res.status(400).json("all fields mandatory")
        }
        const newCard = await new Cards({
            image: image,
            head: head,
            content: content
        })

        newCard.save()
        return res.status(200).json(newCard)

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

app.get('/api/allcards', async(req, res) => {
    try {
        const cards = await Cards.find()
        if(!cards) {
            return res.status(400).json("empty cards")
        }
        return res.status(200).json(cards)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

mongoose.connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('conncted to MongoDB'))
.catch((err) => console.log('DB connection err', err))

app.listen(PORT, () => {
    console.log('server running on port: ', 8000)
})
