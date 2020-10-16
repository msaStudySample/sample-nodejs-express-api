const express = require('express')
const router = express.Router()
// const mdbConn = require('../db/mariaDBConn')
const Board = require('../models').board

// router.get('/api/v1/boardList', (req, res) => {
// 	mdbConn.getBoardList()
// 		.then((rows) => { res.json(rows)})
// 		.catch((err) => { console.error(err) })
// })

router.get('/boards', (req, res, next) => {
	Board.findAll()
		.then((wrts) => { res.json(wrts)})
		.catch((err) => {
			console.error(err)
			next(err)
		})
})

router.get('/boards/:wrt_seq', (req, res, next) => {
	Board.findOne(
		{ wrt_seq: req.params.wrt_seq}
	)
		.then((wrt) => {
			res.json(wrt)
		})
		.catch((err) => {
			console.error(err)
			next(err)
		})
})

router.post('/boards', (req, res, next) => {
	Board.create({
		title: req.body.title,
		contents: req.body.contents,
		reg_id: req.body.reg_id
	})
		.then((result) => {
			res.status(201).json(result)
		})
		.catch((err) => {
			console.error(err)
			next(err)
		})
})

router.patch('/boards/:wrt_seq', (req, res, next) => {
	Board.update(
		{ title: req.body.title},
		{ where: {wrt_deq: req.params.wrt_seq}}
		)
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			console.log(err)
			next(err)
		})
})

router.delete('/board/:wrt_seq', ((req, res, next) =>
	Board.delete({ wrt_seq: req.params.wrt_seq})
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			console.log(err)
			next(err)
		})
))


module.exports = router
