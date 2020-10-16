const express = require('express')
const sequelize = require('./models').sequelize
const cors = require('cors');
const app = express()
const port = 3000


sequelize.sync()

app.get('/', (req,res) => {
	res.send('Hello World!!!')
})

app.use(cors())
app.use('/api/v1', require('./api/boardRestApi'))

app.listen(port, () => {
	console.log(`Example app listening at http://127.0.0.1:${port}`)
})


