const username = document.getElementById('username');
const password = document.getElementById('password');
const coa = document.getElementById('login');
const parameters = new URLSearchParams(window.location.search);

const url = 'https://authrexapi.bharathshanmugam.dev';
// const url = 'http://localhost:5000';

// https://gist.github.com/Bharath1910/b322bb7cab80492a7d5d51ac378b5018
function setCookie(name, value, days) {
	let expires = "";
	if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function throwError(msg) {
	const errBox = document.getElementById('error_box');
	errBox.style.visibility = 'visible';
	
	const err = document.getElementById('error');
	err.innerHTML = msg;
}

function sendClient(token, callback) {
	const data = {
		token: token
	};

	fetch(callback, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => {
		window.location.replace(callback);
	})
	.catch(err => {
		console.log(err);
		alert("Callback is not online");
	});

}

coa.addEventListener('click', (e) => {
	const data = {
		username: username.value,
		password: password.value
	};

	let query = `${url}/login`;
	if (parameters.has('t')) {
		query += `?type=client&token=${parameters.get('t')}`;
		console.log(parameters.get('t'));
	} else {
		query += '?type=user';
		console.log("nope")
	}

	fetch(query, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => {
		if (res.status === 404) {
			throwError("User not found");
			return;
		}

		if (res.status === 401) {
			throwError("Incorrect password");
			return;
		}

		if (parameters.has('t')) {
			res.json().then(data => {
				sendClient(data.token, data.redirect)
			});
			return;
		}

		res.json().then(data => {
			setCookie('token', data.token);
			setCookie('id', data.id);
			setCookie('name', data.username);
			window.location.href = '../dashboard';
		})
	})
});