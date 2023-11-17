const username = document.getElementById('username');
const password = document.getElementById('password');
const coa = document.getElementById('login');

// const url = 'https://authrexapi.bharathshanmugam.dev';
const url = 'http://localhost:5000';

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

coa.addEventListener('click', (e) => {
	const data = {
		username: username.value,
		password: password.value
	};

	fetch(`${url}/login?type=user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => {
		if (res.status === 404) {
			alert("Username does not exist");
			return;
		}

		if (res.status === 401) {
			alert("Incorrect password");
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