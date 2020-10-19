const express = require('express')
const router = express.Router()
// const mdbConn = require('../db/mariaDBConn')
const Board = require('../models').board

var http = require('http')
var cookie = require('cookie')
const axios = require('axios')

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

router.get('/set_cookie', (req, res, next) => {
	// var cookies = cookie.parse(req.headers.cookie)
	//
	// var opts = {
	// 	host: '127.0.0.1',
	// 	port: 8080,
	// 	method: 'GET',
	// 	path: '/api/v1/get_email',
	// 	headers: {
	// 		'Cookie' : cookies
	// 	}
	// }
	//
	// res.cookie('access_token_cookie', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwNjk2MTksIm5iZiI6MTYwMzA2OTYxOSwianRpIjoiMDlkMWExYTYtYzllNS00YWNlLTk5YjEtNjg2ODc4MDBkMzRiIiwiZXhwIjoxNjAzMDcwNTE5LCJpZGVudGl0eSI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJlbWFpbCI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJzdWJqZWN0IjpbIm1hdGgiLCJlbmciXX19.uC8CKIiDRVbusanFW0bHuIG3Hy4qouSw6Gsvy-aYwNs')
	// // res.render('')
	// res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
	// res.send(req.cookie)

	// res.writeHead(200, {
	// 	'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry']
	// });
	// res.end('Cookie!!');

	getBreeds(req)
})

const getBreeds = async (req) => {
	try {
		// var cookies = cookie.parse(req.headers.cookie)

		// var token = cookies.access_token_cookie
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwODQ1NzYsIm5iZiI6MTYwMzA4NDU3NiwianRpIjoiOGI0Yzk4ZDQtNzdlYS00YTA0LTkyMGItYzM3YzY3OThiNjBmIiwiZXhwIjoxNjAzMDg1NDc2LCJpZGVudGl0eSI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJlbWFpbCI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJzdWJqZWN0IjpbIm1hdGgiLCJlbmciXX19._iNKL9jgZy1AMPLaOVo_ZXIcIVk5MrzjGu4DPKcoyvg'

		var varToken = token
		return await axios.get('http://127.0.0.1:8080/api/v1/get_email',  {
			headers: {
				Authorization: 'Bearer ' + varToken
				// access_token_cookie: varToken,
				// cookie : cookies
			}
		}, {withCredentials: true})
	} catch (error) {
		console.error(error);
	}
};



router.get('/boards/:wrt_seq', (req, res, next) => {
	// var cookies = cookie.parse(req.headers.cookie)
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwODQ1NzYsIm5iZiI6MTYwMzA4NDU3NiwianRpIjoiOGI0Yzk4ZDQtNzdlYS00YTA0LTkyMGItYzM3YzY3OThiNjBmIiwiZXhwIjoxNjAzMDg1NDc2LCJpZGVudGl0eSI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJlbWFpbCI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJzdWJqZWN0IjpbIm1hdGgiLCJlbmciXX19._iNKL9jgZy1AMPLaOVo_ZXIcIVk5MrzjGu4DPKcoyvg'
	var opts = {
		host: '127.0.0.1',
		port: 8080,
		method: 'GET',
		path: '/api/v1/get_email',
		headers: {
			// 'Cookie' : cookies
			// 'Set-Cookie' : cookies
			Authorization: 'Bearer ' + token
		}
	}

	var resData = ''
	var request = http.request(opts, function (res) {
		// 응답 처리
		res.on('data', function(chunk) {
			resData += chunk
		})

		res.on('end', function() {
			console.log(resData)
		})
	})



	// opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'

	request.data = "q=actor"
	// opts.headers['Content-Length'] = req.data.length
	opts.headers['access_token_cookie'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwNzAyMzEsIm5iZiI6MTYwMzA3MDIzMSwianRpIjoiMjU0NWJlMzUtNDI1Yi00NGViLTk5ODYtNGI1ZDRkZTI5MDFhIiwiZXhwIjoxNjAzMDcxMTMxLCJpZGVudGl0eSI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJlbWFpbCI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJzdWJqZWN0IjpbIm1hdGgiLCJlbmciXX19.lMBMkWro923SnRl3RpreRFWWa91iwOX36UOEe-9TiyA'
	// opts.headers['Content-Length'] = req.data.length
	// opts.headers['Set-Cookie'] = cookies
	// opts.headers['Cookie'] = cookies
	opts.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwODM0MjYsIm5iZiI6MTYwMzA4MzQyNiwianRpIjoiZTEzOGVhYTMtMDMyNS00NGQ2LWI5NjctMjhlOTg0NDVkMDZhIiwiZXhwIjoxNjAzMDg0MzI2LCJpZGVudGl0eSI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJlbWFpbCI6InNpcm9zbXNAb3V0bG9vay5jb20iLCJzdWJqZWN0IjpbIm1hdGgiLCJlbmciXX19._yhSC3FktCkHLRL-3ADnriAI_Ae8MFhoD5wbAqqvpyU'


	request.on('error', function(err) {
		console.log("오류 발생 : " + err.message)
	})

// 요청 전송
	request.write(request.data)
	request.end()

	// Board.findOne(
	// 	{ wrt_seq: req.params.wrt_seq}
	// )
	// 	.then((wrt) => {
	// 		res.json(wrt)
	// 	})
	// 	.catch((err) => {
	// 		console.error(err)
	// 		next(err)
	// 	})
})

// router.get('/test', (req, res, next) => {
// 	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'http://127.0.0.1:8080/api/v1/get_email', true);
// 	xhr.withCredentials = true;
// 	xhr.send(null)
// })

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
