// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());
// const LOGIN_API = 'https://dummy-video-api.onrender.com/auth/login';
// app.post('/signIn', async (req, res) => {
// 	console.log(req.body);
// 	await fetch(LOGIN_API, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(req.body),
// 	})
// 		.then(async function (data) {
// 			let response = await data.json();
// 			console.log(response);

// 			res.send(response);
// 		})
// 		.catch((error) => console.log(error));
// });

// app.listen(8080, () => console.log('API is running on http://localhost:8080/'));
