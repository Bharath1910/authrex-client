const username = document.getElementById('username');
const password = document.getElementById('password');
const repeat = document.getElementById('repeatPassword');
const coa = document.getElementById('signupButton');

const url = 'https://authrexapi.bharathshanmugam.dev';

coa.addEventListener('click', (e) => {
	if (password.value != repeat.value) {
		alert("Passwords do not match");
		return;
	}

	const data = {
		username: username.value,
		password: password.value
	};

	fetch(`${url}/signup?type=user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => {
		if (res.status === 204) {
			alert("Account created successfully");
			window.location.href = '../login';
		}

		if (res.status === 409) {
			alert("Username already exists");
		}
	})
});