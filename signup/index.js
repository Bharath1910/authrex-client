const username = document.getElementById('username');
const password = document.getElementById('password');
const repeat = document.getElementById('re_password');
const coa = document.getElementById('signup');
const parameters = new URLSearchParams(window.location.search);

const url = 'https://authrexapi.bharathshanmugam.dev';

function throwError(msg) {
	const errBox = document.getElementById('error_box');
	errBox.style.visibility = 'visible';
	
	const err = document.getElementById('error');
	err.innerHTML = msg;
}

coa.addEventListener('click', (e) => {
	if (password.value != repeat.value) {
		throwError("Passwords does not match");
		return;
	}

	const data = {
		username: username.value,
		password: password.value
	};

	let query = `${url}/signup`;
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
		if (res.status === 204) {
			if (parameters.has('t')) {
				window.location.href = `../login/index.html?t=${parameters.get('t')}`;
				return;
			}
			window.location.href = '../login';
		}

		if (res.status === 409) {
			throwError("Username already exists");
		}
	})
});