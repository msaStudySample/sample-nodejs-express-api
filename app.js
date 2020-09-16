const express = require('express')
const sequelize = require('./models').sequelize

const app = express()
const port = 3000
sequelize.sync()


app.get('/', (req,res) => {
	res.send('Hello World!!!')
})

app.use('/', require('./api/boardRestApi'))

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})


