const express = require('express')
const router = express.Router()
// const mdbConn = require('../model/mariaDBConn')
const Board = require('../models').board


// router.get('/api/v1/boardList', (req, res) => {
// 	mdbConn.getBoardList()
// 		.then((rows) => { res.json(rows)})
// 		.catch((err) => { console.error(err) })
// })

router.get('/api/v1/boards', (req, res) => {
	Board.findAll()
		.then((rows) => { res.json(rows)})
		.catch((err) => { console.error(err) })
})

module.exports = router
